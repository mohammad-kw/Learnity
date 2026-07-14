// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux';
// import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
// import { getInstructorData } from '../../../../services/operations/profileAPI';
// import InstructorChart from './InstructorChart';
// import { Link } from 'react-router-dom';

// export default function Instructor() {
//     const { token } = useSelector((state) => state.auth)
//     const { user } = useSelector((state) => state.profile)
//     const [loading, setLoading] = useState(false)
//     const [instructorData, setInstructorData] = useState(null)
//     const [courses, setCourses] = useState([])

//     useEffect(() => {
//       ;(async () => {
//         setLoading(true)
//         const instructorApiData = await getInstructorData(token)
//         const result = await fetchInstructorCourses(token)
//         console.log(instructorApiData)
//         if (instructorApiData.length) setInstructorData(instructorApiData)
//         if (result) {
//           setCourses(result)
//         }
//         setLoading(false)
//       })()
//     }, [])

//     const totalAmount = instructorData?.reduce(
//       (acc, curr) => acc + curr.totalAmountGenerated,
//       0
//     )

//     const totalStudents = instructorData?.reduce(
//       (acc, curr) => acc + curr.totalStudentsEnrolled,
//       0
//     )

//     return (
//       <div>
//         <div className="space-y-2">
//           <h1 className="text-2xl font-bold text-richblack-5">
//             Hi {user?.firstName} 👋
//           </h1>
//           <p className="font-medium text-richblack-200">
//             Let's start something new
//           </p>
//         </div>
//         {loading ? (
//           <div className="spinner"></div>
//         ) : courses.length > 0 ? (
//           <div>
//             <div className="my-4 flex h-[450px] space-x-4">
//               {/* Render chart / graph */}
//               {totalAmount > 0 || totalStudents > 0 ? (
//                 <InstructorChart courses={instructorData} />
//               ) : (
//                 <div className="flex-1 rounded-md bg-richblack-800 p-6">
//                   <p className="text-lg font-bold text-richblack-5">Visualize</p>
//                   <p className="mt-4 text-xl font-medium text-richblack-50">
//                     Not Enough Data To Visualize
//                   </p>
//                 </div>
//               )}
//               {/* Total Statistics */}
//               <div className="flex min-w-[250px] flex-col rounded-md bg-richblack-800 p-6">
//                 <p className="text-lg font-bold text-richblack-5">Statistics</p>
//                 <div className="mt-4 space-y-4">
//                   <div>
//                     <p className="text-lg text-richblack-200">Total Courses</p>
//                     <p className="text-3xl font-semibold text-richblack-50">
//                       {courses.length}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-lg text-richblack-200">Total Students</p>
//                     <p className="text-3xl font-semibold text-richblack-50">
//                       {totalStudents}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-lg text-richblack-200">Total Income</p>
//                     <p className="text-3xl font-semibold text-richblack-50">
//                       Rs. {totalAmount}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="rounded-md bg-richblack-800 p-6">
//               {/* Render 3 courses */}
//               <div className="flex items-center justify-between">
//                 <p className="text-lg font-bold text-richblack-5">Your Courses</p>
//                 <Link to="/dashboard/my-courses">
//                   <p className="text-xs font-semibold text-yellow-50">View All</p>
//                 </Link>
//               </div>
//               <div className="my-4 flex items-start space-x-6">
//                 {courses.slice(0, 3).map((course) => (
//                   <div key={course._id} className="w-1/3">
//                     <img
//                       src={course.thumbnail}
//                       alt={course.courseName}
//                       className="h-[201px] w-full rounded-md object-cover"
//                     />
//                     <div className="mt-3 w-full">
//                       <p className="text-sm font-medium text-richblack-50">
//                         {course.courseName}
//                       </p>
//                       <div className="mt-1 flex items-center space-x-2">
//                         <p className="text-xs font-medium text-richblack-300">
//                           {course.studentsEnroled.length} students
//                         </p>
//                         <p className="text-xs font-medium text-richblack-300">
//                           |
//                         </p>
//                         <p className="text-xs font-medium text-richblack-300">
//                           Rs. {course.price}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="mt-20 rounded-md bg-richblack-800 p-6 py-20">
//             <p className="text-center text-2xl font-bold text-richblack-5">
//               You have not created any courses yet
//             </p>
//             <Link to="/dashboard/add-course">
//               <p className="mt-1 text-center text-lg font-semibold text-yellow-50">
//                 Create a course
//               </p>
//             </Link>
//           </div>
//         )}
//       </div>
//     )
//   }

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI";
import { getInstructorData } from "../../../../services/operations/profileAPI";
import InstructorChart from "./InstructorChart";
import { Link } from "react-router-dom";

