import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

import "video-react/dist/video-react.css";
import { useLocation } from "react-router-dom";
import { BigPlayButton, Player } from "video-react";

import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";
import { updateCompletedLectures } from "../../../slices/viewCourseSlice";
import IconBtn from "../../common/IconBtn";

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const playerRef = useRef(null);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse);

  const [videoData, setVideoData] = useState([]);
  const [previewSource, setPreviewSource] = useState("");
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (!courseSectionData.length) return;
      if (!courseId && !sectionId && !subSectionId) {
        navigate(`/dashboard/enrolled-courses`);
      } else {
        // console.log("courseSectionData", courseSectionData)
        const filteredData = courseSectionData.filter(
          (course) => course._id === sectionId,
        );
        // console.log("filteredData", filteredData)
        const filteredVideoData = filteredData?.[0]?.subSection.filter(
          (data) => data._id === subSectionId,
        );
        // console.log("filteredVideoData", filteredVideoData)
        setVideoData(filteredVideoData[0]);
        setPreviewSource(courseEntireData.thumbnail);
        setVideoEnded(false);
      }
    })();
  }, [
    courseSectionData,
    courseEntireData,
    location.pathname,
    courseId,
    navigate,
    sectionId,
    subSectionId,
  ]);

  // check if the lecture is the first video of the course
  const isFirstVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId,
    );

    if (currentSectionIndx < 0) return false;

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ]?.subSection?.findIndex((data) => data._id === subSectionId);

    if (currentSectionIndx === 0 && currentSubSectionIndx === 0) {
      return true;
    } else {
      return false;
    }
  };

  // go to the next video
  const goToNextVideo = () => {
    // console.log(courseSectionData)

    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId,
    );

    const noOfSubsections =
      courseSectionData[currentSectionIndx].subSection.length;

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].subSection.findIndex((data) => data._id === subSectionId);

    // console.log("no of subsections", noOfSubsections)

    if (currentSubSectionIndx !== noOfSubsections - 1) {
      const nextSubSectionId =
        courseSectionData[currentSectionIndx].subSection[
          currentSubSectionIndx + 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`,
      );
    } else {
      const nextSectionId = courseSectionData[currentSectionIndx + 1]._id;
      const nextSubSectionId =
        courseSectionData[currentSectionIndx + 1].subSection[0]._id;
      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`,
      );
    }
  };

  // check if the lecture is the last video of the course
  const isLastVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId,
    );

    if (currentSectionIndx < 0) return false;

    const noOfSubsections =
      courseSectionData[currentSectionIndx]?.subSection?.length;

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ]?.subSection?.findIndex((data) => data._id === subSectionId);

    if (
      currentSectionIndx === courseSectionData.length - 1 &&
      currentSubSectionIndx === noOfSubsections - 1
    ) {
      return true;
    } else {
      return false;
    }
  };

  // go to the previous video
  const goToPrevVideo = () => {
    // console.log(courseSectionData)

    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId,
    );

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].subSection.findIndex((data) => data._id === subSectionId);

    if (currentSubSectionIndx !== 0) {
      const prevSubSectionId =
        courseSectionData[currentSectionIndx].subSection[
          currentSubSectionIndx - 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`,
      );
    } else {
      const prevSectionId = courseSectionData[currentSectionIndx - 1]._id;
      const prevSubSectionLength =
        courseSectionData[currentSectionIndx - 1].subSection.length;
      const prevSubSectionId =
        courseSectionData[currentSectionIndx - 1].subSection[
          prevSubSectionLength - 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`,
      );
    }
  };

  const handleLectureCompletion = async () => {
    setLoading(true);
    const res = await markLectureAsComplete(
      { courseId: courseId, subsectionId: subSectionId },
      token,
    );
    if (res) {
      dispatch(updateCompletedLectures(subSectionId));
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-6 py-6 text-white">
      {!videoData ? (
        <img
          src={previewSource}
          alt="Preview"
          className="h-full w-full rounded-2xl object-cover"
        />
      ) : (
        <>
          {/* Video Player */}
          <div className="overflow-hidden rounded-2xl border border-richblack-700 bg-black shadow-lg">
            {!videoData ? (
              <img
                src={previewSource}
                alt="Preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <Player
                ref={playerRef}
                aspectRatio="16:9"
                playsInline
                onEnded={() => setVideoEnded(true)}
                src={videoData?.videoUrl}
              >
                <BigPlayButton position="center" />
                {/* Render When Video Ends */}
                {videoEnded && (
                  <div
                    style={{
                      backgroundImage:
                        "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
                    }}
                    className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter"
                  >
                    {!completedLectures.includes(subSectionId) && (
                      <IconBtn
                        disabled={loading}
                        onclick={() => handleLectureCompletion()}
                        text={!loading ? "Mark As Completed" : "Loading..."}
                        customClasses="text-xl max-w-max px-4 mx-auto"
                      />
                    )}
                    <IconBtn
                      disabled={loading}
                      onclick={() => {
                        if (playerRef?.current) {
                          // set the current time of the video to 0
                          playerRef?.current?.seek(0);
                          setVideoEnded(false);
                        }
                      }}
                      text="Rewatch"
                      customClasses="text-xl max-w-max px-4 mx-auto mt-2"
                    />
                    <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                      {!isFirstVideo() && (
                        <button
                          disabled={loading}
                          onClick={goToPrevVideo}
                          className="blackButton"
                        >
                          Prev
                        </button>
                      )}
                      {!isLastVideo() && (
                        <button
                          disabled={loading}
                          onClick={goToNextVideo}
                          className="blackButton"
                        >
                          Next
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </Player>
            )}
          </div>

          {/* Title + navigation controls */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h1 className="text-2xl font-bold text-richblack-5">
                {videoData?.title}
              </h1>
              <div className="flex items-center gap-3">
                {!isFirstVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToPrevVideo}
                    className="flex items-center gap-1 rounded-lg border border-richblack-600 bg-richblack-800 px-4 py-2 text-sm font-medium text-richblack-100 transition-all duration-200 hover:border-purple-300 hover:text-purple-100 disabled:opacity-50"
                  >
                    <BiChevronLeft size={20} /> Prev
                  </button>
                )}
                {!completedLectures.includes(subSectionId) && (
                  <IconBtn
                    disabled={loading}
                    onclick={() => handleLectureCompletion()}
                    text={!loading ? "Mark as Completed" : "Loading..."}
                    customClasses="text-sm px-4"
                  />
                )}
                {!isLastVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToNextVideo}
                    className="flex items-center gap-1 rounded-lg border border-richblack-600 bg-richblack-800 px-4 py-2 text-sm font-medium text-richblack-100 transition-all duration-200 hover:border-purple-300 hover:text-purple-100 disabled:opacity-50"
                  >
                    Next <BiChevronRight size={20} />
                  </button>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="glass-card p-6">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-purple-200">
                About this lecture
              </p>
              <p className="leading-7 text-richblack-100">
                {videoData?.description}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default VideoDetails;
// video
