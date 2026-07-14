// Icons Import
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

// Image and Video Import
import Banner from "../assets/Images/banner.mp4";
// Component Imports
import Footer from "../components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider";
import CTAButton from "../components/core/HomePage/Button";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import HighlightText from "../components/core/HomePage/HighlightText";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import FAQ from "../components/common/FAQ";

function Home() {
  return (
    <div>
      {/* Section 1 - Asymmetric split hero */}
      <div className="relative mx-auto w-11/12 max-w-maxContent text-white">
        {/* Purple ambient glows */}
        <div className="pointer-events-none absolute -top-20 -left-10 h-[400px] w-[400px] rounded-full bg-purple-500/25 blur-[120px]" />
        <div className="pointer-events-none absolute top-40 right-0 h-[350px] w-[350px] rounded-full bg-violet-200/20 blur-[120px]" />

        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 pt-16 pb-12 lg:pt-24 lg:pb-16">
          {/* Left column - copy */}
          <div className="flex flex-col items-start gap-6">
            {/* Badge */}
            <Link to={"/signup"}>
              <div className="group flex items-center gap-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 px-5 py-2 text-sm font-semibold text-richblack-200 transition-all duration-200 hover:border-purple-200/40">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-brand-gradient text-[10px] text-white">
                  ★
                </span>
                <p>Become an Instructor</p>
                <FaArrowRight className="transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            {/* Heading */}
            <h1 className="text-left text-4xl md:text-5xl font-bold leading-tight">
              Empower Your Future with
              <HighlightText text={"In-Demand Skills"} />
            </h1>

            {/* Sub Heading */}
            <p className="text-left text-base md:text-lg font-medium text-richblack-300 max-w-[540px]">
              With Learnity's online courses, you can learn at your own pace,
              from anywhere in the world, and get access to a wealth of
              resources, including hands-on projects, quizzes, and personalized
              feedback from instructors.
            </p>

            {/* CTA Buttons */}
            <div className="mt-2 flex flex-row gap-5">
              <CTAButton active={true} linkto={"/signup"}>
                Learn More
              </CTAButton>
              <CTAButton active={false} linkto={"/login"}>
                Book a Demo
              </CTAButton>
            </div>

            {/* Stats strip */}
            <div className="mt-6 grid grid-cols-3 gap-4 w-full max-w-[540px]">
              {[
                { num: "500+", label: "Courses" },
                { num: "50K+", label: "Learners" },
                { num: "4.8★", label: "Avg. Rating" },
              ].map((s, i) => (
                <div key={i} className="glass-card px-4 py-5 text-center">
                  <p className="text-2xl font-bold gradient-text">{s.num}</p>
                  <p className="text-xs text-richblack-300 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - video card */}
          <div className="relative">
            <div className="glass-card-strong p-3 rounded-3xl animate-floaty shadow-purple-glow">
              <video
                className="rounded-2xl w-full"
                muted
                loop
                autoPlay
                playsInline
                preload="none"
              >
                <source src={Banner} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>

        {/* Code Section 1  */}
        <div className="mt-16 lg:mt-24">
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-3xl md:text-4xl font-semibold">
                Unlock your
                <HighlightText text={"coding potential"} /> with our online
                courses.
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Try it Yourself",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              link: "/signup",
              active: false,
            }}
            codeColor={"text-purple-100"}
            codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
            backgroundGradient={<div className="codeblock1 absolute"></div>}
          />
        </div>

        {/* Code Section 2 */}
        <div className="mt-16 lg:mt-24">
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="w-[100%] text-3xl md:text-4xl font-semibold lg:w-[50%]">
                Start
                <HighlightText text={"coding in seconds"} />
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              btnText: "Continue Lesson",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              link: "/signup",
              active: false,
            }}
            codeColor={"text-white"}
            codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
            backgroundGradient={<div className="codeblock2 absolute"></div>}
          />
        </div>

        {/* Explore Section */}
        <div className="mt-16 lg:mt-24">
          <ExploreMore />
        </div>
      </div>

      {/* Section 2 */}
      <div className="bg-richblack-900 text-white">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-16 pt-16 pb-8 lg:pt-24 lg:pb-10">
          {/* Job that is in Demand - Section 1 */}
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:gap-10">
            <div className="text-3xl md:text-4xl font-semibold lg:w-[45%]">
              Get the skills you need for a{" "}
              <HighlightText text={"job that is in demand."} />
            </div>
            <div className="flex flex-col items-start gap-6 lg:w-[40%]">
              <div className="text-[16px] text-richblack-300">
                The modern Learnity dictates its own terms. Today, to be a
                competitive specialist requires more than professional skills.
              </div>
              <CTAButton active={true} linkto={"/signup"}>
                <div className="">Learn More</div>
              </CTAButton>
            </div>
          </div>

          {/* Timeline Section - Section 2 */}
          <TimelineSection />
        </div>
      </div>

      {/* Section 3 */}
      <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-16 bg-richblack-900 pt-8 pb-8 lg:pt-10 lg:pb-10 text-white">
        {/* Become a instructor section */}
        <InstructorSection />

        {/* Reviws from Other Learner */}
        <div className="flex w-full flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-3 w-full">
            <h1 className="text-center text-3xl md:text-4xl font-semibold">
              Happy & Satisfied Learners!
            </h1>
            <p className="text-center text-richblack-300 max-w-[600px]">
              Real feedback from real learners who transformed their careers
              with Learnity.
            </p>
          </div>
          <ReviewSlider />
        </div>
      </div>

      <FAQ />
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
