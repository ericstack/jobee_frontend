import { TrendingUp, Users, Briefcase, FileText } from "lucide-react";
import useAdminStats from "../../hooks/useAdminStats";

const MetricCard = ({ label, value, icon: Icon, light, dark }) => (
  <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4">
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${light} ${dark}`}>
      <Icon size={20} />
    </div>
    <div>
      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
    </div>
  </div>
);

const STATUS_COLORS = {
  pending: "bg-amber-500",
  shortlisted: "bg-blue-500",
  interview: "bg-purple-500",
  hired: "bg-emerald-500",
  rejected: "bg-red-500",
};

const AdminAnalyticsPage = () => {
  const { loading, totalUsers, totalJobs, totalApplications, placementRate, applications } = useAdminStats();
  const show = (n) => (loading ? "—" : n);

  // application status breakdown
  const statuses = ["pending", "shortlisted", "interview", "hired", "rejected"];
  const counts = statuses.map((s) => ({ s, n: applications.filter((a) => a.status === s).length }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Analytics</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Platform-wide statistics and trends</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <MetricCard label="Total Users" value={show(totalUsers)} icon={Users}
          light="bg-emerald-50 text-emerald-600" dark="dark:bg-emerald-950 dark:text-emerald-400" />
        <MetricCard label="Active Jobs" value={show(totalJobs)} icon={Briefcase}
          light="bg-blue-50 text-blue-600" dark="dark:bg-blue-950 dark:text-blue-400" />
        <MetricCard label="Total Applications" value={show(totalApplications)} icon={FileText}
          light="bg-emerald-50 text-emerald-600" dark="dark:bg-emerald-950 dark:text-emerald-400" />
        <MetricCard label="Placement Rate" value={loading ? "—" : `${placementRate}%`} icon={TrendingUp}
          light="bg-amber-50 text-amber-600" dark="dark:bg-amber-950 dark:text-amber-400" />
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-gray-900 dark:text-gray-100">Applications by Status</h2>
          <span className="text-xs text-gray-400 dark:text-gray-500">{totalApplications} total</span>
        </div>
        {totalApplications === 0 ? (
          <p className="text-sm text-gray-400 dark:text-gray-500 py-8 text-center">No applications yet.</p>
        ) : (
          <div className="space-y-3">
            {counts.map(({ s, n }) => (
              <div key={s} className="flex items-center gap-3">
                <span className="w-24 text-xs capitalize text-gray-500 dark:text-gray-400">{s}</span>
                <div className="flex-1 h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${STATUS_COLORS[s] || "bg-gray-400"}`}
                    style={{ width: `${totalApplications ? (n / totalApplications) * 100 : 0}%` }}
                  />
                </div>
                <span className="w-8 text-right text-xs font-medium text-gray-700 dark:text-gray-300">{n}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAnalyticsPage;

