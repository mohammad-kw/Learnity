const User = require("../models/User");
const Course = require("../models/Course");
const Category = require("../models/Category");
const RatingAndReview = require("../models/RatingAndRaview");
const Profile = require("../models/Profile");
const CourseProgress = require("../models/CourseProgress");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const ContactMessage = require("../models/ContactMessage");
const Announcement = require("../models/Announcement");
const mongoose = require("mongoose");
// GET /admin/stats  -> platform-wide statistics for the admin dashboard
exports.getAdminStats = async (req, res) => {
  try {
    // Run all counts in parallel for speed
    const [
      totalUsers,
      totalStudents,
      totalInstructors,
      totalAdmins,
      totalCourses,
      publishedCourses,
      draftCourses,
      totalCategories,
      totalReviews,
      courses,
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ accountType: "Student" }),
      User.countDocuments({ accountType: "Instructor" }),
      User.countDocuments({ accountType: "Admin" }),
      Course.countDocuments(),
      Course.countDocuments({ status: "Published" }),
      Course.countDocuments({ status: "Draft" }),
      Category.countDocuments(),
      RatingAndReview.countDocuments(),
      Course.find({}, { price: true, studentsEnrolled: true }).lean(),
    ]);

    // Compute total enrollments and notional revenue from courses
    let totalEnrollments = 0;
    let totalRevenue = 0;
    for (const course of courses) {
      const enrolled = Array.isArray(course.studentsEnrolled)
        ? course.studentsEnrolled.length
        : 0;
      totalEnrollments += enrolled;
      totalRevenue += enrolled * (course.price || 0);
    }

    return res.status(200).json({
      success: true,
      data: {
        users: {
          total: totalUsers,
          students: totalStudents,
          instructors: totalInstructors,
          admins: totalAdmins,
        },
        courses: {
          total: totalCourses,
          published: publishedCourses,
          draft: draftCourses,
        },
        totalCategories,
        totalReviews,
        totalEnrollments,
        totalRevenue,
      },
    });
  } catch (error) {
    console.error("GET_ADMIN_STATS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch admin statistics",
      error: error.message,
    });
  }
};

// GET /admin/users  -> list all users (with their profile) for management
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find(
      {},
      {
        firstName: true,
        lastName: true,
        email: true,
        accountType: true,
        image: true,
        courses: true,
        createdAt: true,
      },
    )
      .populate("additionalDetails")
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error("GET_ALL_USERS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};

// DELETE /admin/deleteUser/:userId  -> delete a user and clean up related data
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (userId === req.user.id) {
      return res.status(400).json({
        success: false,
        message: "You cannot delete your own account from here",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Delete the associated profile
    if (user.additionalDetails) {
      await Profile.findByIdAndDelete({
        _id: new mongoose.Types.ObjectId(user.additionalDetails),
      });
    }

    // Remove the user from every course they were enrolled in
    if (Array.isArray(user.courses)) {
      for (const courseId of user.courses) {
        await Course.findByIdAndUpdate(courseId, {
          $pull: { studentsEnrolled: userId },
        });
      }
    }

    // If the user is an instructor, delete the courses they created
    await Course.deleteMany({ instructor: userId });

    // Remove their reviews and progress
    await RatingAndReview.deleteMany({ user: userId });
    await CourseProgress.deleteMany({ userId: userId });

    // Finally delete the user
    await User.findByIdAndDelete(userId);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("DELETE_USER ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete user",
      error: error.message,
    });
  }
};

// GET /admin/courses  -> list every course (including drafts) with instructor info
exports.getAllCoursesAdmin = async (req, res) => {
  try {
    const courses = await Course.find({})
      .populate("instructor", "firstName lastName email image")
      .populate("category", "name")
      .select(
        "courseName thumbnail price status studentsEnrolled instructor category createdAt",
      )
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    console.error("GET_ALL_COURSES_ADMIN ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
      error: error.message,
    });
  }
};

