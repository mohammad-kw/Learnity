import { useSelector } from "react-redux";

import frameImg from "../../../assets/Images/frame.png";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function Template({ title, description1, description2, image, formType }) {
  const { loading } = useSelector((state) => state.auth);

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center overflow-hidden px-4">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col-reverse items-center justify-between gap-y-8 py-8 md:flex-row md:gap-y-0 md:gap-x-12">
          {/* Purple ambient glow */}
          <div className="pointer-events-none absolute -top-10 left-1/4 h-72 w-72 rounded-full bg-purple-500/20 blur-[120px]" />

          <div className="mx-auto w-11/12 max-w-[450px] md:mx-0 glass-card p-8 relative z-10">
            <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
              {title}
            </h1>
            <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
              <span className="text-richblack-100">{description1}</span>{" "}
              <span className="font-edu-sa font-bold italic gradient-text">
                {description2}
              </span>
            </p>
            {formType === "signup" ? <SignupForm /> : <LoginForm />}
          </div>
          <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0">
            <img
              src={frameImg}
              alt="Pattern"
              width={558}
              height={504}
              loading="lazy"
            />
            <img
              src={image}
              alt="Students"
              width={558}
              height={504}
              loading="lazy"
              className="absolute -top-4 right-4 z-10"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Template;
