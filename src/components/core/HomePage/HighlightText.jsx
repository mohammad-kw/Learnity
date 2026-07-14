import React from "react";

const HighlightText = ({ text }) => {
  return (
    <span className="bg-gradient-to-r from-[#A97FFF] via-[#7C3AED] to-[#C4B5FD] text-transparent bg-clip-text font-bold">
      {" "}
      {text}
    </span>
  );
};

export default HighlightText;
