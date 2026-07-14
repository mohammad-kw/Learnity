import { toast } from "react-hot-toast";

import { apiConnector } from "../apiconnector";
import { adminEndpoints } from "../apis";

const { GET_ADMIN_STATS_API } = adminEndpoints;

export const getAdminStats = async (token) => {
  let result = null;
  try {
    const response = await apiConnector("GET", GET_ADMIN_STATS_API, null, {
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not fetch stats");
    }
    result = response.data.data;
  } catch (error) {
    console.log("GET_ADMIN_STATS_API ERROR:", error);
    toast.error(
      error?.response?.data?.message || "Could not fetch admin stats",
    );
  }
  return result;
};

export const getAllUsers = async (token) => {
  let result = [];
  try {
    const response = await apiConnector(
      "GET",
      adminEndpoints.GET_ALL_USERS_API,
      null,
      { Authorization: `Bearer ${token}` },
    );
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not fetch users");
    }
    result = response.data.data;
  } catch (error) {
    console.log("GET_ALL_USERS_API ERROR:", error);
    toast.error(error?.response?.data?.message || "Could not fetch users");
  }
  return result;
};

export const deleteUser = async (token, userId) => {
  const toastId = toast.loading("Deleting user...");
  let success = false;
  try {
    const response = await apiConnector(
      "DELETE",
      `${adminEndpoints.DELETE_USER_API}/${userId}`,
      null,
      { Authorization: `Bearer ${token}` },
    );
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not delete user");
    }
    toast.success("User deleted");
    success = true;
  } catch (error) {
    console.log("DELETE_USER_API ERROR:", error);
    toast.error(error?.response?.data?.message || "Could not delete user");
  }
  toast.dismiss(toastId);
  return success;
};

export const getAllCoursesAdmin = async (token) => {
  let result = [];
  try {
    const response = await apiConnector(
      "GET",
      adminEndpoints.GET_ALL_COURSES_API,
      null,
      { Authorization: `Bearer ${token}` },
    );
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not fetch courses");
    }
    result = response.data.data;
  } catch (error) {
    console.log("GET_ALL_COURSES_API ERROR:", error);
    toast.error(error?.response?.data?.message || "Could not fetch courses");
  }
  return result;
};

export const deleteCourseAdmin = async (token, courseId) => {
  const toastId = toast.loading("Deleting course...");
  let success = false;
  try {
    const response = await apiConnector(
      "DELETE",
      `${adminEndpoints.DELETE_COURSE_API}/${courseId}`,
      null,
      { Authorization: `Bearer ${token}` },
    );
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not delete course");
    }
    toast.success("Course deleted");
    success = true;
  } catch (error) {
    console.log("DELETE_COURSE_API ERROR:", error);
    toast.error(error?.response?.data?.message || "Could not delete course");
  }
  toast.dismiss(toastId);
  return success;
};

export const getAllMessages = async (token) => {
  let result = [];
  try {
    const response = await apiConnector(
      "GET",
      adminEndpoints.GET_ALL_MESSAGES_API,
      null,
      { Authorization: `Bearer ${token}` },
    );
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not fetch messages");
    }
    result = response.data.data;
  } catch (error) {
    console.log("GET_ALL_MESSAGES_API ERROR:", error);
    toast.error(error?.response?.data?.message || "Could not fetch messages");
  }
  return result;
};

export const markMessageRead = async (token, messageId, read = true) => {
  let success = false;
  try {
    const response = await apiConnector(
      "PUT",
      `${adminEndpoints.MARK_MESSAGE_READ_API}/${messageId}`,
      { read },
      { Authorization: `Bearer ${token}` },
    );
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not update message");
    }
    success = true;
  } catch (error) {
    console.log("MARK_MESSAGE_READ_API ERROR:", error);
    toast.error(error?.response?.data?.message || "Could not update message");
  }
  return success;
};

export const deleteMessage = async (token, messageId) => {
  const toastId = toast.loading("Deleting message...");
  let success = false;
  try {
    const response = await apiConnector(
      "DELETE",
      `${adminEndpoints.DELETE_MESSAGE_API}/${messageId}`,
      null,
      { Authorization: `Bearer ${token}` },
    );
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not delete message");
    }
    toast.success("Message deleted");
    success = true;
  } catch (error) {
    console.log("DELETE_MESSAGE_API ERROR:", error);
    toast.error(error?.response?.data?.message || "Could not delete message");
  }
  toast.dismiss(toastId);
  return success;
};

export const getAllReviews = async (token) => {
  let result = [];
  try {
    const response = await apiConnector(
      "GET",
      adminEndpoints.GET_ALL_REVIEWS_API,
      null,
      { Authorization: `Bearer ${token}` },
    );
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not fetch reviews");
    }
    result = response.data.data;
  } catch (error) {
    console.log("GET_ALL_REVIEWS_API ERROR:", error);
    toast.error(error?.response?.data?.message || "Could not fetch reviews");
  }
  return result;
};

export const deleteReview = async (token, reviewId) => {
  const toastId = toast.loading("Deleting review...");
  let success = false;
  try {
    const response = await apiConnector(
      "DELETE",
      `${adminEndpoints.DELETE_REVIEW_API}/${reviewId}`,
      null,
      { Authorization: `Bearer ${token}` },
    );
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not delete review");
    }
    toast.success("Review deleted");
    success = true;
  } catch (error) {
    console.log("DELETE_REVIEW_API ERROR:", error);
    toast.error(error?.response?.data?.message || "Could not delete review");
  }
  toast.dismiss(toastId);
  return success;
};

