import React from "react";
import FoundingStory from "../assets/Images/FoundingStory.png";
import BannerImage1 from "../assets/Images/aboutus1.webp";
import BannerImage2 from "../assets/Images/aboutus2.webp";
import BannerImage3 from "../assets/Images/aboutus3.webp";
import ContactFormSection from "../components/core/AboutPage/ContactFormSection";
import LearningGrid from "../components/core/AboutPage/LearningGrid";
import Quote from "../components/core/AboutPage/Quote";
import StatsComponenet from "../components/core/AboutPage/Stats";
import HighlightText from "../components/core/HomePage/HighlightText";
import Footer from "../components/common/Footer";
const About = () => {
  return (
    <div>
      {/* Hero */}
      <section className="bg-richblack-700">
        <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col text-center text-white">
          <header className="mx-auto pt-16 pb-40 text-3xl font-semibold sm:text-4xl lg:w-[70%] lg:pt-20 lg:pb-48">
            Driving Innovation in Online Education for a
            <HighlightText text={"Brighter Future"} />
            <p className="mx-auto mt-4 text-center text-base font-medium text-richblack-300 lg:w-[95%]">
              Learnity is at the forefront of driving innovation in online
              education. We're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </p>
          </header>

          {/* Banner images — overlap the section below */}
          <div className="absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[50%] grid-cols-3 gap-3 lg:gap-5">
            <img
              src={BannerImage1}
              alt=""
              className="rounded-lg shadow-purple-glow"
            />
            <img
              src={BannerImage2}
              alt=""
              className="rounded-lg shadow-purple-glow"
            />
            <img
              src={BannerImage3}
              alt=""
              className="rounded-lg shadow-purple-glow"
            />
          </div>
        </div>
      </section>

      {/* Quote — top padding accounts for the overlapping images */}
      <section className="border-b border-richblack-700">
        <div className="mx-auto w-11/12 max-w-maxContent pt-32 pb-16 text-richblack-500 lg:pt-40 lg:pb-20">
          <Quote />
        </div>
      </section>

      {/* Founding story / Vision / Mission */}
      <section>
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col gap-16 py-16 text-richblack-500 lg:gap-20 lg:py-24">
          <div className="flex flex-col items-center gap-10 lg:flex-row lg:justify-between">
            <div className="flex flex-col gap-5 lg:w-[50%]">
              <h1 className="gradient-text text-3xl font-semibold sm:text-4xl lg:w-[70%]">
                Our Founding Story
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                Our e-learning platform was born out of a shared vision and
                passion for transforming education. It all began with a group of
                educators, technologists, and lifelong learners who recognized
                the need for accessible, flexible, and high-quality learning
                opportunities in a rapidly evolving digital world.
              </p>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                As experienced educators ourselves, we witnessed firsthand the
                limitations and challenges of traditional education systems. We
                believed that education should not be confined to the walls of a
                classroom or restricted by geographical boundaries. We
                envisioned a platform that could bridge these gaps and empower
                individuals from all walks of life to unlock their full
                potential.
              </p>
            </div>

            <div className="lg:w-[45%]">
              <img
                src={FoundingStory}
                alt=""
                className="w-full rounded-lg shadow-purple-glow"
              />
            </div>
          </div>

          <div className="flex flex-col items-start gap-10 lg:flex-row lg:justify-between">
            <div className="flex flex-col gap-5 lg:w-[45%]">
              <h1 className="gradient-text text-3xl font-semibold sm:text-4xl lg:w-[70%]">
                Our Vision
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                With this vision in mind, we set out on a journey to create an
                e-learning platform that would revolutionize the way people
                learn. Our team of dedicated experts worked tirelessly to
                develop a robust and intuitive platform that combines
                cutting-edge technology with engaging content, fostering a
                dynamic and interactive learning experience.
              </p>
            </div>
            <div className="flex flex-col gap-5 lg:w-[45%]">
              <h1 className="gradient-text text-3xl font-semibold sm:text-4xl lg:w-[70%]">
                Our Mission
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                Our mission goes beyond just delivering courses online. We
                wanted to create a vibrant community of learners, where
                individuals can connect, collaborate, and learn from one
                another. We believe that knowledge thrives in an environment of
                sharing and dialogue, and we foster this spirit of collaboration
                through forums, live sessions, and networking opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsComponenet />

      {/* Learning grid + contact */}
      <section className="mx-auto flex w-11/12 max-w-maxContent flex-col gap-16 py-16 text-white lg:gap-20 lg:py-24">
        <LearningGrid />
        <ContactFormSection />
      </section>

      <Footer />
    </div>
  );
};

export default About;
