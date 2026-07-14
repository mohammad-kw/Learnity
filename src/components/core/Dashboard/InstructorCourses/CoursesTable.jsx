import { useSelector } from "react-redux";

import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { HiClock } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

import { formatDate } from "../../../../services/formatDate";
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../services/operations/courseDetailsAPI";
import { COURSE_STATUS } from "../../../../utils/constants";
import { getCourseTotalDuration } from "../../../../utils/secToDuration";
import ConfirmationModal from "../../../common/ConfirmationModal";

export default function CoursesTable({ courses, setCourses }) {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const TRUNCATE_LENGTH = 22;

  const handleCourseDelete = async (courseId) => {
    setLoading(true);
    await deleteCourse({ courseId: courseId }, token);
    const result = await fetchInstructorCourses(token);
    if (result) {
      setCourses(result);
    }
    setConfirmationModal(null);
    setLoading(false);
  };

  if (courses?.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 glass-card p-12 text-center">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-richblack-700 text-3xl">
          📚
        </div>
        <p className="text-xl font-semibold text-richblack-5">
          No courses found
        </p>
        <p className="max-w-md text-sm text-richblack-300">
          You haven't created any courses yet. Start building your first course.
        </p>
        <button
          onClick={() => navigate("/dashboard/add-course")}
          className="mt-2 rounded-md bg-brand-gradient px-6 py-2 text-sm font-semibold text-white transition-all duration-200 hover:scale-[0.98]"
        >
          Create a course
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {courses?.map((course) => {
          const description =
            course.courseDescription.split(" ").length > TRUNCATE_LENGTH
              ? course.courseDescription
                  .split(" ")
                  .slice(0, TRUNCATE_LENGTH)
                  .join(" ") + "..."
              : course.courseDescription;

          return (
            <div
              key={course._id}
              className="group flex flex-col overflow-hidden glass-card transition-all duration-200 hover:shadow-purple-glow"
            >
              {/* Thumbnail + status badge */}
              <div className="relative overflow-hidden">
                <img
                  src={course?.thumbnail}
                  alt={course?.courseName}
                  className="h-[170px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute left-3 top-3">
                  {course.status === COURSE_STATUS.DRAFT ? (
                    <span className="flex items-center gap-1.5 rounded-full bg-richblack-900/80 px-3 py-1 text-xs font-medium text-pink-100">
                      <HiClock size={14} />
                      Drafted
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 rounded-full bg-richblack-900/80 px-3 py-1 text-xs font-medium text-purple-100">
                      <span className="flex h-3 w-3 items-center justify-center rounded-full bg-purple-300 text-richblack-900">
                        <FaCheck size={8} />
                      </span>
                      Published
                    </span>
                  )}
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col gap-3 p-5">
                <div>
                  <p className="line-clamp-1 text-lg font-semibold text-richblack-5">
                    {course.courseName}
                  </p>
                  <p className="mt-1 line-clamp-2 text-sm text-richblack-300">
                    {description}
                  </p>
                </div>

                {/* Meta */}
                <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-richblack-300">
                  <span className="font-semibold text-purple-200">
                    ₹{course.price}
                  </span>
                  <span>{getCourseTotalDuration(course)}</span>
                  <span>Created {formatDate(course.createdAt)}</span>
                </div>

                {/* Actions */}
                <div className="mt-2 flex items-center gap-2 border-t border-richblack-700 pt-4">
                  <button
                    disabled={loading}
                    onClick={() =>
                      navigate(`/dashboard/edit-course/${course._id}`)
                    }
                    className="flex flex-1 items-center justify-center gap-2 rounded-md bg-richblack-700 px-4 py-2 text-sm font-semibold text-richblack-50 transition-all duration-200 hover:bg-richblack-600"
                  >
                    <FiEdit2 size={16} />
                    Edit
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Do you want to delete this course?",
                        text2:
                          "All the data related to this course will be deleted",
                        btn1Text: !loading ? "Delete" : "Loading...  ",
                        btn2Text: "Cancel",
                        btn1Handler: !loading
                          ? () => handleCourseDelete(course._id)
                          : () => {},
                        btn2Handler: !loading
                          ? () => setConfirmationModal(null)
                          : () => {},
                      });
                    }}
                    title="Delete"
                    className="grid h-9 w-9 place-items-center rounded-md border border-richblack-600 bg-richblack-700 text-pink-200 transition-all duration-200 hover:border-pink-300 hover:text-pink-100"
                  >
                    <RiDeleteBin6Line size={18} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}
