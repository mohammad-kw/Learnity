import { useRef, useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { logout } from "../../../services/operations/authAPI";

export default function ProfileDropdown() {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const ref = useRef(null);

  useOnClickOutside(ref, () => setOpen(false));

  if (!user) return null;

  const initials =
    `${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}`.toUpperCase() ||
    "U";
  const hasImage = user?.image && !imgError;

  return (
    <button className="relative" onClick={() => setOpen(true)}>
      <div className="flex items-center gap-x-1">
        {hasImage ? (
          <img
            src={user.image}
            alt={`profile-${user?.firstName}`}
            onError={() => setImgError(true)}
            className="aspect-square w-[30px] rounded-full border border-purple-400/40 object-cover"
          />
        ) : (
          <div className="grid aspect-square w-[30px] place-items-center rounded-full bg-brand-gradient text-xs font-semibold text-white">
            {initials}
          </div>
        )}
        <AiOutlineCaretDown className="text-sm text-richblack-100" />
      </div>
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-purple-400/30 bg-richblack-800"
          ref={ref}
        >
          <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
            <div className="flex w-full items-center gap-x-2 py-[10px] px-[12px] text-sm text-richblack-100 transition-all duration-200 hover:bg-purple-400/20 hover:text-purple-100">
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </Link>
          <div
            onClick={() => {
              dispatch(logout(navigate));
              setOpen(false);
            }}
            className="flex w-full items-center gap-x-2 py-[10px] px-[12px] text-sm text-richblack-100 transition-all duration-200 hover:bg-purple-400/20 hover:text-purple-100"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>
        </div>
      )}
    </button>
  );
}