export const getAllCategoriesAdmin = async (token) => {
  let result = [];
  try {
    const response = await apiConnector(
      "GET",
      adminEndpoints.GET_ALL_CATEGORIES_API,
      null,
      { Authorization: `Bearer ${token}` },
    );
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not fetch categories");
    }
    result = response.data.data;
  } catch (error) {
    console.log("GET_ALL_CATEGORIES_API ERROR:", error);
    toast.error(error?.response?.data?.message || "Could not fetch categories");
  }
  return result;
};

export const updateCategory = async (token, categoryId, name, description) => {
  const toastId = toast.loading("Saving category...");
  let success = false;
  try {
    const response = await apiConnector(
      "PUT",
      `${adminEndpoints.UPDATE_CATEGORY_API}/${categoryId}`,
      { name, description },
      { Authorization: `Bearer ${token}` },
    );
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not update category");
    }
    toast.success("Category updated");
    success = true;
  } catch (error) {
    console.log("UPDATE_CATEGORY_API ERROR:", error);
    toast.error(error?.response?.data?.message || "Could not update category");
  }
  toast.dismiss(toastId);
  return success;
};

export const deleteCategoryAdmin = async (token, categoryId) => {
  const toastId = toast.loading("Deleting category...");
  let success = false;
  try {
    const response = await apiConnector(
      "DELETE",
      `${adminEndpoints.DELETE_CATEGORY_API}/${categoryId}`,
      null,
      { Authorization: `Bearer ${token}` },
    );
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not delete category");
    }
    toast.success("Category deleted");
    success = true;
  } catch (error) {
    console.log("DELETE_CATEGORY_API ERROR:", error);
    toast.error(error?.response?.data?.message || "Could not delete category");
  }
  toast.dismiss(toastId);
  return success;
};

export const getAllInstructors = async (token) => {
  let result = [];
  try {
    const response = await apiConnector(
      "GET",
      adminEndpoints.GET_ALL_INSTRUCTORS_API,
      null,
      { Authorization: `Bearer ${token}` },
    );
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not fetch instructors");
    }
    result = response.data.data;
  } catch (error) {
    console.log("GET_ALL_INSTRUCTORS_API ERROR:", error);
    toast.error(
      error?.response?.data?.message || "Could not fetch instructors",
    );
  }
  return result;
};

export const setInstructorApproval = async (token, instructorId, approved) => {
  const toastId = toast.loading(approved ? "Approving..." : "Revoking...");
  let success = false;
  try {
    const response = await apiConnector(
      "PUT",
      `${adminEndpoints.SET_INSTRUCTOR_APPROVAL_API}/${instructorId}`,
      { approved },
      { Authorization: `Bearer ${token}` },
    );
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not update instructor");
    }
    toast.success(response.data.message || "Updated");
    success = true;
  } catch (error) {
    console.log("SET_INSTRUCTOR_APPROVAL_API ERROR:", error);
    toast.error(
      error?.response?.data?.message || "Could not update instructor",
    );
  }
  toast.dismiss(toastId);
  return success;
};

export const getAllAnnouncements = async (token) => {
  let result = [];
  try {
    const response = await apiConnector(
      "GET",
      adminEndpoints.GET_ALL_ANNOUNCEMENTS_API,
      null,
      { Authorization: `Bearer ${token}` },
    );
    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message || "Could not fetch announcements",
      );
    }
    result = response.data.data;
  } catch (error) {
    console.log("GET_ALL_ANNOUNCEMENTS_API ERROR:", error);
    toast.error(
      error?.response?.data?.message || "Could not fetch announcements",
    );
  }
  return result;
};

export const createAnnouncement = async (token, payload) => {
  const toastId = toast.loading("Publishing...");
  let result = null;
  try {
    const response = await apiConnector(
      "POST",
      adminEndpoints.CREATE_ANNOUNCEMENT_API,
      payload,
      { Authorization: `Bearer ${token}` },
    );
    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message || "Could not create announcement",
      );
    }
    toast.success("Announcement published");
    result = response.data.data;
  } catch (error) {
    console.log("CREATE_ANNOUNCEMENT_API ERROR:", error);
    toast.error(
      error?.response?.data?.message || "Could not create announcement",
    );
  }
  toast.dismiss(toastId);
  return result;
};

export const updateAnnouncement = async (token, announcementId, payload) => {
  let success = false;
  try {
    const response = await apiConnector(
      "PUT",
      `${adminEndpoints.UPDATE_ANNOUNCEMENT_API}/${announcementId}`,
      payload,
      { Authorization: `Bearer ${token}` },
    );
    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message || "Could not update announcement",
      );
    }
    success = true;
  } catch (error) {
    console.log("UPDATE_ANNOUNCEMENT_API ERROR:", error);
    toast.error(
      error?.response?.data?.message || "Could not update announcement",
    );
  }
  return success;
};

export const deleteAnnouncement = async (token, announcementId) => {
  const toastId = toast.loading("Deleting...");
  let success = false;
  try {
    const response = await apiConnector(
      "DELETE",
      `${adminEndpoints.DELETE_ANNOUNCEMENT_API}/${announcementId}`,
      null,
      { Authorization: `Bearer ${token}` },
    );
    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message || "Could not delete announcement",
      );
    }
    toast.success("Announcement deleted");
    success = true;
  } catch (error) {
    console.log("DELETE_ANNOUNCEMENT_API ERROR:", error);
    toast.error(
      error?.response?.data?.message || "Could not delete announcement",
    );
  }
  toast.dismiss(toastId);
  return success;
};

export const getPublicAnnouncements = async () => {
  let result = [];
  try {
    const response = await apiConnector(
      "GET",
      adminEndpoints.PUBLIC_ANNOUNCEMENTS_API,
    );
    if (response?.data?.success) {
      result = response.data.data;
    }
  } catch (error) {
    console.log("PUBLIC_ANNOUNCEMENTS_API ERROR:", error);
  }
  return result;
};
