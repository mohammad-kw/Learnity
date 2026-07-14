import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineSearch } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";

import {
  getAllCoursesAdmin,
  deleteCourseAdmin,
} from "../../services/operations/adminAPI";
import ConfirmationModal from "../../components/common/ConfirmationModal";

const STATUSES = ["Published", "Draft"];

export default function ManageCourses() {
  const { token } = useSelector((state) => state.auth);

  const [courses, setCourses] = useState(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [confirmationModal, setConfirmationModal] = useState(null);

  const fetchCourses = useCallback(async () => {
    const res = await getAllCoursesAdmin(token);
    setCourses(res || []);
  }, [token]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const filtered = useMemo(() => {
    if (!courses) return [];
    const q = query.trim().toLowerCase();
    return courses.filter((c) => {
      const matchesStatus = statusFilter === "All" || c.status === statusFilter;
      const instructor = `${c.instructor?.firstName || ""} ${
        c.instructor?.lastName || ""
      }`.toLowerCase();
      const matchesQuery =
        !q ||
        c.courseName?.toLowerCase().includes(q) ||
        instructor.includes(q) ||
        c.category?.name?.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [courses, query, statusFilter]);

  const handleDelete = async (courseId) => {
    const ok = await deleteCourseAdmin(token, courseId);
    if (ok) {
      setCourses((prev) => prev.filter((c) => c._id !== courseId));
    }
    setConfirmationModal(null);
  };

  const statusBadge = (status) =>
    status === "Published"
      ? "border-caribbeangreen-300/40 bg-caribbeangreen-300/10 text-caribbeangreen-100"
      : "border-yellow-100/40 bg-yellow-100/10 text-yellow-50";

  return (
    <div className="mx-auto w-11/12 max-w-[1000px] py-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-richblack-5">
          Manage <span className="gradient-text">Courses</span>
        </h1>
        <p className="mt-1 text-richblack-300">
          View and remove any course on the platform.
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
            placeholder="Search courses, instructor, category"
            className="w-full rounded-lg border border-richblack-700 bg-richblack-800 py-2.5 pl-10 pr-4 text-sm text-richblack-5 placeholder:text-richblack-400 focus:border-purple-300 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {["All", ...STATUSES].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-all duration-200 ${
                statusFilter === s
                  ? "border-purple-300 bg-purple-300/10 text-purple-100"
                  : "border-richblack-700 bg-richblack-800 text-richblack-200 hover:border-richblack-500"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {courses === null ? (
        <div className="flex justify-center py-20">
          <div className="spinner" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="glass-card rounded-xl p-10 text-center text-richblack-300">
          No courses found.
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((c) => (
            <div
              key={c._id}
              className="glass-card flex flex-col gap-4 rounded-xl p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              {/* Course info */}
              <div className="flex min-w-0 items-center gap-4">
                <img
                  src={c.thumbnail}
                  alt={c.courseName}
                  onError={(e) => {
                    e.currentTarget.src = `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(
                      c.courseName || "Course",
                    )}`;
                  }}
                  className="h-16 w-24 flex-shrink-0 rounded-md object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate font-semibold text-richblack-5">
                    {c.courseName}
                  </p>
                  <p className="truncate text-sm text-richblack-300">
                    {c.instructor
                      ? `${c.instructor.firstName} ${c.instructor.lastName}`
                      : "Unknown instructor"}
                    {c.category?.name ? ` · ${c.category.name}` : ""}
                  </p>
                  <p className="mt-1 text-xs text-richblack-400">
                    ₹{c.price ?? 0} ·{" "}
                    {Array.isArray(c.studentsEnrolled)
                      ? c.studentsEnrolled.length
                      : 0}{" "}
                    enrolled
                  </p>
                </div>
              </div>

              {/* Status + actions */}
              <div className="flex items-center gap-3">
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-medium ${statusBadge(
                    c.status,
                  )}`}
                >
                  {c.status}
                </span>

                <button
                  onClick={() =>
                    setConfirmationModal({
                      text1: "Delete this course?",
                      text2:
                        "This will permanently remove the course, its sections, reviews and unenroll all students.",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => handleDelete(c._id),
                      btn2Handler: () => setConfirmationModal(null),
                    })
                  }
                  title="Delete course"
                  className="grid h-9 w-9 place-items-center rounded-md border border-richblack-600 bg-richblack-700 text-pink-200 transition-all duration-200 hover:border-pink-300 hover:text-pink-100"
                >
                  <RiDeleteBin6Line />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
}
