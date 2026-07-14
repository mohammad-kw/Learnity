import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { NavbarLinks } from "../../data/navbar-links";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { ACCOUNT_TYPE } from "../../utils/constants";
import ProfileDropdown from "../core/Auth/ProfileDropDown";

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();
  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Ref to track the dropdown

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        setSubLinks(res.data.data);
      } catch (error) {
        console.log("Could not fetch Categories.", error);
      }
      setLoading(false);
    };

    fetchCategories();
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen); // Toggle dropdown visibility
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false); // Close dropdown if clicking outside
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const matchRoute = (route) => {
    return location.pathname === route;
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="navbarContainer sticky top-0 left-0 z-[1000] px-4 pt-3">
      <div className="flex items-center justify-center bg-richblack-800/50 backdrop-blur-xl border border-white/10 rounded-2xl shadow-glass max-w-maxContent mx-auto">
        <div className="flex flex-col md:flex-row w-full max-w-maxContent items-center justify-between px-6 py-2">
          <div className="flex items-center justify-between w-full md:w-auto px-1 py-1">
            <Link to="/" onClick={closeMobileMenu}>
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-gradient shadow-purple-glow font-bold text-white text-lg">
                  L
                </span>
                <span className="text-2xl font-bold tracking-tight gradient-text">
                  Learnity
                </span>
              </div>
            </Link>
            <button
              className="block md:hidden text-2xl text-richblack-25 focus:outline-none"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? "✖" : <AiOutlineMenu />}
            </button>
          </div>
          <nav
            className={`${
              mobileMenuOpen ? "block" : "hidden"
            } md:block mt-4 md:mt-0`}
          >
            <ul className="flex flex-col md:flex-row w-full max-w-maxContent items-center justify-between px-4 py-2 gap-y-4 md:gap-y-0 md:gap-x-14">
              {NavbarLinks.map(({ title, path }, index) => (
                <li
                  key={index}
                  className="mb-2 md:mb-0 transition duration-300 ease-in-out transform hover:text-purple-100 hover:scale-105 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-purple-300 after:bottom-0 after:left-0 after:transition-all after:duration-700 after:ease-in-out hover:after:w-full"
                >
                  {title === "Catalog" ? (
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-purple-100 hover:text-purple-200"
                          : "text-richblack-25 hover:text-richblack-50"
                      }`}
                      onClick={toggleDropdown}
                      ref={dropdownRef} // Attach ref to dropdown wrapper
                    >
                      <p>{title}</p>
                      <BsChevronDown
                        className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                      />
                      {dropdownOpen && (
                        <div className="absolute left-[50%] top-full z-[1000] mt-4 flex w-[220px] translate-x-[-50%] flex-col gap-1 rounded-xl border border-purple-400/30 bg-richblack-800/95 p-2 text-richblack-5 shadow-purple-glow backdrop-blur-md transition-all duration-150">
                          <div className="absolute left-[50%] top-0 -z-10 h-4 w-4 translate-x-[-50%] translate-y-[-40%] rotate-45 select-none rounded-sm border-l border-t border-purple-400/30 bg-richblack-800"></div>
                          {loading ? (
                            <p className="py-4 text-center text-richblack-200">
                              Loading...
                            </p>
                          ) : subLinks && subLinks.length ? (
                            <>
                              {subLinks
                                .filter(
                                  (subLink) => subLink?.courses?.length > 0,
                                )
                                .map((subLink, i) => (
                                  <Link
                                    to={`/catalog/${subLink.name
                                      .split(" ")
                                      .join("-")
                                      .toLowerCase()}`}
                                    className="rounded-lg bg-transparent px-4 py-3 text-sm text-richblack-100 transition-all duration-200 hover:bg-purple-400/20 hover:text-purple-100"
                                    key={i}
                                    onClick={toggleDropdown} // Optionally close on click
                                  >
                                    <p>{subLink.name}</p>
                                  </Link>
                                ))}
                            </>
                          ) : (
                            <p className="py-4 text-center text-richblack-200">
                              No Courses Found
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link to={path} onClick={closeMobileMenu}>
                      <p
                        className={`${
                          matchRoute(path)
                            ? "text-purple-100"
                            : "text-richblack-25"
                        } hover:text-purple-100`}
                      >
                        {title}
                      </p>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div
            className={`${
              mobileMenuOpen ? "block" : "hidden"
            } md:block mt-2 md:mt-0`}
          >
            <div className="flex flex-col items-center md:flex-row md:items-center justify-center md:justify-start gap-y-4 md:gap-y-0 gap-x-8">
              {user && user.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                <Link
                  to="/dashboard/cart"
                  className="relative"
                  onClick={closeMobileMenu}
                >
                  <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                  {totalItems > 0 && (
                    <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-500">
                      {totalItems}
                    </span>
                  )}
                </Link>
              )}
              {!token && (
                <div className="flex flex-col md:flex-row items-center md:items-start gap-y-4 md:gap-y-0 md:gap-x-4">
                  <Link to="/login" onClick={closeMobileMenu}>
                    <button
                      className={`w-[100px] rounded-xl px-4 py-2 text-center font-semibold transition-all duration-300 hover:scale-95 ${
                        matchRoute("/login")
                          ? "bg-white/10 text-white border border-white/15"
                          : "bg-white/5 backdrop-blur-md border border-white/15 text-white hover:bg-white/10 hover:border-purple-200/40"
                      }`}
                    >
                      Log In
                    </button>
                  </Link>
                  <Link to="/signup" onClick={closeMobileMenu}>
                    <button
                      className={`w-[100px] rounded-xl px-4 py-2 text-center font-semibold transition-all duration-300 hover:scale-95 ${
                        matchRoute("/signup")
                          ? "bg-white/10 text-white border border-white/15"
                          : "bg-brand-gradient text-white shadow-purple-glow"
                      }`}
                    >
                      Sign Up
                    </button>
                  </Link>
                </div>
              )}
              {token && <ProfileDropdown />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
