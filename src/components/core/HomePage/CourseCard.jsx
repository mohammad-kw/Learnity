import React from "react";

// Importing React Icons
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {
  const isActive = currentCard === cardData?.heading;
  return (
    <div
      className={`w-full max-w-[360px] ${
        isActive
          ? "bg-white/10 backdrop-blur-md border border-purple-200/40 shadow-purple-glow"
          : "bg-richblack-800/60 backdrop-blur-md border border-white/10"
      }  text-richblack-25 h-[300px] box-border cursor-pointer rounded-2xl hover:scale-[1.04] hover:border-purple-200/40 transition-all ease-in-out`}
      onClick={() => setCurrentCard(cardData?.heading)}
    >
      <div className="border-b-[2px] border-white/10 border-dashed h-[80%] p-6 flex flex-col gap-3">
        <div
          className={` ${
            isActive ? "gradient-text" : "text-richblack-5"
          } font-semibold text-[20px]`}
        >
          {cardData?.heading}
        </div>

        <div className="text-richblack-300 transition-all ease-linear">
          {cardData?.description}
        </div>
      </div>

      <div
        className={`flex justify-between  transition-all ease-linear ${
          isActive ? "text-purple-200" : "text-richblack-300"
        } px-6 py-3 font-medium`}
      >
        {/* Level */}
        <div className="flex items-center gap-2 text-[16px]">
          <HiUsers />
          <p>{cardData?.level}</p>
        </div>

        {/* Flow Chart */}
        <div className="flex items-center gap-2 text-[16px]">
          <ImTree />
          <p>{cardData?.lessonNumber}Lesson</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
