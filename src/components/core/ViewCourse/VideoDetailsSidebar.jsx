import { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { FiPlayCircle } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import IconBtn from "../../common/IconBtn";

export default function VideoDetailsSidebar({ setReviewModal }) {
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, subSectionId } = useParams();
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  useEffect(() => {
    (() => {
      if (!courseSectionData.length) return;
      const currentSectionIndx = courseSectionData.findIndex(
        (data) => data._id === sectionId,
      );
      const currentSubSectionIndx = courseSectionData?.[
        currentSectionIndx
      ]?.subSection.findIndex((data) => data._id === subSectionId);
      const activeSubSectionId =
        courseSectionData[currentSectionIndx]?.subSection?.[
          currentSubSectionIndx
        ]?._id;
      setActiveStatus(courseSectionData?.[currentSectionIndx]?._id);
      setVideoBarActive(activeSubSectionId);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseSectionData, courseEntireData, location.pathname]);

  const completedCount = completedLectures?.length || 0;
  const progressPercent =
    totalNoOfLectures > 0
      ? Math.round((completedCount / totalNoOfLectures) * 100)
      : 0;

  return (
    <>
      <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r border-r-richblack-700 bg-richblack-800">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-richblack-700 p-5">
          <div className="flex w-full items-center justify-between">
            <button
              onClick={() => navigate(`/dashboard/enrolled-courses`)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-richblack-600 bg-richblack-700 text-richblack-100 transition-all duration-200 hover:border-purple-300 hover:text-purple-100"
              title="Back to Enrolled Courses"
            >
              <IoIosArrowBack size={20} />
            </button>
            <IconBtn
              text="Add Review"
              customClasses="ml-auto"
              onclick={() => setReviewModal(true)}
            />
          </div>

          {/* Course name + progress */}
          <div className="flex flex-col gap-3">
            <p className="text-lg font-bold text-richblack-5">
              {courseEntireData?.courseName}
            </p>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs font-medium text-richblack-300">
                <span>
                  {completedCount} / {totalNoOfLectures} completed
                </span>
                <span className="text-purple-100">{progressPercent}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-richblack-700">
                <div
                  className="h-full rounded-full bg-brand-gradient transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sections list */}
        <div className="flex-1 overflow-y-auto py-2">
          {courseSectionData.map((course) => {
            const isSectionOpen = activeStatus === course?._id;
            return (
              <div className="text-sm text-richblack-5" key={course._id}>
                {/* Section header */}
                <button
                  className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors duration-200 hover:bg-richblack-700/60"
                  onClick={() =>
                    setActiveStatus(isSectionOpen ? "" : course?._id)
                  }
                >
                  <span className="w-[80%] font-semibold text-richblack-25">
                    {course?.sectionName}
                  </span>
                  <span
                    className={`${
                      isSectionOpen ? "rotate-180" : "rotate-0"
                    } text-richblack-300 transition-transform duration-300`}
                  >
                    <BsChevronDown />
                  </span>
                </button>

                {/* Sub Sections */}
                {isSectionOpen && (
                  <div className="flex flex-col">
                    {course.subSection.map((topic) => {
                      const isActive = videoBarActive === topic._id;
                      const isCompleted = completedLectures.includes(
                        topic?._id,
                      );
                      return (
                        <button
                          className={`flex items-center gap-3 px-5 py-3 text-left transition-colors duration-200 ${
                            isActive
                              ? "bg-purple-300/20 text-purple-50"
                              : "text-richblack-100 hover:bg-richblack-700/60"
                          }`}
                          key={topic._id}
                          onClick={() => {
                            navigate(
                              `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`,
                            );
                            setVideoBarActive(topic._id);
                          }}
                        >
                          <span className="shrink-0">
                            {isCompleted ? (
                              <HiOutlineCheckCircle
                                className="text-caribbeangreen-300"
                                size={18}
                              />
                            ) : (
                              <FiPlayCircle
                                className={
                                  isActive
                                    ? "text-purple-100"
                                    : "text-richblack-400"
                                }
                                size={18}
                              />
                            )}
                          </span>
                          <span
                            className={`line-clamp-2 text-sm ${
                              isActive ? "font-semibold" : ""
                            }`}
                          >
                            {topic.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