export default function Instructor() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(false);
  const [instructorData, setInstructorData] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const instructorApiData = await getInstructorData(token);
        const result = await fetchInstructorCourses(token);
        if (instructorApiData.length) setInstructorData(instructorApiData);
        if (result) setCourses(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  const totalAmount = instructorData?.reduce(
    (acc, curr) => acc + curr.totalAmountGenerated,
    0,
  );

  const totalStudents = instructorData?.reduce(
    (acc, curr) => acc + curr.totalStudentsEnrolled,
    0,
  );

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-richblack-5">
            Hi {user?.firstName} 👋
          </h1>
          <p className="font-medium text-richblack-200">
            Let's start something new
          </p>
        </div>
        <Link to="/dashboard/add-course">
          <button className="rounded-md bg-brand-gradient px-6 py-2 text-sm font-semibold text-white shadow-purple-glow transition-all duration-200 hover:scale-[0.98]">
            + New Course
          </button>
        </Link>
      </div>

      {loading ? (
        <div className="mt-10 grid min-h-[40vh] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : courses.length > 0 ? (
        <div className="mt-8 space-y-8">
          {/* Stat cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="glass-card p-6">
              <p className="text-sm font-medium uppercase tracking-wide text-richblack-300">
                Total Courses
              </p>
              <p className="mt-2 text-3xl font-bold gradient-text">
                {courses.length}
              </p>
            </div>
            <div className="glass-card p-6">
              <p className="text-sm font-medium uppercase tracking-wide text-richblack-300">
                Total Students
              </p>
              <p className="mt-2 text-3xl font-bold gradient-text">
                {totalStudents || 0}
              </p>
            </div>
            <div className="glass-card p-6">
              <p className="text-sm font-medium uppercase tracking-wide text-richblack-300">
                Total Income
              </p>
              <p className="mt-2 text-3xl font-bold gradient-text">
                ₹ {totalAmount || 0}
              </p>
            </div>
          </div>

          {/* Chart */}
          <div className="flex flex-col gap-6 lg:flex-row">
            {totalAmount > 0 || totalStudents > 0 ? (
              <InstructorChart courses={instructorData} />
            ) : (
              <div className="flex-1 glass-card p-6">
                <p className="text-lg font-bold text-richblack-5">Visualize</p>
                <p className="mt-4 text-xl font-medium text-richblack-50">
                  Not Enough Data To Visualize
                </p>
              </div>
            )}
          </div>

          {/* Your Courses */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-richblack-5">Your Courses</p>
              <Link to="/dashboard/my-courses">
                <p className="text-sm font-semibold text-purple-100 hover:text-purple-50">
                  View All
                </p>
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {courses.slice(0, 3).map((course) => (
                <div
                  key={course._id}
                  className="group overflow-hidden rounded-xl border border-richblack-700 bg-richblack-800 transition-all duration-200 hover:shadow-purple-glow"
                >
                  <div className="overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.courseName}
                      className="h-[160px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <p className="line-clamp-1 text-sm font-semibold text-richblack-5">
                      {course.courseName}
                    </p>
                    <div className="mt-2 flex items-center gap-2 text-xs font-medium text-richblack-300">
                      <span>
                        {Array.isArray(course.studentsEnroled)
                          ? course.studentsEnroled.length
                          : 0}{" "}
                        students
                      </span>
                      <span>|</span>
                      <span>₹ {course.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-center gap-4 glass-card p-12 text-center">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-richblack-700 text-3xl">
            🎓
          </div>
          <p className="text-xl font-semibold text-richblack-5">
            You have not created any courses yet
          </p>
          <p className="max-w-md text-sm text-richblack-300">
            Share your knowledge with the world. Create your first course to get
            started.
          </p>
          <Link to="/dashboard/add-course">
            <button className="mt-2 rounded-md bg-brand-gradient px-6 py-2 text-sm font-semibold text-white transition-all duration-200 hover:scale-[0.98]">
              Create a course
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
