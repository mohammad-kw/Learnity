import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineSearch } from "react-icons/hi";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import { VscClose, VscCheck } from "react-icons/vsc";

import {
  getAllCategoriesAdmin,
  updateCategory,
  deleteCategoryAdmin,
} from "../../services/operations/adminAPI";
import ConfirmationModal from "../../components/common/ConfirmationModal";

export default function ManageCategories() {
  const { token } = useSelector((state) => state.auth);

  const [categories, setCategories] = useState(null);
  const [query, setQuery] = useState("");
  const [confirmationModal, setConfirmationModal] = useState(null);

  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const fetchCategories = useCallback(async () => {
    const res = await getAllCategoriesAdmin(token);
    setCategories(res || []);
  }, [token]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const filtered = useMemo(() => {
    if (!categories) return [];
    const q = query.trim().toLowerCase();
    return categories.filter(
      (c) =>
        !q ||
        c.name?.toLowerCase().includes(q) ||
        c.description?.toLowerCase().includes(q),
    );
  }, [categories, query]);

  const startEdit = (c) => {
    setEditingId(c._id);
    setEditName(c.name);
    setEditDesc(c.description || "");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditDesc("");
  };

  const saveEdit = async (categoryId) => {
    if (!editName.trim()) return;
    const ok = await updateCategory(token, categoryId, editName, editDesc);
    if (ok) {
      setCategories((prev) =>
        prev.map((c) =>
          c._id === categoryId
            ? { ...c, name: editName.trim(), description: editDesc.trim() }
            : c,
        ),
      );
      cancelEdit();
    }
  };

  const handleDelete = async (categoryId) => {
    const ok = await deleteCategoryAdmin(token, categoryId);
    if (ok) {
      setCategories((prev) => prev.filter((c) => c._id !== categoryId));
    }
    setConfirmationModal(null);
  };

  return (
    <div className="mx-auto w-11/12 max-w-[1000px] py-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-richblack-5">
          Manage <span className="gradient-text">Categories</span>
        </h1>
        <p className="mt-1 text-richblack-300">
          Rename or remove course categories. Empty categories can be deleted.
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative w-full sm:max-w-xs">
          <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-richblack-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search categories"
            className="w-full rounded-lg border border-richblack-700 bg-richblack-800 py-2.5 pl-10 pr-4 text-sm text-richblack-5 placeholder:text-richblack-400 focus:border-purple-300 focus:outline-none"
          />
        </div>
      </div>

      {/* Content */}
      {categories === null ? (
        <div className="flex justify-center py-20">
          <div className="spinner" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="glass-card rounded-xl p-10 text-center text-richblack-300">
          No categories found.
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((c) => {
            const isEditing = editingId === c._id;
            return (
              <div key={c._id} className="glass-card rounded-xl p-4">
                {isEditing ? (
                  <div className="flex flex-col gap-3">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      placeholder="Category name"
                      className="w-full rounded-lg border border-richblack-700 bg-richblack-800 px-3 py-2 text-sm text-richblack-5 focus:border-purple-300 focus:outline-none"
                    />
                    <textarea
                      value={editDesc}
                      onChange={(e) => setEditDesc(e.target.value)}
                      placeholder="Description (optional)"
                      rows={2}
                      className="w-full resize-none rounded-lg border border-richblack-700 bg-richblack-800 px-3 py-2 text-sm text-richblack-5 focus:border-purple-300 focus:outline-none"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => saveEdit(c._id)}
                        disabled={!editName.trim()}
                        className="flex items-center gap-1 rounded-md bg-purple-300 px-4 py-2 text-sm font-medium text-richblack-900 transition-all hover:bg-purple-200 disabled:opacity-50"
                      >
                        <VscCheck /> Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="flex items-center gap-1 rounded-md border border-richblack-600 bg-richblack-700 px-4 py-2 text-sm text-richblack-100 transition-all hover:border-richblack-500"
                      >
                        <VscClose /> Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-richblack-5">
                          {c.name}
                        </p>
                        <span className="rounded-full border border-purple-300/40 bg-purple-300/10 px-2 py-0.5 text-xs text-purple-100">
                          {c.courseCount} course
                          {c.courseCount === 1 ? "" : "s"}
                        </span>
                      </div>
                      {c.description && (
                        <p className="mt-1 text-sm text-richblack-300">
                          {c.description}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-shrink-0 items-center gap-2">
                      <button
                        onClick={() => startEdit(c)}
                        title="Edit category"
                        className="grid h-9 w-9 place-items-center rounded-md border border-richblack-600 bg-richblack-700 text-purple-200 transition-all duration-200 hover:border-purple-300"
                      >
                        <RiEdit2Line />
                      </button>
                      <button
                        onClick={() =>
                          setConfirmationModal({
                            text1: "Delete this category?",
                            text2:
                              c.courseCount > 0
                                ? "This category has courses attached and cannot be deleted until they are reassigned or removed."
                                : "This action cannot be undone.",
                            btn1Text: "Delete",
                            btn2Text: "Cancel",
                            btn1Handler: () => handleDelete(c._id),
                            btn2Handler: () => setConfirmationModal(null),
                          })
                        }
                        title="Delete category"
                        className="grid h-9 w-9 place-items-center rounded-md border border-richblack-600 bg-richblack-700 text-pink-200 transition-all duration-200 hover:border-pink-300 hover:text-pink-100"
                      >
                        <RiDeleteBin6Line />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
}
