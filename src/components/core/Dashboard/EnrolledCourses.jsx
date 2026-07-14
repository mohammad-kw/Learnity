import { useCallback, useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";

import {
  getUserEnrolledCourses,
  unenrollCourse,
} from "../../../services/operations/profileAPI";
import ConfirmationModal from "../../common/ConfirmationModal";

export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const getEnrolledCourses = useCallback(async () => {
    try {
      const res = await getUserEnrolledCourses(token);

      setEnrolledCourses(res);
    } catch (error) {
      console.log("Could not fetch enrolled courses.");
    }
  }, [token]);
  useEffect(() => {
    getEnrolledCourses();
  }, [getEnrolledCourses]);

  const handleUnenroll = async (courseId) => {
    const success = await unenrollCourse(token, courseId);
    if (success) {
      setEnrolledCourses((prev) =>
        prev ? prev.filter((c) => c._id !== courseId) : prev,
      );
    }
    setConfirmationModal(null);
  };

  return (
    <>
      <div className="mb-2 flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-richblack-5">
          Enrolled Courses
        </h1>
        {enrolledCourses?.length ? (
          <p className="text-sm text-richblack-300">
            {enrolledCourses.length}{" "}
            {enrolledCourses.length === 1 ? "course" : "courses"}
          </p>
        ) : null}
      </div>

      {!enrolledCourses ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : !enrolledCourses.length ? (
        <div className="mt-10 grid place-items-center gap-4 glass-card p-12 text-center">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-richblack-700 text-3xl">
            📚
          </div>
          <p className="text-lg font-semibold text-richblack-5">
            You have not enrolled in any course yet.
          </p>
          <p className="max-w-md text-sm text-richblack-300">
            Explore the catalog and start learning something new today.
          </p>
          <button
            onClick={() => navigate("/courses")}
            className="mt-2 rounded-md bg-brand-gradient px-6 py-2 text-sm font-semibold text-white transition-all duration-200 hover:scale-[0.98]"
          >
            Browse Courses
          </button>
        </div>
      ) : (
        <div className="my-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {enrolledCourses.map((course, i) => {
            const progress = course.progressPercentage || 0;
            const goToCourse = () =>
              navigate(
                `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`,
              );
            return (
              <div
                key={i}
                className="group flex flex-col overflow-hidden glass-card transition-all duration-200 hover:shadow-purple-glow"
              >
                {/* Thumbnail */}
                <div
                  className="relative cursor-pointer overflow-hidden"
                  onClick={goToCourse}
                >
                  <img
                    src={course.thumbnail}
                    alt={course.courseName}
                    className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {course?.totalDuration && (
                    <span className="absolute bottom-2 right-2 rounded-md bg-richblack-900/80 px-2 py-1 text-xs font-medium text-richblack-5">
                      {course.totalDuration}
                    </span>
                  )}
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div className="cursor-pointer" onClick={goToCourse}>
                    <p className="line-clamp-1 text-lg font-semibold text-richblack-5">
                      {course.courseName}
                    </p>
                    <p className="mt-1 line-clamp-2 text-sm text-richblack-300">
                      {course.courseDescription}
                    </p>
                  </div>

                  {/* Progress */}
                  <div className="mt-auto flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs text-richblack-200">
                      <span>Progress</span>
                      <span className="font-semibold text-purple-200">
                        {progress}%
                      </span>
                    </div>
                    <ProgressBar
                      completed={progress}
                      height="8px"
                      isLabelVisible={false}
                      bgColor="#8b5cf6"
                      baseBgColor="#2c333f"
                    />
                  </div>

                  {/* Actions */}
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={goToCourse}
                      className="flex-1 rounded-md bg-brand-gradient px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:scale-[0.98]"
                    >
                      {progress > 0 ? "Continue" : "Start Learning"}
                    </button>
                    <button
                      title="Unenroll from this course"
                      onClick={() =>
                        setConfirmationModal({
                          text1: "Unenroll from course?",
                          text2:
                            "You will lose your progress and access to this course. You can enroll again later.",
                          btn1Text: "Unenroll",
                          btn2Text: "Cancel",
                          btn1Handler: () => handleUnenroll(course._id),
                          btn2Handler: () => setConfirmationModal(null),
                        })
                      }
                      className="grid h-9 w-9 place-items-center rounded-md border border-richblack-600 bg-richblack-700 text-pink-200 transition-all duration-200 hover:border-pink-300 hover:text-pink-100"
                    >
                      <RiDeleteBin6Line />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}
