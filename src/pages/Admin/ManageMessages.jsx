import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineSearch, HiOutlineMail } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { VscCheck, VscMailRead } from "react-icons/vsc";

import {
  getAllMessages,
  markMessageRead,
  deleteMessage,
} from "../../services/operations/adminAPI";
import ConfirmationModal from "../../components/common/ConfirmationModal";

const FILTERS = ["All", "Unread", "Read"];

export default function ManageMessages() {
  const { token } = useSelector((state) => state.auth);

  const [messages, setMessages] = useState(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [confirmationModal, setConfirmationModal] = useState(null);

  const fetchMessages = useCallback(async () => {
    const res = await getAllMessages(token);
    setMessages(res || []);
  }, [token]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const filtered = useMemo(() => {
    if (!messages) return [];
    const q = query.trim().toLowerCase();
    return messages.filter((m) => {
      const matchesFilter =
        filter === "All" ||
        (filter === "Unread" && !m.read) ||
        (filter === "Read" && m.read);
      const name = `${m.firstName || ""} ${m.lastName || ""}`.toLowerCase();
      const matchesQuery =
        !q ||
        name.includes(q) ||
        m.email?.toLowerCase().includes(q) ||
        m.message?.toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [messages, query, filter]);

  const unreadCount = useMemo(
    () => (messages ? messages.filter((m) => !m.read).length : 0),
    [messages],
  );

  const handleToggleRead = async (m) => {
    const ok = await markMessageRead(token, m._id, !m.read);
    if (ok) {
      setMessages((prev) =>
        prev.map((x) => (x._id === m._id ? { ...x, read: !m.read } : x)),
      );
    }
  };

  const handleDelete = async (messageId) => {
    const ok = await deleteMessage(token, messageId);
    if (ok) {
      setMessages((prev) => prev.filter((m) => m._id !== messageId));
    }
    setConfirmationModal(null);
  };

  const formatDate = (d) =>
    new Date(d).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="mx-auto w-11/12 max-w-[1000px] py-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-richblack-5">
          Contact <span className="gradient-text">Messages</span>
        </h1>
        <p className="mt-1 text-richblack-300">
          Enquiries submitted through the Contact page.
          {unreadCount > 0 && (
            <span className="ml-2 rounded-full border border-purple-300/40 bg-purple-300/10 px-2 py-0.5 text-xs text-purple-100">
              {unreadCount} unread
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
            placeholder="Search name, email, message"
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
      {messages === null ? (
        <div className="flex justify-center py-20">
          <div className="spinner" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="glass-card rounded-xl p-10 text-center text-richblack-300">
          <HiOutlineMail className="mx-auto mb-3 text-4xl text-richblack-500" />
          No messages found.
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((m) => (
            <div
              key={m._id}
              className={`glass-card rounded-xl p-4 ${
                m.read ? "" : "border-l-4 border-l-purple-300"
              }`}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-richblack-5">
                      {m.firstName} {m.lastName}
                    </p>
                    {!m.read && (
                      <span className="rounded-full bg-purple-300/20 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-purple-100">
                        New
                      </span>
                    )}
                  </div>
                  <a
                    href={`mailto:${m.email}`}
                    className="text-sm text-purple-200 hover:underline"
                  >
                    {m.email}
                  </a>
                  {m.phoneNo && (
                    <span className="ml-2 text-sm text-richblack-300">
                      · {m.countrycode} {m.phoneNo}
                    </span>
                  )}
                </div>

                <div className="flex flex-shrink-0 items-center gap-2">
                  <span className="text-xs text-richblack-400">
                    {formatDate(m.createdAt)}
                  </span>
                  <button
                    onClick={() => handleToggleRead(m)}
                    title={m.read ? "Mark as unread" : "Mark as read"}
                    className="grid h-9 w-9 place-items-center rounded-md border border-richblack-600 bg-richblack-700 text-caribbeangreen-100 transition-all duration-200 hover:border-caribbeangreen-300"
                  >
                    {m.read ? <VscMailRead /> : <VscCheck />}
                  </button>
                  <button
                    onClick={() =>
                      setConfirmationModal({
                        text1: "Delete this message?",
                        text2: "This action cannot be undone.",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: () => handleDelete(m._id),
                        btn2Handler: () => setConfirmationModal(null),
                      })
                    }
                    title="Delete message"
                    className="grid h-9 w-9 place-items-center rounded-md border border-richblack-600 bg-richblack-700 text-pink-200 transition-all duration-200 hover:border-pink-300 hover:text-pink-100"
                  >
                    <RiDeleteBin6Line />
                  </button>
                </div>
              </div>

              <p className="mt-3 whitespace-pre-wrap break-words rounded-lg bg-richblack-800/60 p-3 text-sm text-richblack-100">
                {m.message}
              </p>
            </div>
          ))}
        </div>
      )}

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
}
