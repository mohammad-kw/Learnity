import React, { useEffect, useMemo, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";

import Footer from "../components/common/Footer";
import CourseCard from "../components/core/Catalog/Course_Card";
import { getAllCourses } from "../services/operations/courseDetailsAPI";

const AllCourses = () => {
  const [courses, setCourses] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await getAllCourses();
      setCourses(res || []);
    };
    fetchCourses();
  }, []);

  const filteredCourses = useMemo(() => {
    if (!courses) return [];
    const q = query.trim().toLowerCase();
    if (!q) return courses;
    return courses.filter((course) => {
      const name = course?.courseName?.toLowerCase() || "";
      const instructor = `${course?.instructor?.firstName || ""} ${
        course?.instructor?.lastName || ""
      }`.toLowerCase();
      return name.includes(q) || instructor.includes(q);
    });
  }, [courses, query]);

  return (
    <>
      {/* Hero */}
      <div className="box-content bg-richblack-800 px-4">
        <div className="mx-auto flex min-h-[180px] max-w-maxContentTab flex-col justify-center gap-2 py-8 lg:max-w-maxContent">
          <p className="text-xs uppercase tracking-widest text-purple-200">
            Explore
          </p>
          <h1 className="text-3xl font-bold text-richblack-5 lg:text-4xl">
            All Courses
          </h1>
          <p className="max-w-[870px] text-richblack-200">
            Browse every course available on Learnity and find your next skill.
          </p>

          {/* Search */}
          <div className="mt-4 flex max-w-[500px] items-center gap-2 rounded-lg border border-richblack-600 bg-richblack-700 px-4 py-2 focus-within:border-purple-300">
            <HiOutlineSearch className="text-xl text-richblack-300" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search courses or instructors..."
              className="w-full bg-transparent text-richblack-5 placeholder:text-richblack-400 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        {!courses ? (
          <div className="grid min-h-[40vh] place-items-center">
            <div className="spinner"></div>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="grid min-h-[40vh] place-items-center text-center">
            <div>
              <p className="text-lg font-semibold text-richblack-5">
                No courses found
              </p>
              <p className="mt-1 text-sm text-richblack-400">
                {query
                  ? "Try a different search term."
                  : "No courses have been published yet."}
              </p>
            </div>
          </div>
        ) : (
          <>
            <p className="mb-6 text-sm text-richblack-300">
              Showing {filteredCourses.length}{" "}
              {filteredCourses.length === 1 ? "course" : "courses"}
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.map((course) => (
                <CourseCard
                  course={course}
                  key={course._id}
                  Height={"h-[180px]"}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <Footer />
    </>
  );
};

export default AllCourses;