// DELETE /admin/deleteCourse/:courseId  -> delete any course and clean up related data
exports.deleteCourseAdmin = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    // Unenroll every student from this course
    if (Array.isArray(course.studentsEnrolled)) {
      for (const studentId of course.studentsEnrolled) {
        await User.findByIdAndUpdate(studentId, {
          $pull: { courses: courseId },
        });
      }
    }

    // Delete all sections and their sub-sections
    if (Array.isArray(course.courseContent)) {
      for (const sectionId of course.courseContent) {
        const section = await Section.findById(sectionId);
        if (section && Array.isArray(section.subSection)) {
          for (const subSectionId of section.subSection) {
            await SubSection.findByIdAndDelete(subSectionId);
          }
        }
        await Section.findByIdAndDelete(sectionId);
      }
    }

    // Remove the course from its category
    if (course.category) {
      await Category.findByIdAndUpdate(course.category, {
        $pull: { courses: courseId },
      });
    }

    // Remove the course from the instructor's course list
    if (course.instructor) {
      await User.findByIdAndUpdate(course.instructor, {
        $pull: { courses: courseId },
      });
    }

    // Delete related reviews and progress
    await RatingAndReview.deleteMany({ course: courseId });
    await CourseProgress.deleteMany({ courseID: courseId });

    // Finally delete the course
    await Course.findByIdAndDelete(courseId);

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error("DELETE_COURSE_ADMIN ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete course",
      error: error.message,
    });
  }
};

// GET /admin/messages  -> list all contact-form messages, newest first
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find({})
      .sort({ createdAt: -1 })
      .lean();
    return res.status(200).json({ success: true, data: messages });
  } catch (error) {
    console.error("GET_ALL_MESSAGES ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch messages",
      error: error.message,
    });
  }
};

// PUT /admin/markMessageRead/:messageId  -> toggle/mark a message as read
exports.markMessageRead = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { read = true } = req.body || {};
    const updated = await ContactMessage.findByIdAndUpdate(
      messageId,
      { read },
      { new: true },
    );
    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Message not found" });
    }
    return res.status(200).json({ success: true, data: updated });
  } catch (error) {
    console.error("MARK_MESSAGE_READ ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update message",
      error: error.message,
    });
  }
};

// DELETE /admin/deleteMessage/:messageId  -> delete a contact message
exports.deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const deleted = await ContactMessage.findByIdAndDelete(messageId);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Message not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Message deleted successfully" });
  } catch (error) {
    console.error("DELETE_MESSAGE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete message",
      error: error.message,
    });
  }
};

// GET /admin/reviews  -> list every rating & review with author + course info
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await RatingAndReview.find({})
      .populate("user", "firstName lastName email image")
      .populate("course", "courseName thumbnail")
      .sort({ _id: -1 })
      .lean();

    return res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    console.error("GET_ALL_REVIEWS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
      error: error.message,
    });
  }
};

// DELETE /admin/deleteReview/:reviewId  -> remove a review and detach it from its course
exports.deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const review = await RatingAndReview.findById(reviewId);
    if (!review) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    }

    // Detach the review from its course's ratingAndReviews list (if present)
    if (review.course) {
      await Course.findByIdAndUpdate(review.course, {
        $pull: { ratingAndReviews: reviewId },
      });
    }

    await RatingAndReview.findByIdAndDelete(reviewId);

    return res
      .status(200)
      .json({ success: true, message: "Review deleted successfully" });
  } catch (error) {
    console.error("DELETE_REVIEW ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete review",
      error: error.message,
    });
  }
};

// GET /admin/categories  -> list all categories with their course counts
exports.getAllCategoriesAdmin = async (req, res) => {
  try {
    const categories = await Category.find({}).sort({ name: 1 }).lean();
    const data = categories.map((c) => ({
      _id: c._id,
      name: c.name,
      description: c.description || "",
      courseCount: Array.isArray(c.courses) ? c.courses.length : 0,
    }));
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("GET_ALL_CATEGORIES_ADMIN ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
      error: error.message,
    });
  }
};

// PUT /admin/updateCategory/:categoryId  -> rename / edit a category
exports.updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name, description } = req.body;

    if (!name || !name.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Category name is required" });
    }

    // Prevent duplicate names (case-insensitive), excluding this category
    const existing = await Category.findOne({
      _id: { $ne: categoryId },
      name: { $regex: `^${name.trim()}$`, $options: "i" },
    });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Another category with this name already exists",
      });
    }

    const updated = await Category.findByIdAndUpdate(
      categoryId,
      { name: name.trim(), description: description?.trim() || "" },
      { new: true },
    );
    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("UPDATE_CATEGORY ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update category",
      error: error.message,
    });
  }
};

