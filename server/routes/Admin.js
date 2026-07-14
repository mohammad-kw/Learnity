const express = require("express");
const router = express.Router();

const { auth, isAdmin } = require("../middlewares/auth");
const {
  getAdminStats,
  getAllUsers,
  deleteUser,
  getAllCoursesAdmin,
  deleteCourseAdmin,
  getAllMessages,
  markMessageRead,
  deleteMessage,
  getAllReviews,
  deleteReview,
  getAllCategoriesAdmin,
  updateCategory,
  deleteCategoryAdmin,
  getAllInstructors,
  setInstructorApproval,
  getAllAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  getActiveAnnouncements,
} = require("../controllers/Admin");

// All admin routes are protected: must be authenticated AND an Admin
router.get("/stats", auth, isAdmin, getAdminStats);
router.get("/users", auth, isAdmin, getAllUsers);
router.delete("/deleteUser/:userId", auth, isAdmin, deleteUser);
router.get("/courses", auth, isAdmin, getAllCoursesAdmin);
router.delete("/deleteCourse/:courseId", auth, isAdmin, deleteCourseAdmin);
router.get("/messages", auth, isAdmin, getAllMessages);
router.put("/markMessageRead/:messageId", auth, isAdmin, markMessageRead);
router.delete("/deleteMessage/:messageId", auth, isAdmin, deleteMessage);
router.get("/reviews", auth, isAdmin, getAllReviews);
router.delete("/deleteReview/:reviewId", auth, isAdmin, deleteReview);
router.get("/categories", auth, isAdmin, getAllCategoriesAdmin);
router.put("/updateCategory/:categoryId", auth, isAdmin, updateCategory);
router.delete(
  "/deleteCategory/:categoryId",
  auth,
  isAdmin,
  deleteCategoryAdmin,
);
router.get("/instructors", auth, isAdmin, getAllInstructors);
router.put(
  "/setInstructorApproval/:instructorId",
  auth,
  isAdmin,
  setInstructorApproval,
);

// Public: active announcements for all visitors (no auth)
router.get("/publicAnnouncements", getActiveAnnouncements);

// Admin announcement management
router.get("/announcements", auth, isAdmin, getAllAnnouncements);
router.post("/announcements", auth, isAdmin, createAnnouncement);
router.put("/announcements/:announcementId", auth, isAdmin, updateAnnouncement);
router.delete(
  "/announcements/:announcementId",
  auth,
  isAdmin,
  deleteAnnouncement,
);

module.exports = router;
