import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  VscAccount,
  VscMortarBoard,
  VscBook,
  VscStarFull,
} from "react-icons/vsc";

import { getAdminStats } from "../../services/operations/adminAPI";

export default function AdminDashboard() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await getAdminStats(token);
      setStats(res);
      setLoading(false);
    })();
  }, [token]);

  const statCards = stats
    ? [
        {
          label: "Total Users",
          value: stats.users.total,
          icon: <VscAccount />,
          sub: `${stats.users.students} students · ${stats.users.instructors} instructors · ${stats.users.admins} admins`,
        },
        {
          label: "Total Courses",
          value: stats.courses.total,
          icon: <VscBook />,
          sub: `${stats.courses.published} published · ${stats.courses.draft} draft`,
        },
        {
          label: "Enrollments",
          value: stats.totalEnrollments,
          icon: <VscMortarBoard />,
          sub: `${stats.totalCategories} categories`,
        },
        {
          label: "Reviews",
          value: stats.totalReviews,
          icon: <VscStarFull />,
          sub: `₹ ${stats.totalRevenue} revenue`,
        },
      ]
    : [];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-richblack-5">
          Hi {user?.firstName} 👋
        </h1>
        <p className="mt-1 text-sm text-richblack-300">
          Here's an overview of your platform.
        </p>
      </div>

      {loading ? (
        <div className="grid min-h-[40vh] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : !stats ? (
        <div className="glass-card p-10 text-center text-richblack-200">
          Could not load statistics.
        </div>
      ) : (
        <div className="space-y-8">
          {/* Stat cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {statCards.map((card) => (
              <div key={card.label} className="glass-card p-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium uppercase tracking-wide text-richblack-300">
                    {card.label}
                  </p>
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-richblack-700 text-lg text-purple-200">
                    {card.icon}
                  </span>
                </div>
                <p className="mt-3 text-3xl font-bold gradient-text">
                  {card.value}
                </p>
                <p className="mt-2 text-xs text-richblack-400">{card.sub}</p>
              </div>
            ))}
          </div>

          {/* Breakdown panels */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Users breakdown */}
            <div className="glass-card p-6">
              <p className="mb-4 text-lg font-semibold text-richblack-5">
                Users Breakdown
              </p>
              <div className="space-y-3">
                <BreakdownRow
                  label="Students"
                  value={stats.users.students}
                  total={stats.users.total}
                  color="bg-purple-300"
                />
                <BreakdownRow
                  label="Instructors"
                  value={stats.users.instructors}
                  total={stats.users.total}
                  color="bg-caribbeangreen-300"
                />
                <BreakdownRow
                  label="Admins"
                  value={stats.users.admins}
                  total={stats.users.total}
                  color="bg-yellow-100"
                />
              </div>
            </div>

            {/* Courses breakdown */}
            <div className="glass-card p-6">
              <p className="mb-4 text-lg font-semibold text-richblack-5">
                Courses Breakdown
              </p>
              <div className="space-y-3">
                <BreakdownRow
                  label="Published"
                  value={stats.courses.published}
                  total={stats.courses.total}
                  color="bg-caribbeangreen-300"
                />
                <BreakdownRow
                  label="Draft"
                  value={stats.courses.draft}
                  total={stats.courses.total}
                  color="bg-pink-200"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function BreakdownRow({ label, value, total, color }) {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0;
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="text-richblack-100">{label}</span>
        <span className="font-medium text-richblack-300">
          {value} ({pct}%)
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-richblack-700">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
