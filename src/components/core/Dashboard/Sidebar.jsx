import { useState } from "react";
import { useSelector } from "react-redux";
import { AiOutlineMenu } from "react-icons/ai";
import { VscClose } from "react-icons/vsc";

import { sidebarLinks } from "../../../data/dashboard-links";
import SidebarLink from "./SidebarLink";

export default function Sidebar() {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile,
  );
  const { loading: authLoading } = useSelector((state) => state.auth);
  const [mobileOpen, setMobileOpen] = useState(false);

  if (profileLoading || authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r border-r-richblack-700 bg-richblack-800 md:sticky md:top-[76px]">
        <div className="spinner"></div>
      </div>
    );
  }

  const closeMobile = () => setMobileOpen(false);

  const links = (
    <>
      <div className="flex flex-col">
        {sidebarLinks.map((link) => {
          if (link.type && user?.accountType !== link.type) return null;
          return (
            <SidebarLink
              key={link.id}
              link={link}
              iconName={link.icon}
              onClick={closeMobile}
            />
          );
        })}
      </div>
      <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />
      <div className="flex flex-col">
        <SidebarLink
          link={{ name: "Settings", path: "/dashboard/settings" }}
          iconName="VscSettingsGear"
          onClick={closeMobile}
        />
      </div>
    </>
  );

  return (
    <>
      {/* Mobile top bar with hamburger (hidden on md+) */}
      <div className="flex w-full items-center gap-3 border-b border-richblack-700 bg-richblack-800 px-4 py-3 md:hidden">
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open dashboard menu"
          className="grid h-9 w-9 place-items-center rounded-md border border-richblack-600 bg-richblack-700 text-xl text-richblack-25"
        >
          <AiOutlineMenu />
        </button>
        <span className="text-sm font-medium text-richblack-100">
          Dashboard Menu
        </span>
      </div>

      {/* Desktop sticky sidebar (hidden on mobile) */}
      <div className="hidden h-[calc(100vh-76px)] min-w-[220px] flex-col border-r border-r-richblack-700 bg-richblack-800 py-10 md:sticky md:top-[76px] md:flex">
        {links}
      </div>

      {/* Mobile slide-in drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[1100] md:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeMobile}
            aria-hidden="true"
          />
          {/* Panel */}
          <div className="absolute left-0 top-0 flex h-full w-[260px] max-w-[80%] flex-col overflow-y-auto border-r border-richblack-700 bg-richblack-800 py-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between px-6">
              <span className="text-sm font-semibold text-richblack-100">
                Menu
              </span>
              <button
                onClick={closeMobile}
                aria-label="Close dashboard menu"
                className="grid h-8 w-8 place-items-center rounded-md border border-richblack-600 bg-richblack-700 text-lg text-richblack-25"
              >
                <VscClose />
              </button>
            </div>
            {links}
          </div>
        </div>
      )}
    </>
  );
}
