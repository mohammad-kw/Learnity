// Convert a number of seconds into a human-readable duration string.
export default function convertSecondsToDuration(totalSeconds) {
  const seconds = Number(totalSeconds) || 0;
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor((seconds % 3600) % 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  } else {
    return `${secs}s`;
  }
}

// Sum up the timeDuration of every sub-section in a course's content.
export function getCourseTotalDuration(course) {
  let totalSeconds = 0;
  course?.courseContent?.forEach((section) => {
    section?.subSection?.forEach((subSection) => {
      const duration = parseFloat(subSection?.timeDuration);
      if (!isNaN(duration)) {
        totalSeconds += duration;
      }
    });
  });
  return convertSecondsToDuration(totalSeconds);
}
