export default function Spinner() {
  return (
    <div className="grid min-h-[60vh] w-full place-items-center bg-richblack-900">
      <div className="flex flex-col items-center gap-4">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-richblack-700 border-t-purple-400" />
        <p className="gradient-text text-sm font-semibold tracking-wide">
          Loading Learnity…
        </p>
      </div>
    </div>
  );
}
