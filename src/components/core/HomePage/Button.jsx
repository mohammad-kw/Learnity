import React from "react";
import { Link } from "react-router-dom";

const Button = ({ children, active, linkto }) => {
  return (
    <Link to={linkto}>
      <div
        className={`text-center text-[13px] sm:text-[16px] px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-95 ${
          active
            ? "bg-brand-gradient text-white shadow-purple-glow"
            : "bg-white/5 backdrop-blur-md border border-white/10 text-white hover:border-purple-200/40 hover:bg-white/10"
        }`}
      >
        {children}
      </div>
    </Link>
  );
};

export default Button;
