import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineSearch } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaStar, FaRegStar } from "react-icons/fa";

import {
  getAllReviews,
  deleteReview,
} from "../../services/operations/adminAPI";
import ConfirmationModal from "../../components/common/ConfirmationModal";

const RATINGS = ["All", "5", "4", "3", "2", "1"];

export default function ManageReviews() {
  const { token } = useSelector((state) => state.auth);

  const [reviews, setReviews] = useState(null);
  const [query, setQuery] = useState("");
  const [ratingFilter, setRatingFilter] = useState("All");
  const [confirmationModal, setConfirmationModal] = useState(null);

  const fetchReviews = useCallback(async () => {
    const res = await getAllReviews(token);
    setReviews(res || []);
  }, [token]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const filtered = useMemo(() => {
    if (!reviews) return [];
    const q = query.trim().toLowerCase();
    return reviews.filter((r) => {
      const matchesRating =
        ratingFilter === "All" || Math.round(r.rating) === Number(ratingFilter);
      const name = `${r.user?.firstName || ""} ${
        r.user?.lastName || ""
      }`.toLowerCase();
      const matchesQuery =
        !q ||
        name.includes(q) ||
        r.user?.email?.toLowerCase().includes(q) ||
        r.course?.courseName?.toLowerCase().includes(q) ||
        r.review?.toLowerCase().includes(q);
      return matchesRating && matchesQuery;
    });
  }, [reviews, query, ratingFilter]);

  const handleDelete = async (reviewId) => {
    const ok = await deleteReview(token, reviewId);
    if (ok) {
      setReviews((prev) => prev.filter((r) => r._id !== reviewId));
    }
    setConfirmationModal(null);
  };

  const renderStars = (rating) => {
    const rounded = Math.round(rating);
    return (
      <span className="flex items-center gap-0.5 text-yellow-100">
        {[1, 2, 3, 4, 5].map((i) =>
          i <= rounded ? (
            <FaStar key={i} className="text-sm" />
          ) : (
            <FaRegStar key={i} className="text-sm text-richblack-500" />
          ),
        )}
        <span className="ml-1 text-xs text-richblack-300">
          {Number(rating).toFixed(1)}
        </span>
      </span>
    );
  };

  return (
    <div className="mx-auto w-11/12 max-w-[1000px] py-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-richblack-5">
          Manage <span className="gradient-text">Reviews</span>
        </h1>
        <p className="mt-1 text-richblack-300">
          Moderate ratings and reviews left by students.
        </p>
      </div>

      {/* Search + filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-richblack-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search student, course, review"
            className="w-full rounded-lg border border-richblack-700 bg-richblack-800 py-2.5 pl-10 pr-4 text-sm text-richblack-5 placeholder:text-richblack-400 focus:border-purple-300 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {RATINGS.map((r) => (
            <button
              key={r}
              onClick={() => setRatingFilter(r)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-all duration-200 ${
                ratingFilter === r
                  ? "border-purple-300 bg-purple-300/10 text-purple-100"
                  : "border-richblack-700 bg-richblack-800 text-richblack-200 hover:border-richblack-500"
              }`}
            >
              {r === "All" ? "All" : `${r}★`}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {reviews === null ? (
        <div className="flex justify-center py-20">
          <div className="spinner" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="glass-card rounded-xl p-10 text-center text-richblack-300">
          No reviews found.
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((r) => (
            <div key={r._id} className="glass-card rounded-xl p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex min-w-0 items-center gap-3">
                  <img
                    src={
                      r.user?.image ||
                      `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(
                        `${r.user?.firstName || "User"} ${
                          r.user?.lastName || ""
                        }`,
                      )}`
                    }
                    alt={r.user?.firstName || "User"}
                    onError={(e) => {
                      e.currentTarget.src = `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(
                        `${r.user?.firstName || "User"} ${
                          r.user?.lastName || ""
                        }`,
                      )}`;
                    }}
                    className="h-10 w-10 flex-shrink-0 rounded-full object-cover"
                  />
                  <div className="min-w-0">
                    <p className="font-semibold text-richblack-5">
                      {r.user
                        ? `${r.user.firstName} ${r.user.lastName}`
                        : "Deleted user"}
                    </p>
                    <p className="truncate text-xs text-richblack-400">
                      {r.course?.courseName || "Unknown course"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-shrink-0 items-center gap-3">
                  {renderStars(r.rating)}
                  <button
                    onClick={() =>
                      setConfirmationModal({
                        text1: "Delete this review?",
                        text2:
                          "This will permanently remove the review from the course.",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: () => handleDelete(r._id),
                        btn2Handler: () => setConfirmationModal(null),
                      })
                    }
                    title="Delete review"
                    className="grid h-9 w-9 place-items-center rounded-md border border-richblack-600 bg-richblack-700 text-pink-200 transition-all duration-200 hover:border-pink-300 hover:text-pink-100"
                  >
                    <RiDeleteBin6Line />
                  </button>
                </div>
              </div>

              <p className="mt-3 whitespace-pre-wrap break-words rounded-lg bg-richblack-800/60 p-3 text-sm text-richblack-100">
                {r.review}
              </p>
            </div>
          ))}
        </div>
      )}

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
}
