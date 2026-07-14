import * as Icons from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { NavLink, matchPath, useLocation } from "react-router-dom";

import { resetCourseState } from "../../../slices/courseSlice";

export default function SidebarLink({ link, iconName, onClick }) {
  const Icon = Icons[iconName];
  const location = useLocation();
  const dispatch = useDispatch();

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const handleClick = () => {
    dispatch(resetCourseState());
    onClick?.();
  };

  return (
    <NavLink
      to={link.path}
      onClick={handleClick}
      className={`relative px-8 py-2 text-sm font-medium ${
        matchRoute(link.path)
          ? "bg-purple-900/40 text-purple-100"
          : "bg-opacity-0 text-richblack-300"
      } transition-all duration-200`}
    >
      <span
        className={`absolute left-0 top-0 h-full w-[0.15rem] bg-purple-300 ${
          matchRoute(link.path) ? "opacity-100" : "opacity-0"
        }`}
      ></span>
      <div className="flex items-center gap-x-2">
        {/* Icon Goes Here */}
        <Icon className="text-lg" />
        <span>{link.name}</span>
      </div>
    </NavLink>
  );
}
