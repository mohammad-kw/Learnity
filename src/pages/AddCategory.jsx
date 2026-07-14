import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { VscAdd, VscCheck, VscClose } from "react-icons/vsc";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import { HiOutlineSearch } from "react-icons/hi";

import { apiConnector } from "../services/apiconnector";
import {
  getAllCategoriesAdmin,
  updateCategory,
  deleteCategoryAdmin,
} from "../services/operations/adminAPI";
import ConfirmationModal from "../components/common/ConfirmationModal";

const CREATE_CATEGORY_API =
  "http://localhost:4000/api/v1/course/createCategory";

const AddCategory = () => {
  const { token } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

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

  // Create a new category
  const addCategory = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSubmitting(true);
    const toastId = toast.loading("Adding category...");
    try {
      const response = await apiConnector(
        "POST",
        CREATE_CATEGORY_API,
        { name, description },
        { Authorization: `Bearer ${token}` },
      );
      if (!response?.data?.success) {
        throw new Error(response?.data?.message || "Failed to add category");
      }
      toast.success("Category added successfully!");
      setName("");
      setDescription("");
      fetchCategories();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to add category",
      );
    } finally {
      setSubmitting(false);
      toast.dismiss(toastId);
    }
  };

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
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-richblack-5">
          Manage <span className="gradient-text">Categories</span>
        </h1>
        <p className="mt-1 text-sm text-richblack-300">
          Create, rename and remove the course categories available across the
          platform.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        {/* Add Category form */}
        <form
          className="glass-card h-fit p-6 lg:col-span-2 lg:sticky lg:top-24"
          onSubmit={addCategory}
        >
          <h2 className="mb-6 text-lg font-semibold text-richblack-5">
            Add New Category
          </h2>

          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-richblack-5">
              Category Name <sup className="text-pink-200">*</sup>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="e.g. Web Development"
              className="w-full rounded-md border border-richblack-600 bg-richblack-700 px-3 py-2 text-richblack-5 placeholder:text-richblack-400 focus:border-purple-300 focus:outline-none"
            />
          </div>

          <div className="mb-6">
            <label className="mb-1 block text-sm font-medium text-richblack-5">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description of this category"
              className="w-full resize-none rounded-md border border-richblack-600 bg-richblack-700 px-3 py-2 text-richblack-5 placeholder:text-richblack-400 focus:border-purple-300 focus:outline-none"
              rows="4"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-brand-gradient px-6 py-2.5 font-semibold text-white shadow-purple-glow transition-all duration-200 hover:scale-[0.99] disabled:opacity-60"
          >
            <VscAdd />
            {submitting ? "Adding..." : "Add Category"}
          </button>
        </form>

        {/* Displaying all categories */}
        <div className="glass-card p-6 lg:col-span-3">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-richblack-5">
              All Categories
            </h2>
            {Array.isArray(categories) && categories.length > 0 && (
              <span className="rounded-full border border-purple-300/40 bg-purple-300/10 px-3 py-1 text-sm font-medium text-purple-200">
                {categories.length}
              </span>
            )}
          </div>

          {/* Search */}
          <div className="relative mb-5">
            <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-richblack-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search categories"
              className="w-full rounded-lg border border-richblack-700 bg-richblack-800 py-2.5 pl-10 pr-4 text-sm text-richblack-5 placeholder:text-richblack-400 focus:border-purple-300 focus:outline-none"
            />
          </div>

          {categories === null ? (
            <div className="flex justify-center py-16">
              <div className="spinner" />
            </div>
          ) : filtered.length > 0 ? (
            <ul className="space-y-3">
              {filtered.map((category) => {
                const isEditing = editingId === category._id;
                return (
                  <li
                    key={category._id}
                    className="rounded-lg border border-richblack-700 bg-richblack-800 p-4 transition-all duration-200 hover:border-purple-300/40"
                  >
                    {isEditing ? (
                      <div className="flex flex-col gap-3">
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          placeholder="Category name"
                          className="w-full rounded-md border border-richblack-600 bg-richblack-700 px-3 py-2 text-sm text-richblack-5 focus:border-purple-300 focus:outline-none"
                        />
                        <textarea
                          value={editDesc}
                          onChange={(e) => setEditDesc(e.target.value)}
                          placeholder="Description (optional)"
                          rows={2}
                          className="w-full resize-none rounded-md border border-richblack-600 bg-richblack-700 px-3 py-2 text-sm text-richblack-5 focus:border-purple-300 focus:outline-none"
                        />
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => saveEdit(category._id)}
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
                      <div className="flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-purple-100">
                              {category.name}
                            </p>
                            <span className="shrink-0 rounded-full border border-purple-300/40 bg-purple-300/10 px-2 py-0.5 text-xs text-purple-100">
                              {category.courseCount} course
                              {category.courseCount === 1 ? "" : "s"}
                            </span>
                          </div>
                          <p className="mt-0.5 line-clamp-2 text-sm text-richblack-300">
                            {category.description || "No description"}
                          </p>
                        </div>
                        <div className="flex shrink-0 items-center gap-2">
                          <button
                            onClick={() => startEdit(category)}
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
                                  category.courseCount > 0
                                    ? "This category has courses attached and cannot be deleted until they are reassigned or removed."
                                    : "This action cannot be undone.",
                                btn1Text: "Delete",
                                btn2Text: "Cancel",
                                btn1Handler: () => handleDelete(category._id),
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
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="grid min-h-[200px] place-items-center text-center">
              <div>
                <p className="text-richblack-100">
                  {query ? "No matching categories" : "No categories yet"}
                </p>
                <p className="mt-1 text-sm text-richblack-400">
                  {query
                    ? "Try a different search."
                    : "Add your first category using the form."}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default AddCategory;
