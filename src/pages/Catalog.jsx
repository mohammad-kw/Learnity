// import React, { useEffect, useState } from 'react'
// import Footer from '../components/common/Footer'
// import { useParams } from 'react-router-dom'
// import { apiConnector } from '../services/apiconnector';
// import { categories } from '../services/apis';
// import { getCatalogaPageData } from '../services/operations/pageAndComponentData';
// import Course_Card from '../components/core/Catalog/Course_Card';
// import CourseSlider from '../components/core/Catalog/CourseSlider';
// import { useSelector } from "react-redux"
// import Error from "./Error"

// const Catalog = () => {

//     const { loading } = useSelector((state) => state.profile)
//   const { catalogName } = useParams()
//   const [active, setActive] = useState(1)
//     const [catalogPageData, setCatalogPageData] = useState(null);
//     const [categoryId, setCategoryId] = useState("");

//     //Fetch all categories
//     useEffect(()=> {
//         const getCategories = async() => {
//             const res = await apiConnector("GET", categories.CATEGORIES_API);
//             const category_id =
//             res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
//             setCategoryId(category_id);
//         }
//         getCategories();
//     },[catalogName]);

//     useEffect(() => {
//         const getCategoryDetails = async() => {
//             try{
//                 const res = await getCatalogaPageData(categoryId);
//                 console.log("PRinting res: ", res);
//                 setCatalogPageData(res);
//             }
//             catch(error) {
//                 console.log(error)
//             }
//         }
//         if(categoryId) {
//             getCategoryDetails();
//         }

//     },[categoryId]);

//     if (loading || !catalogPageData) {
//         return (
//           <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
//             <div className="spinner"></div>
//           </div>
//         )
//       }
//       if (!loading && !catalogPageData.success) {
//         return <Error />
//       }

//       return (
//         <>
//           {/* Hero Section */}
//           <div className=" box-content bg-richblack-800 px-4">
//             <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
//               <p className="text-sm text-richblack-300">
//                 {`Home / Catalog / `}
//                 <span className="text-yellow-25">
//                   {catalogPageData?.data?.selectedCategory?.name}
//                 </span>
//               </p>
//               <p className="text-3xl text-richblack-5">
//                 {catalogPageData?.data?.selectedCategory?.name}
//               </p>
//               <p className="max-w-[870px] text-richblack-200">
//                 {catalogPageData?.data?.selectedCategory?.description}
//               </p>
//             </div>
//           </div>

//           {/* Section 1 */}
//           <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
//             <div className="section_heading">Courses to get you started</div>
//             <div className="my-4 flex border-b border-b-richblack-600 text-sm">
//               <p
//                 className={`px-4 py-2 ${
//                   active === 1
//                     ? "border-b border-b-yellow-25 text-yellow-25"
//                     : "text-richblack-50"
//                 } cursor-pointer`}
//                 onClick={() => setActive(1)}
//               >
//                 Most Populer
//               </p>
//               <p
//                 className={`px-4 py-2 ${
//                   active === 2
//                     ? "border-b border-b-yellow-25 text-yellow-25"
//                     : "text-richblack-50"
//                 } cursor-pointer`}
//                 onClick={() => setActive(2)}
//               >
//                 New
//               </p>
//             </div>
//             <div>
//               <CourseSlider
//                 Courses={catalogPageData?.data?.selectedCategory?.courses}
//               />
//             </div>
//           </div>
//           {/* Section 2 */}
//           <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
//             <div className="section_heading">
//               Top courses in {catalogPageData?.data?.differentCategory?.name}
//             </div>
//             <div className="py-8">
//               <CourseSlider
//                 Courses={catalogPageData?.data?.differentCategory?.courses}
//               />
//             </div>
//           </div>

//           {/* Section 3 */}
//           <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
//             <div className="section_heading">Frequently Bought</div>
//             <div className="py-8">
//               <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
//                 {catalogPageData?.data?.mostSellingCourses
//                   ?.slice(0, 4)
//                   .map((course, i) => (
//                     <Course_Card course={course} key={i} Height={"h-[400px]"} />
//                   ))}
//               </div>
//             </div>
//           </div>

//           <Footer />
//         </>
//       )
//     }

//     export default Catalog

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HiOutlineSearch } from "react-icons/hi";
import { apiConnector } from "../services/apiconnector";
import { categories } from "../services/apis";
import { getCatalogaPageData } from "../services/operations/pageAndComponentData";
import Course_Card from "../components/core/Catalog/Course_Card";
import { useSelector } from "react-redux";
import Error from "./Error";

