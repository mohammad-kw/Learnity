import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineSearch } from "react-icons/hi";
import { VscVerified, VscUnverified } from "react-icons/vsc";

import {
  getAllInstructors,
  setInstructorApproval,
} from "../../services/operations/adminAPI";
import ConfirmationModal from "../../components/common/ConfirmationModal";

const FILTERS = ["All", "Pending", "Approved"];

export default function ManageInstructors() {
  const { token } = useSelector((state) => state.auth);

  const [instructors, setInstructors] = useState(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [confirmationModal, setConfirmationModal] = useState(null);

  const fetchInstructors = useCallback(async () => {
    const res = await getAllInstructors(token);
    setInstructors(res || []);
  }, [token]);

  useEffect(() => {
    fetchInstructors();
  }, [fetchInstructors]);

  const pendingCount = useMemo(
    () =>
      instructors ? instructors.filter((i) => i.approved === false).length : 0,
    [instructors],
  );

  const filtered = useMemo(() => {
    if (!instructors) return [];
    const q = query.trim().toLowerCase();
    return instructors.filter((i) => {
      const matchesFilter =
        filter === "All" ||
        (filter === "Pending" && i.approved === false) ||
        (filter === "Approved" && i.approved === true);
      const name = `${i.firstName || ""} ${i.lastName || ""}`.toLowerCase();
      const matchesQuery =
        !q || name.includes(q) || i.email?.toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [instructors, query, filter]);

  const applyApproval = async (instructorId, approved) => {
    const ok = await setInstructorApproval(token, instructorId, approved);
    if (ok) {
      setInstructors((prev) =>
        prev.map((i) => (i._id === instructorId ? { ...i, approved } : i)),
      );
    }
    setConfirmationModal(null);
  };

  const handleApprove = (i) => applyApproval(i._id, true);

  const handleRevoke = (i) => {
    setConfirmationModal({
      text1: "Revoke this instructor's approval?",
      text2:
        "Any of their published courses will be set back to Draft and hidden from students.",
      btn1Text: "Revoke",
      btn2Text: "Cancel",
      btn1Handler: () => applyApproval(i._id, false),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  return (
    <div className="mx-auto w-11/12 max-w-[1000px] py-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-richblack-5">
          Instructor <span className="gradient-text">Approvals</span>
        </h1>
        <p className="mt-1 text-richblack-300">
          Approve instructors so they can publish their courses.
          {pendingCount > 0 && (
            <span className="ml-2 rounded-full border border-yellow-100/40 bg-yellow-100/10 px-2 py-0.5 text-xs text-yellow-50">
              {pendingCount} pending
            </span>
          )}
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
            placeholder="Search name or email"
            className="w-full rounded-lg border border-richblack-700 bg-richblack-800 py-2.5 pl-10 pr-4 text-sm text-richblack-5 placeholder:text-richblack-400 focus:border-purple-300 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-all duration-200 ${
                filter === f
                  ? "border-purple-300 bg-purple-300/10 text-purple-100"
                  : "border-richblack-700 bg-richblack-800 text-richblack-200 hover:border-richblack-500"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {instructors === null ? (
        <div className="flex justify-center py-20">
          <div className="spinner" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="glass-card rounded-xl p-10 text-center text-richblack-300">
          No instructors found.
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((i) => (
            <div
              key={i._id}
              className="glass-card flex flex-col gap-4 rounded-xl p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              {/* Instructor info */}
              <div className="flex min-w-0 items-center gap-4">
                <img
                  src={
                    i.image ||
                    `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(
                      `${i.firstName} ${i.lastName}`,
                    )}`
                  }
                  alt={i.firstName}
                  onError={(e) => {
                    e.currentTarget.src = `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(
                      `${i.firstName} ${i.lastName}`,
                    )}`;
                  }}
                  className="h-11 w-11 flex-shrink-0 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate font-semibold text-richblack-5">
                    {i.firstName} {i.lastName}
                  </p>
                  <p className="truncate text-sm text-richblack-300">
                    {i.email}
                  </p>
                  <p className="mt-0.5 text-xs text-richblack-400">
                    {i.courseCount} course{i.courseCount === 1 ? "" : "s"}
                  </p>
                </div>
              </div>

              {/* Status + actions */}
              <div className="flex flex-shrink-0 items-center gap-3">
                {i.approved ? (
                  <span className="flex items-center gap-1 rounded-full border border-caribbeangreen-300/40 bg-caribbeangreen-300/10 px-3 py-1 text-xs font-medium text-caribbeangreen-100">
                    <VscVerified /> Approved
                  </span>
                ) : (
                  <span className="flex items-center gap-1 rounded-full border border-yellow-100/40 bg-yellow-100/10 px-3 py-1 text-xs font-medium text-yellow-50">
                    <VscUnverified /> Pending
                  </span>
                )}

                {i.approved ? (
                  <button
                    onClick={() => handleRevoke(i)}
                    className="rounded-md border border-richblack-600 bg-richblack-700 px-4 py-2 text-sm text-pink-200 transition-all duration-200 hover:border-pink-300 hover:text-pink-100"
                  >
                    Revoke
                  </button>
                ) : (
                  <button
                    onClick={() => handleApprove(i)}
                    className="rounded-md bg-purple-300 px-4 py-2 text-sm font-medium text-richblack-900 transition-all duration-200 hover:bg-purple-200"
                  >
                    Approve
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
}
