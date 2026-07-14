import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { VscMegaphone, VscInfo, VscWarning, VscCheck } from "react-icons/vsc";
import { RiDeleteBin6Line } from "react-icons/ri";

import {
  getAllAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from "../../services/operations/adminAPI";
import ConfirmationModal from "../../components/common/ConfirmationModal";

const TYPES = [
  { value: "info", label: "Info", icon: VscInfo },
  { value: "success", label: "Success", icon: VscCheck },
  { value: "warning", label: "Warning", icon: VscWarning },
];

const typeStyle = (type) => {
  switch (type) {
    case "success":
      return "border-caribbeangreen-300/40 bg-caribbeangreen-300/10 text-caribbeangreen-100";
    case "warning":
      return "border-yellow-100/40 bg-yellow-100/10 text-yellow-50";
    default:
      return "border-purple-300/40 bg-purple-300/10 text-purple-100";
  }
};

export default function ManageAnnouncements() {
  const { token } = useSelector((state) => state.auth);

  const [announcements, setAnnouncements] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("info");
  const [submitting, setSubmitting] = useState(false);

  const fetchAnnouncements = useCallback(async () => {
    const res = await getAllAnnouncements(token);
    setAnnouncements(res || []);
  }, [token]);

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) {
      toast.error("Title and message are required");
      return;
    }
    setSubmitting(true);
    const created = await createAnnouncement(token, { title, message, type });
    if (created) {
      setAnnouncements((prev) => [created, ...(prev || [])]);
      setTitle("");
      setMessage("");
      setType("info");
    }
    setSubmitting(false);
  };

  const handleToggle = async (a) => {
    const ok = await updateAnnouncement(token, a._id, { active: !a.active });
    if (ok) {
      setAnnouncements((prev) =>
        prev.map((x) => (x._id === a._id ? { ...x, active: !a.active } : x)),
      );
    }
  };

  const handleDelete = async (announcementId) => {
    const ok = await deleteAnnouncement(token, announcementId);
    if (ok) {
      setAnnouncements((prev) => prev.filter((a) => a._id !== announcementId));
    }
    setConfirmationModal(null);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-richblack-5">
          <span className="gradient-text">Announcements</span>
        </h1>
        <p className="mt-1 text-sm text-richblack-300">
          Post site-wide banners shown to all visitors. Toggle active to control
          visibility.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        {/* Create form */}
        <form
          className="glass-card h-fit p-6 lg:col-span-2 lg:sticky lg:top-24"
          onSubmit={handleCreate}
        >
          <h2 className="mb-6 flex items-center gap-2 text-lg font-semibold text-richblack-5">
            <VscMegaphone className="text-purple-200" /> New Announcement
          </h2>

          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-richblack-5">
              Title <sup className="text-pink-200">*</sup>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. New courses added!"
              className="w-full rounded-md border border-richblack-600 bg-richblack-700 px-3 py-2 text-richblack-5 placeholder:text-richblack-400 focus:border-purple-300 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-richblack-5">
              Message <sup className="text-pink-200">*</sup>
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Short message shown in the banner"
              rows="3"
              className="w-full resize-none rounded-md border border-richblack-600 bg-richblack-700 px-3 py-2 text-richblack-5 placeholder:text-richblack-400 focus:border-purple-300 focus:outline-none"
            />
          </div>

          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-richblack-5">
              Type
            </label>
            <div className="flex gap-2">
              {TYPES.map((t) => {
                const Icon = t.icon;
                return (
                  <button
                    type="button"
                    key={t.value}
                    onClick={() => setType(t.value)}
                    className={`flex flex-1 items-center justify-center gap-1 rounded-md border px-3 py-2 text-sm transition-all ${
                      type === t.value
                        ? typeStyle(t.value)
                        : "border-richblack-600 bg-richblack-700 text-richblack-200 hover:border-richblack-500"
                    }`}
                  >
                    <Icon /> {t.label}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-brand-gradient px-6 py-2.5 font-semibold text-white shadow-purple-glow transition-all duration-200 hover:scale-[0.99] disabled:opacity-60"
          >
            <VscMegaphone />
            {submitting ? "Publishing..." : "Publish Announcement"}
          </button>
        </form>

        {/* List */}
        <div className="glass-card p-6 lg:col-span-3">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-richblack-5">
              All Announcements
            </h2>
            {Array.isArray(announcements) && announcements.length > 0 && (
              <span className="rounded-full border border-purple-300/40 bg-purple-300/10 px-3 py-1 text-sm font-medium text-purple-200">
                {announcements.length}
              </span>
            )}
          </div>

          {announcements === null ? (
            <div className="flex justify-center py-16">
              <div className="spinner" />
            </div>
          ) : announcements.length > 0 ? (
            <ul className="space-y-3">
              {announcements.map((a) => (
                <li
                  key={a._id}
                  className={`rounded-lg border p-4 transition-all duration-200 ${
                    a.active
                      ? "border-richblack-700 bg-richblack-800"
                      : "border-richblack-800 bg-richblack-900 opacity-60"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-full border px-2 py-0.5 text-xs font-medium capitalize ${typeStyle(
                            a.type,
                          )}`}
                        >
                          {a.type}
                        </span>
                        <p className="font-semibold text-richblack-5">
                          {a.title}
                        </p>
                        {!a.active && (
                          <span className="rounded-full bg-richblack-700 px-2 py-0.5 text-[10px] uppercase tracking-wide text-richblack-300">
                            Hidden
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-richblack-300">
                        {a.message}
                      </p>
                    </div>

                    <div className="flex flex-shrink-0 items-center gap-2">
                      <button
                        onClick={() => handleToggle(a)}
                        title={a.active ? "Hide" : "Show"}
                        className={`rounded-md border px-3 py-2 text-xs transition-all ${
                          a.active
                            ? "border-richblack-600 bg-richblack-700 text-richblack-100 hover:border-richblack-500"
                            : "border-caribbeangreen-300/40 bg-caribbeangreen-300/10 text-caribbeangreen-100 hover:border-caribbeangreen-300"
                        }`}
                      >
                        {a.active ? "Hide" : "Show"}
                      </button>
                      <button
                        onClick={() =>
                          setConfirmationModal({
                            text1: "Delete this announcement?",
                            text2: "This action cannot be undone.",
                            btn1Text: "Delete",
                            btn2Text: "Cancel",
                            btn1Handler: () => handleDelete(a._id),
                            btn2Handler: () => setConfirmationModal(null),
                          })
                        }
                        title="Delete"
                        className="grid h-9 w-9 place-items-center rounded-md border border-richblack-600 bg-richblack-700 text-pink-200 transition-all duration-200 hover:border-pink-300 hover:text-pink-100"
                      >
                        <RiDeleteBin6Line />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="grid min-h-[200px] place-items-center text-center">
              <div>
                <VscMegaphone className="mx-auto mb-3 text-4xl text-richblack-500" />
                <p className="text-richblack-100">No announcements yet</p>
                <p className="mt-1 text-sm text-richblack-400">
                  Create one using the form.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
}
