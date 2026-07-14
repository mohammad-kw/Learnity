import { useEffect, useState } from "react";
import { VscAdd } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI";
import IconBtn from "../../common/IconBtn";
import CoursesTable from "./InstructorCourses/CoursesTable";

export default function MyCourses() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token);
      if (result) {
        setCourses(result);
      }
    };
    fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold text-richblack-5">
            My Courses
          </h1>
          {courses?.length > 0 && (
            <span className="rounded-full border border-purple-300/40 bg-purple-300/10 px-3 py-1 text-sm font-medium text-purple-200">
              {courses.length} {courses.length === 1 ? "course" : "courses"}
            </span>
          )}
        </div>
        <IconBtn
          text="Add Course"
          onclick={() => navigate("/dashboard/add-course")}
        >
          <VscAdd />
        </IconBtn>
      </div>
      {courses && <CoursesTable courses={courses} setCourses={setCourses} />}
    </div>
  );
}
