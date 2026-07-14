import { useEffect, useState } from "react";
import { VscInfo, VscWarning, VscCheck, VscClose } from "react-icons/vsc";

import { getPublicAnnouncements } from "../../services/operations/adminAPI";

const styleFor = (type) => {
  switch (type) {
    case "success":
      return {
        wrap: "bg-caribbeangreen-300/15 border-caribbeangreen-300/30 text-caribbeangreen-50",
        Icon: VscCheck,
      };
    case "warning":
      return {
        wrap: "bg-yellow-100/15 border-yellow-100/30 text-yellow-50",
        Icon: VscWarning,
      };
    default:
      return {
        wrap: "bg-purple-300/15 border-purple-300/30 text-purple-50",
        Icon: VscInfo,
      };
  }
};

// Session-scoped dismissal so a banner doesn't nag on every route change
const getDismissed = () => {
  try {
    return JSON.parse(sessionStorage.getItem("dismissedAnnouncements") || "[]");
  } catch {
    return [];
  }
};

export default function AnnouncementBanner() {
  const [announcements, setAnnouncements] = useState([]);
  const [dismissed, setDismissed] = useState(getDismissed);

  useEffect(() => {
    let mounted = true;
    getPublicAnnouncements().then((data) => {
      if (mounted) setAnnouncements(Array.isArray(data) ? data : []);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const visible = announcements.filter((a) => !dismissed.includes(a._id));
  if (visible.length === 0) return null;

  const dismiss = (id) => {
    const next = [...dismissed, id];
    setDismissed(next);
    try {
      sessionStorage.setItem("dismissedAnnouncements", JSON.stringify(next));
    } catch {
      /* ignore storage errors */
    }
  };

  return (
    <div className="w-full">
      {visible.map((a) => {
        const { wrap, Icon } = styleFor(a.type);
        return (
          <div
            key={a._id}
            className={`flex items-center gap-3 border-b px-4 py-2 text-sm ${wrap}`}
          >
            <Icon className="flex-shrink-0 text-base" />
            <p className="flex-1 text-center">
              <span className="font-semibold">{a.title}</span>
              <span className="mx-2 opacity-60">•</span>
              <span className="opacity-90">{a.message}</span>
            </p>
            <button
              onClick={() => dismiss(a._id)}
              title="Dismiss"
              className="flex-shrink-0 rounded p-1 opacity-70 transition-opacity hover:opacity-100"
            >
              <VscClose />
            </button>
          </div>
        );
      })}
    </div>
  );
}
