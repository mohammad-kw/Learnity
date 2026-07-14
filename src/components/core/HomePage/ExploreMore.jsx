import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import CourseCard from "./CourseCard";
import HighlightText from "./HighlightText";

const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading,
  );

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };

  return (
    <div>
      {/* Explore more section */}
      <div>
        <div className="text-4xl font-semibold text-center mb-3">
          <div className="container" style={{ display: "block" }}>
            Unlock the
            <HighlightText
              style={{ display: "inline" }}
              text={"Power of Code"}
            />
          </div>
          <p className="text-center text-richblack-300 text-sm font-semibold mt-2">
            Learn to Build Anything You Can Imagine
          </p>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="hidden lg:flex gap-5 mx-auto w-max bg-richblack-800/60 backdrop-blur-md border border-white/10 text-richblack-200 p-1 rounded-full font-medium mt-8 mb-10">
        {tabsName.map((ele, index) => {
          return (
            <div
              className={`text-[16px] flex flex-row items-center gap-2 ${
                currentTab === ele
                  ? "bg-brand-gradient text-white font-medium shadow-purple-glow"
                  : "text-richblack-200"
              } px-7 py-[7px] rounded-full transition-all duration-200 cursor-pointer hover:bg-white/10 hover:text-white`}
              key={index}
              onClick={() => setMyCards(ele)}
            >
              {ele}
            </div>
          );
        })}
      </div>

      {/* Cards Group */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {courses.map((ele, index) => {
          return (
            <CourseCard
              key={index}
              cardData={ele}
              currentCard={currentCard}
              setCurrentCard={setCurrentCard}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ExploreMore;