const Catalog = () => {
  const { loading } = useSelector((state) => state.profile);
  const { catalogName } = useParams();
  const [active, setActive] = useState(1);
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [categoryNotFound, setCategoryNotFound] = useState(false);
  const [query, setQuery] = useState("");

  // Fetch all categories and set the categoryId based on the catalogName from URL
  useEffect(() => {
    const getCategories = async () => {
      setCategoryNotFound(false);
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);

        const category_id = res?.data?.data?.filter(
          (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName,
        )?.[0]?._id;

        if (category_id) {
          setCategoryId(category_id);
        } else {
          setCategoryNotFound(true);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategoryNotFound(true);
      }
    };

    getCategories();
  }, [catalogName]);

  // Fetch the catalog page data based on categoryId
  useEffect(() => {
    const getCategoryDetails = async () => {
      if (!categoryId) return; // If no categoryId, skip the API call
      try {
        const res = await getCatalogaPageData(categoryId);
        setCatalogPageData(res);
      } catch (error) {
        console.error("Error fetching catalog page data:", error);
      }
    };

    if (categoryId) {
      getCategoryDetails();
    }
  }, [categoryId]);

  // Handle loading and error states
  if (categoryNotFound) {
    return <Error />;
  }

  if (loading || !catalogPageData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!loading && !catalogPageData.success) {
    return <Error />;
  }

  const categoryCourses =
    catalogPageData?.data?.selectedCategory?.courses || [];
  const q = query.trim().toLowerCase();
  const filteredCourses = !q
    ? categoryCourses
    : categoryCourses.filter((course) => {
        const name = course?.courseName?.toLowerCase() || "";
        const instructor = `${course?.instructor?.firstName || ""} ${
          course?.instructor?.lastName || ""
        }`.toLowerCase();
        return name.includes(q) || instructor.includes(q);
      });

  return (
    <>
      {/* Hero Section */}
      <div className="box-content bg-richblack-800 px-4">
        <div className="mx-auto flex min-h-[180px] max-w-maxContentTab flex-col justify-center gap-2 py-8 lg:max-w-maxContent">
          <p className="text-xs uppercase tracking-widest text-purple-200">
            Category
          </p>
          <h1 className="text-3xl font-bold text-richblack-5 lg:text-4xl">
            {catalogPageData?.data?.selectedCategory?.name}
          </h1>
          <p className="max-w-[870px] text-sm text-richblack-200">
            {catalogPageData?.data?.selectedCategory?.description}
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

      {/* Main grid: courses in this category */}
      <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-richblack-5">
            Courses to get you started
          </h2>
          {/* Sort tabs */}
          <div className="flex items-center gap-1 rounded-lg border border-richblack-700 bg-richblack-800 p-1 text-sm">
            <button
              className={`rounded-md px-4 py-1.5 transition-all ${
                active === 1
                  ? "bg-richblack-700 text-purple-100"
                  : "text-richblack-300"
              }`}
              onClick={() => setActive(1)}
            >
              Most Popular
            </button>
            <button
              className={`rounded-md px-4 py-1.5 transition-all ${
                active === 2
                  ? "bg-richblack-700 text-purple-100"
                  : "text-richblack-300"
              }`}
              onClick={() => setActive(2)}
            >
              New
            </button>
          </div>
        </div>

        {filteredCourses.length === 0 ? (
          <div className="grid min-h-[30vh] place-items-center text-center">
            <div>
              <p className="text-lg font-semibold text-richblack-5">
                No courses found
              </p>
              <p className="mt-1 text-sm text-richblack-400">
                {query
                  ? "Try a different search term."
                  : "No courses in this category yet."}
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
              {filteredCourses.map((course, i) => (
                // eslint-disable-next-line react/jsx-pascal-case
                <Course_Card course={course} key={i} Height={"h-[180px]"} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Section 2: Top Courses in Different Category */}
      {catalogPageData?.data?.differentCategory?.courses?.length > 0 && (
        <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
          <h2 className="mb-6 text-2xl font-bold text-richblack-5">
            Top courses in {catalogPageData?.data?.differentCategory?.name}
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {catalogPageData?.data?.differentCategory?.courses
              ?.slice(0, 6)
              .map((course, i) => (
                // eslint-disable-next-line react/jsx-pascal-case
                <Course_Card course={course} key={i} Height={"h-[180px]"} />
              ))}
          </div>
        </div>
      )}

      {/* Section 3: Frequently Bought */}
      {catalogPageData?.data?.mostSellingCourses?.length > 0 && (
        <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
          <h2 className="mb-6 text-2xl font-bold text-richblack-5">
            Frequently Bought
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {catalogPageData?.data?.mostSellingCourses
              ?.slice(0, 6)
              .map((course, i) => (
                // eslint-disable-next-line react/jsx-pascal-case
                <Course_Card course={course} key={i} Height={"h-[180px]"} />
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Catalog;
