import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineSearch } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";

import { getAllUsers, deleteUser } from "../../services/operations/adminAPI";
import ConfirmationModal from "../../components/common/ConfirmationModal";

const ROLES = ["Student", "Instructor", "Admin"];

export default function ManageUsers() {
  const { token } = useSelector((state) => state.auth);
  const { user: currentUser } = useSelector((state) => state.profile);

  const [users, setUsers] = useState(null);
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [confirmationModal, setConfirmationModal] = useState(null);

  const fetchUsers = useCallback(async () => {
    const res = await getAllUsers(token);
    setUsers(res || []);
  }, [token]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filtered = useMemo(() => {
    if (!users) return [];
    const q = query.trim().toLowerCase();
    return users.filter((u) => {
      const matchesRole = roleFilter === "All" || u.accountType === roleFilter;
      const name = `${u.firstName || ""} ${u.lastName || ""}`.toLowerCase();
      const matchesQuery =
        !q || name.includes(q) || u.email?.toLowerCase().includes(q);
      return matchesRole && matchesQuery;
    });
  }, [users, query, roleFilter]);

  const handleDelete = async (userId) => {
    const ok = await deleteUser(token, userId);
    if (ok) {
      setUsers((prev) => prev.filter((u) => u._id !== userId));
    }
    setConfirmationModal(null);
  };

  const roleBadge = (role) => {
    const map = {
      Student: "border-purple-300/40 bg-purple-300/10 text-purple-200",
      Instructor:
        "border-caribbeangreen-300/40 bg-caribbeangreen-300/10 text-caribbeangreen-100",
      Admin: "border-yellow-100/40 bg-yellow-100/10 text-yellow-50",
    };
    return (
      map[role] || "border-richblack-600 bg-richblack-700 text-richblack-100"
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-richblack-5">
            Manage Users
          </h1>
          <p className="mt-1 text-sm text-richblack-300">
            View, promote, or remove platform users.
          </p>
        </div>
        {users && (
          <span className="rounded-full border border-purple-300/40 bg-purple-300/10 px-3 py-1 text-sm font-medium text-purple-200">
            {users.length} users
          </span>
        )}
      </div>

      {/* Controls */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-richblack-600 bg-richblack-700 px-4 py-2 focus-within:border-purple-300">
          <HiOutlineSearch className="text-xl text-richblack-300" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full bg-transparent text-richblack-5 placeholder:text-richblack-400 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-richblack-700 bg-richblack-800 p-1 text-sm">
          {["All", ...ROLES].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`rounded-md px-3 py-1.5 transition-all ${
                roleFilter === r
                  ? "bg-richblack-700 text-purple-100"
                  : "text-richblack-300"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      {!users ? (
        <div className="grid min-h-[40vh] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="glass-card p-10 text-center text-richblack-200">
          No users found.
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((u) => {
            const isSelf = u._id === currentUser?._id;
            const initials = `${u.firstName?.[0] ?? ""}${
              u.lastName?.[0] ?? ""
            }`.toUpperCase();
            return (
              <div
                key={u._id}
                className="flex flex-col gap-4 glass-card p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                {/* Identity */}
                <div className="flex items-center gap-3">
                  {u.image ? (
                    <img
                      src={u.image}
                      alt={u.firstName}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://api.dicebear.com/5.x/initials/svg?seed=${u.firstName} ${u.lastName}`;
                      }}
                      className="h-11 w-11 rounded-full object-cover"
                    />
                  ) : (
                    <div className="grid h-11 w-11 place-items-center rounded-full bg-brand-gradient text-sm font-semibold text-white">
                      {initials}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="flex items-center gap-2 font-semibold text-richblack-5">
                      {u.firstName} {u.lastName}
                      {isSelf && (
                        <span className="rounded bg-richblack-700 px-1.5 py-0.5 text-[10px] font-medium text-richblack-300">
                          You
                        </span>
                      )}
                    </p>
                    <p className="truncate text-sm text-richblack-300">
                      {u.email}
                    </p>
                  </div>
                </div>

                {/* Role + actions */}
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-medium ${roleBadge(
                      u.accountType,
                    )}`}
                  >
                    {u.accountType}
                  </span>

                  <button
                    disabled={isSelf}
                    onClick={() =>
                      setConfirmationModal({
                        text1: "Delete this user?",
                        text2:
                          "This will permanently remove the user and all their related data (courses, reviews, progress).",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: () => handleDelete(u._id),
                        btn2Handler: () => setConfirmationModal(null),
                      })
                    }
                    title={
                      isSelf ? "You cannot delete yourself" : "Delete user"
                    }
                    className="grid h-9 w-9 place-items-center rounded-md border border-richblack-600 bg-richblack-700 text-pink-200 transition-all duration-200 hover:border-pink-300 hover:text-pink-100 disabled:opacity-40 disabled:hover:border-richblack-600"
                  >
                    <RiDeleteBin6Line />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
}
