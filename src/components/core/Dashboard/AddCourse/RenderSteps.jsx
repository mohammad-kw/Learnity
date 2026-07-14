import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";

import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import PublishCourse from "./PublishCourse";

export default function RenderSteps() {
  const { step } = useSelector((state) => state.course);

  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ];

  return (
    <>
      <div className="relative mb-2 flex w-full justify-center">
        {steps.map((item) => (
          <div className="flex items-center" key={item.id}>
            <button
              className={`grid aspect-square w-[40px] cursor-default place-items-center rounded-full border transition-all duration-300 ${
                step === item.id
                  ? "border-purple-300 bg-purple-900/60 text-purple-100 shadow-purple-glow"
                  : step > item.id
                    ? "border-purple-300 bg-purple-300 text-richblack-900"
                    : "border-richblack-700 bg-richblack-800 text-richblack-300"
              }`}
            >
              {step > item.id ? (
                <FaCheck className="font-bold text-richblack-900" />
              ) : (
                item.id
              )}
            </button>
            {item.id !== steps.length && (
              <div
                className={`h-0.5 w-[80px] border-b-2 border-dashed transition-all duration-300 sm:w-[120px] ${
                  step > item.id ? "border-purple-300" : "border-richblack-600"
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>

      <div className="relative mb-12 flex w-full select-none justify-center">
        {steps.map((item) => (
          <div
            className="flex w-[120px] flex-col items-center sm:w-[160px]"
            key={item.id}
          >
            <p
              className={`text-sm font-medium ${
                step >= item.id ? "text-richblack-5" : "text-richblack-500"
              }`}
            >
              {item.title}
            </p>
          </div>
        ))}
      </div>
      {/* Render specific component based on current step */}
      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse />}
    </>
  );
}
