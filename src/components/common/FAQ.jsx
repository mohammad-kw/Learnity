import React from "react";

function FAQ() {
  const toggleAnswer = (faqId, arrowId) => {
    const answer = document.getElementById(faqId);
    const arrow = document.getElementById(arrowId);

    answer.classList.toggle("hidden");
    if (answer.classList.contains("hidden")) {
      arrow.style.transform = "rotate(0deg)";
    } else {
      arrow.style.transform = "rotate(180deg)";
    }
  };

  return (
    <div className="bg-richblack-900 text-white">
      <section className="mx-auto px-8 py-16 lg:py-24 transition duration-500 max-w-maxContent">
        <h2 className="text-3xl mb-10 font-bold text-center">
          Frequently Asked Questions
        </h2>

        <div className="flex flex-col md:mx-20 gap-4">
          {/* FAQ 1 */}
          <div className="glass-card p-5 transform transition-all hover:border-purple-200/40 hover:shadow-purple-glow">
            <button
              className="w-full flex justify-between   text-lg font-medium focus:outline-none"
              onClick={() => toggleAnswer("faq1", "arrow1")}
            >
              <span>What is Learnity?</span>
              <svg
                id="arrow1"
                className="h-6 v-6   arrow-icon transform transition-transform"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 12a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L10 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-4 4A1 1 0 0 1 10 12z" />
              </svg>
            </button>
            <div id="faq1" className="hidden mt-3 text-richblack-300">
              Learnity is a fully functional ed-tech platform designed to
              create, consume, and rate educational content. It offers a
              seamless and interactive learning experience for students while
              providing a platform for instructors to showcase their expertise.
            </div>
          </div>

          {/* FAQ 2 */}
          <div className="glass-card p-5 transform transition-all hover:border-purple-200/40 hover:shadow-purple-glow">
            <button
              className="w-full flex justify-between text-lg font-medium focus:outline-none"
              onClick={() => toggleAnswer("faq2", "arrow2")}
            >
              <span>
                Is Learnity free to use, or are there subscription plans?
              </span>
              <svg
                id="arrow2"
                className="h-6 v-6 arrow-icon transform transition-transform"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 12a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L10 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-4 4A1 1 0 0 1 10 12z" />
              </svg>
            </button>
            <div id="faq2" className="hidden mt-3 text-richblack-300">
              Learnity offers various plans, including free access with limited
              features and premium subscription plans with additional benefits.
              Users can choose a plan that suits their needs and upgrade to
              unlock more features.
            </div>
          </div>

          {/* FAQ 3 */}
          <div className="glass-card p-5 transform transition-all hover:border-purple-200/40 hover:shadow-purple-glow">
            <button
              className="w-full flex justify-between text-lg font-medium focus:outline-none"
              onClick={() => toggleAnswer("faq3", "arrow3")}
            >
              <span>Can I customize my profile on Learnity?</span>
              <svg
                id="arrow3"
                className="h-6 v-6 arrow-icon transform transition-transform"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 12a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L10 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-4 4A1 1 0 0 1 10 12z" />
              </svg>
            </button>
            <div id="faq3" className="hidden mt-3 text-richblack-300">
              Yes, users can customize their profiles on Learnity. After
              creating an account, you can add information about yourself, such
              as your education background, interests, and profile picture.
              Customizing your profile helps personalize your experience on the
              platform.
            </div>
          </div>

          {/* FAQ 4 */}
          <div className="glass-card p-5 transform transition-all hover:border-purple-200/40 hover:shadow-purple-glow">
            <button
              className="w-full flex justify-between text-lg font-medium focus:outline-none"
              onClick={() => toggleAnswer("faq4", "arrow4")}
            >
              <span>How can I create educational content on Learnity?</span>
              <svg
                id="arrow4"
                className="h-6 v-6 arrow-icon transform transition-transform"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 12a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L10 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-4 4A1 1 0 0 1 10 12z" />
              </svg>
            </button>
            <div id="faq4" className="hidden mt-3 text-richblack-300">
              As an instructor, you can create educational content on Learnity
              by accessing the content creation tools available on the platform.
              These tools allow you to upload course materials, videos, quizzes,
              and other educational resources to share with learners.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FAQ;
