import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaYoutube,
  FaXTwitter,
  FaLinkedin,
  FaInstagram,
  FaGithub,
} from "react-icons/fa6";
import { FiArrowRight } from "react-icons/fi";
import "../../App.css";

const linkColumns = [
  {
    title: "Company",
    links: [
      { name: "About", to: "/about" },
      { name: "Contact", to: "/contact" },
      { name: "Careers", to: "/careers" },
      { name: "Affiliates", to: "/affiliates" },
    ],
  },
  {
    title: "Explore",
    links: [
      { name: "All Courses", to: "/courses" },
      { name: "Catalog", to: "/catalog/web-development" },
      { name: "Become an Instructor", to: "/signup" },
      { name: "Help Center", to: "/help-center" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", to: "/privacy-policy" },
      { name: "Cookie Policy", to: "/cookie-policy" },
      { name: "Terms", to: "/terms" },
      { name: "Report", to: "/report" },
    ],
  },
];

const socials = [
  { icon: <FaXTwitter />, link: "https://www.twitter.com", label: "Twitter" },
  { icon: <FaLinkedin />, link: "https://www.linkedin.com", label: "LinkedIn" },
  {
    icon: <FaInstagram />,
    link: "https://www.instagram.com",
    label: "Instagram",
  },
  { icon: <FaYoutube />, link: "https://www.youtube.com", label: "YouTube" },
  { icon: <FaFacebook />, link: "https://www.facebook.com", label: "Facebook" },
  {
    icon: <FaGithub />,
    link: "https://github.com/mohammad-kw/Learnity",
    label: "GitHub",
  },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-richblack-900 text-richblack-300">
      {/* Ambient purple glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full bg-purple-500/10 blur-[120px]" />

      <div className="relative mx-auto w-11/12 max-w-maxContent">
        {/* Top: brand + newsletter + links */}
        <div className="grid grid-cols-1 gap-12 py-14 lg:grid-cols-12 lg:gap-8">
          {/* Brand + newsletter */}
          <div className="lg:col-span-5">
            <Link to="/" className="flex items-center gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-gradient shadow-purple-glow text-lg font-bold text-white">
                L
              </span>
              <span className="gradient-text text-2xl font-bold tracking-tight">
                Learnity
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-richblack-400">
              Empowering learners everywhere with in-demand skills, hands-on
              projects, and mentorship from industry experts.
            </p>

            {/* Newsletter */}
            <div className="mt-6 max-w-sm">
              <p className="text-sm font-semibold text-richblack-50">
                Subscribe to our newsletter
              </p>
              <form
                className="mt-3 flex items-center gap-2"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-white/10 bg-richblack-800 px-4 py-2.5 text-sm text-richblack-25 placeholder:text-richblack-500 transition-all duration-200 focus:border-purple-400 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="grid h-[42px] w-[46px] shrink-0 place-items-center rounded-lg bg-brand-gradient text-white shadow-purple-glow transition-transform duration-200 hover:scale-95"
                >
                  <FiArrowRight className="text-lg" />
                </button>
              </form>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            {linkColumns.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-richblack-50">
                  {col.title}
                </h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.to}
                        className="text-sm text-richblack-400 transition-colors duration-200 hover:text-purple-200"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-white/10" />

        {/* Bottom bar */}
        <div className="flex flex-col-reverse items-center justify-between gap-6 py-8 sm:flex-row">
          <p className="text-center text-sm text-richblack-400">
            © {new Date().getFullYear()} Learnity. Made with{" "}
            <span className="text-pink-200">❤</span> for learners.
          </p>

          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-richblack-800 text-richblack-200 transition-all duration-200 hover:-translate-y-0.5 hover:border-purple-300/50 hover:bg-purple-900/30 hover:text-purple-100"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
