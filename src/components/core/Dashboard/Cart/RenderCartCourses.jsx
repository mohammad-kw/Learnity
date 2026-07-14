import { FaStar } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";

import { removeFromCart } from "../../../../slices/cartSlice";
import GetAvgRating from "../../../../utils/avgRating";

export default function RenderCartCourses() {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-1 flex-col gap-4">
      {cart.map((course) => {
        const avgRating = GetAvgRating(course?.ratingAndReviews);
        return (
          <div
            key={course._id}
            className="group flex flex-col gap-4 glass-card p-4 transition-all duration-200 hover:shadow-purple-glow sm:flex-row"
          >
            {/* Thumbnail */}
            <div className="overflow-hidden rounded-xl sm:w-[200px]">
              <img
                src={course?.thumbnail}
                alt={course?.courseName}
                className="h-[140px] w-full object-cover transition-transform duration-300 group-hover:scale-105 sm:w-[200px]"
              />
            </div>

            {/* Details */}
            <div className="flex flex-1 flex-col justify-between gap-3">
              <div className="flex flex-col gap-1">
                <p className="line-clamp-1 text-base font-semibold text-richblack-5">
                  {course?.courseName}
                </p>
                <p className="text-sm text-richblack-300">
                  {course?.category?.name}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-yellow-100">
                    {avgRating || 0}
                  </span>
                  <ReactStars
                    count={5}
                    value={avgRating || 0}
                    size={18}
                    edit={false}
                    activeColor="#ffd700"
                    emptyIcon={<FaStar />}
                    fullIcon={<FaStar />}
                  />
                  <span className="text-sm text-richblack-400">
                    ({course?.ratingAndReviews?.length || 0})
                  </span>
                </div>
              </div>

              {/* Price + Remove */}
              <div className="flex items-center justify-between">
                <p className="text-xl font-bold gradient-text">
                  ₹ {course?.price}
                </p>
                <button
                  onClick={() => dispatch(removeFromCart(course._id))}
                  className="flex items-center gap-x-1 rounded-lg border border-richblack-600 bg-richblack-700 py-2 px-3 text-sm text-pink-200 transition-all duration-200 hover:border-pink-300 hover:text-pink-100"
                >
                  <RiDeleteBin6Line />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
