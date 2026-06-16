import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import useAdminStats from "../../hooks/useAdminStats";
import { Users, Briefcase, FileText, TrendingUp, ArrowRight, Shield, Activity } from "lucide-react";

const StatCard = ({ label, value, icon: Icon, light, dark, change }) => (
  <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
    <div className="flex items-start justify-between mb-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${light} ${dark}`}>
        <Icon size={18} />
      </div>
      {change && (
        <span className="text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full font-medium">
          {change}
        </span>
      )}
    </div>
    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{label}</p>
  </div>
);

const AdminHomePage = () => {
  const { user } = useAuth();
  const { loading, totalUsers, employers, totalJobs, totalApplications, newUsersToday, users } = useAdminStats();
  const show = (n) => (loading ? "—" : n);
  const recentUsers = [...users]
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Shield size={16} className="text-emerald-600 dark:text-emerald-400" />
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Admin</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Welcome, {user?.name?.split(" ")[0]}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Platform overview and management</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Users" value={show(totalUsers)} icon={Users} change={loading ? null : `+${newUsersToday} today`}
          light="bg-emerald-50 text-emerald-600" dark="dark:bg-emerald-950 dark:text-emerald-400" />
        <StatCard label="Employers" value={show(employers)} icon={TrendingUp}
          light="bg-blue-50 text-blue-600" dark="dark:bg-blue-950 dark:text-blue-400" />
        <StatCard label="Active Jobs" value={show(totalJobs)} icon={Briefcase}
          light="bg-emerald-50 text-emerald-600" dark="dark:bg-emerald-950 dark:text-emerald-400" />
        <StatCard label="Total Applications" value={show(totalApplications)} icon={FileText}
          light="bg-amber-50 text-amber-600" dark="dark:bg-amber-950 dark:text-amber-400" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">Recent Activity</h2>
            <span className="text-xs text-gray-400 dark:text-gray-500">Last 24 hours</span>
          </div>
          {loading ? (
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-3 animate-pulse">
                  <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full shrink-0" />
                  <div className="flex-1 h-3.5 bg-gray-100 dark:bg-gray-800 rounded w-1/3" />
                </div>
              ))}
            </div>
          ) : recentUsers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-3">
                <Activity size={20} className="text-gray-400 dark:text-gray-500" />
              </div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">No recent activity</p>
            </div>
          ) : (
            <div className="space-y-1">
              {recentUsers.map((u) => (
                <div key={u._id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-xs font-bold shrink-0">
                    {u.name?.[0]?.toUpperCase() || "?"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                      {u.name} <span className="text-xs text-gray-400 capitalize">· {u.role}</span>
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{u.email}</p>
                  </div>
                  <span className="text-xs text-gray-400 dark:text-gray-500 shrink-0">
                    {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : ""}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Admin Actions</h2>
          <div className="space-y-3">
            {[
              { to: "/admin/users", icon: Users, label: "Manage Users", desc: "View and moderate accounts", light: "bg-emerald-50 text-emerald-600", dark: "dark:bg-emerald-950 dark:text-emerald-400" },
              { to: "/admin/jobs", icon: Briefcase, label: "Manage Jobs", desc: "Review all listings", light: "bg-blue-50 text-blue-600", dark: "dark:bg-blue-950 dark:text-blue-400" },
              { to: "/admin/analytics", icon: TrendingUp, label: "Analytics", desc: "Platform statistics", light: "bg-emerald-50 text-emerald-600", dark: "dark:bg-emerald-950 dark:text-emerald-400" },
            ].map(({ to, icon: Icon, label, desc, light, dark }) => (
              <Link key={to} to={to} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${light} ${dark}`}>
                  <Icon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{label}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">{desc}</p>
                </div>
                <ArrowRight size={13} className="text-gray-300 dark:text-gray-600 group-hover:text-gray-400 dark:group-hover:text-gray-500" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;

