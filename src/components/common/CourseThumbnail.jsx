import React, { useState } from "react";

/**
 * Renders a course thumbnail with a graceful fallback.
 * When the image is missing or fails to load (e.g. the URL points to an
 * unreachable host), a styled placeholder with the course initials is shown
 * instead of a broken-image icon + alt text.
 */
const CourseThumbnail = ({ src, alt = "course thumbnail", className = "" }) => {
  const [failed, setFailed] = useState(false);

  const showPlaceholder = !src || failed;

  // Derive up to two initials from the course name for the placeholder.
  const initials = (alt || "Course")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

  if (showPlaceholder) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-richblack-700 to-richblack-800 ${className}`}
        aria-label={alt}
        role="img"
      >
        <span className="text-4xl font-bold text-richblack-400 select-none">
          {initials || "📚"}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
};

export default CourseThumbnail;
