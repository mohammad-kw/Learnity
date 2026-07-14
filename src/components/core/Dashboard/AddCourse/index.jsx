import RenderSteps from "./RenderSteps";

export default function AddCourse() {
  return (
    <>
      <div className="flex w-full items-start gap-x-6">
        <div className="flex flex-1 flex-col">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-richblack-5">
              Add Course
            </h1>
            <p className="mt-1 text-sm text-richblack-300">
              Create a new course and share your knowledge with the world.
            </p>
          </div>
          <div className="flex-1">
            <RenderSteps />
          </div>
        </div>
        {/* Course Upload Tips */}
        <div className="sticky top-[88px] hidden max-w-[400px] flex-1 self-start glass-card p-6 xl:block">
          <div className="mb-6 flex items-center gap-2">
            <span className="text-xl">⚡</span>
            <p className="text-lg font-semibold text-richblack-5">
              Course Upload Tips
            </p>
          </div>
          <ul className="space-y-4 text-sm text-richblack-100">
            {[
              "Set the Course Price option or make it free.",
              "Standard size for the course thumbnail is 1024x576.",
              "Video section controls the course overview video.",
              "Course Builder is where you create & organize a course.",
              "Add Topics in the Course Builder section to create lessons, quizzes, and assignments.",
              "Information from the Additional Data section shows up on the course single page.",
              "Make Announcements to notify important updates.",
              "Notes to all enrolled students at once.",
            ].map((tip, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-300" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
