import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineShoppingCart } from "react-icons/hi";

import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";

export default function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart);

  return (
    <>
      <div className="mb-2 flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-richblack-5">My Cart</h1>
        {totalItems > 0 && (
          <span className="rounded-full border border-purple-300/40 bg-purple-300/10 px-3 py-1 text-sm font-medium text-purple-200">
            {totalItems} {totalItems === 1 ? "Course" : "Courses"}
          </span>
        )}
      </div>
      <p className="mb-8 text-sm text-richblack-300">
        Review your selected courses before checkout.
      </p>

      {total > 0 ? (
        <div className="flex flex-col items-start gap-8 lg:flex-row">
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      ) : (
        <div className="mt-10 flex flex-col items-center justify-center gap-6 glass-card py-20 text-center">
          <div className="grid h-20 w-20 place-items-center rounded-full bg-richblack-700 text-4xl text-purple-200">
            <HiOutlineShoppingCart />
          </div>
          <div>
            <p className="text-xl font-semibold text-richblack-5">
              Your cart is empty
            </p>
            <p className="mt-1 text-sm text-richblack-400">
              Explore our catalog and add courses you love.
            </p>
          </div>
          <Link
            to="/courses"
            className="rounded-lg bg-brand-gradient px-6 py-2 font-semibold text-white shadow-purple-glow transition-all duration-200 hover:scale-[0.98]"
          >
            Browse Courses
          </Link>
        </div>
      )}
    </>
  );
}
