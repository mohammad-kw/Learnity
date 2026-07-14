import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Autoplay, FreeMode, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "../../App.css";
import { FaStar } from "react-icons/fa";

function ReviewSlider() {
  const [reviews, setReviews] = useState([]);
  const truncateWords = 30;
  const [slidesPerView, setSlidesPerView] = useState(3);

  const updateSlidesPerView = () => {
    if (window.innerWidth < 750) {
      setSlidesPerView(1);
    } else if (window.innerWidth < 1100) {
      setSlidesPerView(2);
    } else {
      setSlidesPerView(3);
    }
  };

  useEffect(() => {
    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);
    return () => {
      window.removeEventListener("resize", updateSlidesPerView);
    };
  });

  useEffect(() => {
    const sampleData = [
      {
        user: {
          firstName: "John",
          lastName: "Doe",
          image: "",
        },
        course: {
          courseName: "React for Beginners",
        },
        review:
          "This is an amazing course! It helped me understand the basics of React in a very simple and efficient way.",
        rating: 4.5,
      },
      {
        user: {
          firstName: "Jane",
          lastName: "Smith",
          image: "",
        },
        course: {
          courseName: "Advanced JavaScript",
        },
        review:
          "I loved this course. The examples were very clear and the instructor was great at explaining complex topics.",
        rating: 5,
      },
      {
        user: {
          firstName: "Alice",
          lastName: "Johnson",
          image: "",
        },
        course: {
          courseName: "CSS Flexbox and Grid",
        },
        review:
          "A must-take course for anyone looking to improve their CSS skills. Highly recommend!",
        rating: 4,
      },
      {
        user: {
          firstName: "Bob",
          lastName: "Brown",
          image: "",
        },
        course: {
          courseName: "Fullstack Development",
        },
        review:
          "Great course covering both frontend and backend development. The projects were very practical.",
        rating: 4.8,
      },
    ];

    setReviews(sampleData);
  }, []);

  return (
    <div className="text-lg w-full">
      <div className="h-fitContent max-w-maxContentTab lg:max-w-maxContent mx-auto">
        <Swiper
          slidesPerView={slidesPerView}
          spaceBetween={24}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[FreeMode, Pagination, Autoplay, Navigation]} // Include Navigation module
          navigation={true} // Enable navigation
          className="reviewSwiper w-full h-fitContent !pb-4"
        >
          {reviews.map((review, i) => {
            return (
              <SwiperSlide key={i} className="!h-auto">
                <div className="flex h-full flex-col gap-4 rounded-2xl border border-white/10 bg-richblack-800/60 p-6 text-[14px] text-richblack-25 backdrop-blur-sm transition-all duration-300 hover:border-purple-300/40 hover:shadow-purple-glow">
                  {/* Header: avatar + name */}
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        review?.user?.image
                          ? review?.user?.image
                          : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                      }
                      alt=""
                      className="h-11 w-11 rounded-full object-cover ring-2 ring-purple-300/30"
                    />
                    <div className="flex flex-col">
                      <h1 className="font-semibold text-richblack-5">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                      <h2 className="text-[12px] font-medium text-richblack-400">
                        {review?.course?.courseName}
                      </h2>
                    </div>
                  </div>

                  {/* Review text */}
                  <p className="font-medium text-richblack-100 italic leading-relaxed">
                    {review?.review.split(" ").length > truncateWords
                      ? `"${review?.review
                          .split(" ")
                          .slice(0, truncateWords)
                          .join(" ")} ..."`
                      : `"${review?.review}"`}
                  </p>

                  {/* Rating */}
                  <div className="mt-auto flex items-center gap-2 border-t border-white/5 pt-3">
                    <h3 className="font-semibold text-yellow-100">
                      {review.rating.toFixed(1)}
                    </h3>
                    <ReactStars
                      count={5}
                      value={review.rating}
                      size={18}
                      edit={false}
                      activeColor="#ffd700"
                      emptyIcon={<FaStar />}
                      fullIcon={<FaStar />}
                    />
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}

export default ReviewSlider;
