import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import IconBtn from "../../../common/IconBtn";
import { buyCourse } from "../../../../services/operations/studentFeaturesAPI";

export default function RenderTotalAmount() {
  const { total, totalItems, cart } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id);
    buyCourse(token, courses, user, navigate, dispatch);
  };

  return (
    <div className="w-full glass-card p-6 lg:sticky lg:top-24 lg:w-[320px]">
      <p className="mb-4 text-lg font-semibold text-richblack-5">
        Order Summary
      </p>

      <div className="flex flex-col gap-3 border-b border-richblack-700 pb-4">
        <div className="flex items-center justify-between text-sm text-richblack-300">
          <span>
            {totalItems} {totalItems === 1 ? "Course" : "Courses"}
          </span>
          <span className="text-richblack-100">₹ {total}</span>
        </div>
        <div className="flex items-center justify-between text-sm text-richblack-300">
          <span>Discount</span>
          <span className="text-caribbeangreen-300">₹ 0</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm font-medium text-richblack-300">Total</p>
        <p className="text-2xl font-bold gradient-text">₹ {total}</p>
      </div>

      <IconBtn
        text="Checkout Now"
        onclick={handleBuyCourse}
        customClasses="mt-6 w-full justify-center"
      />

      <p className="mt-3 text-center text-xs text-richblack-400">
        30-Day Money-Back Guarantee
      </p>
    </div>
  );
}