// DELETE /admin/deleteCategory/:categoryId  -> delete a category (only if empty)
exports.deleteCategoryAdmin = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await Category.findById(categoryId);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    // Block deletion if the category still has courses attached
    const courseCount = await Course.countDocuments({ category: categoryId });
    if (courseCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete: ${courseCount} course(s) still use this category. Reassign or delete them first.`,
      });
    }

    await Category.findByIdAndDelete(categoryId);

    return res
      .status(200)
      .json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    console.error("DELETE_CATEGORY_ADMIN ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete category",
      error: error.message,
    });
  }
};

// GET /admin/instructors  -> list all instructors with approval status + course counts
exports.getAllInstructors = async (req, res) => {
  try {
    const instructors = await User.find({ accountType: "Instructor" })
      .populate("additionalDetails")
      .select("firstName lastName email image approved courses createdAt")
      .sort({ approved: 1, createdAt: -1 })
      .lean();

    const data = instructors.map((i) => ({
      _id: i._id,
      firstName: i.firstName,
      lastName: i.lastName,
      email: i.email,
      image: i.image,
      approved: i.approved,
      courseCount: Array.isArray(i.courses) ? i.courses.length : 0,
      createdAt: i.createdAt,
    }));

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("GET_ALL_INSTRUCTORS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch instructors",
      error: error.message,
    });
  }
};

// PUT /admin/setInstructorApproval/:instructorId  -> approve or revoke an instructor
exports.setInstructorApproval = async (req, res) => {
  try {
    const { instructorId } = req.params;
    const { approved } = req.body;

    if (typeof approved !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "approved (boolean) is required",
      });
    }

    const instructor = await User.findById(instructorId);
    if (!instructor) {
      return res
        .status(404)
        .json({ success: false, message: "Instructor not found" });
    }
    if (instructor.accountType !== "Instructor") {
      return res
        .status(400)
        .json({ success: false, message: "User is not an instructor" });
    }

    instructor.approved = approved;

    // If revoking approval, unpublish the instructor's published courses
    if (approved === false) {
      await Course.updateMany(
        { instructor: instructorId, status: "Published" },
        { status: "Draft" },
      );
    }

    await instructor.save();

    return res.status(200).json({
      success: true,
      message: approved
        ? "Instructor approved"
        : "Instructor approval revoked (published courses set to Draft)",
    });
  } catch (error) {
    console.error("SET_INSTRUCTOR_APPROVAL ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update instructor approval",
      error: error.message,
    });
  }
};

// GET /admin/announcements  -> list all announcements (admin view)
exports.getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find({})
      .sort({ createdAt: -1 })
      .lean();
    return res.status(200).json({ success: true, data: announcements });
  } catch (error) {
    console.error("GET_ALL_ANNOUNCEMENTS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch announcements",
      error: error.message,
    });
  }
};

// POST /admin/announcements  -> create a new announcement
exports.createAnnouncement = async (req, res) => {
  try {
    const { title, message, type = "info", active = true } = req.body;
    if (!title?.trim() || !message?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title and message are required",
      });
    }
    const announcement = await Announcement.create({
      title: title.trim(),
      message: message.trim(),
      type: ["info", "success", "warning"].includes(type) ? type : "info",
      active: Boolean(active),
      createdBy: req.user.id,
    });
    return res.status(201).json({
      success: true,
      message: "Announcement created",
      data: announcement,
    });
  } catch (error) {
    console.error("CREATE_ANNOUNCEMENT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create announcement",
      error: error.message,
    });
  }
};

// PUT /admin/announcements/:announcementId  -> update / toggle an announcement
exports.updateAnnouncement = async (req, res) => {
  try {
    const { announcementId } = req.params;
    const { title, message, type, active } = req.body;

    const update = {};
    if (title !== undefined) update.title = title.trim();
    if (message !== undefined) update.message = message.trim();
    if (type !== undefined && ["info", "success", "warning"].includes(type))
      update.type = type;
    if (active !== undefined) update.active = Boolean(active);

    const updated = await Announcement.findByIdAndUpdate(
      announcementId,
      update,
      { new: true },
    );
    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Announcement not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Announcement updated", data: updated });
  } catch (error) {
    console.error("UPDATE_ANNOUNCEMENT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update announcement",
      error: error.message,
    });
  }
};

// DELETE /admin/announcements/:announcementId  -> delete an announcement
exports.deleteAnnouncement = async (req, res) => {
  try {
    const { announcementId } = req.params;
    const deleted = await Announcement.findByIdAndDelete(announcementId);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Announcement not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Announcement deleted" });
  } catch (error) {
    console.error("DELETE_ANNOUNCEMENT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete announcement",
      error: error.message,
    });
  }
};

// GET /admin/publicAnnouncements  -> active announcements for all visitors (no auth)
exports.getActiveAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find({ active: true })
      .select("title message type createdAt")
      .sort({ createdAt: -1 })
      .lean();
    return res.status(200).json({ success: true, data: announcements });
  } catch (error) {
    console.error("GET_ACTIVE_ANNOUNCEMENTS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch announcements",
      error: error.message,
    });
  }
};
