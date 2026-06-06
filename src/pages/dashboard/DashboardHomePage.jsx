import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { FileText, Clock, CheckCircle, XCircle, ArrowRight, Briefcase, MapPin } from "lucide-react";
import useMyApplications from "../../hooks/useMyApplications";

const STATUS_STYLES = {
  pending:     "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
  shortlisted: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
  interview:   "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-400",
  hired:       "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
  rejected:    "bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400",
};

const STATUS_LABELS = {
  pending: "Under Review", shortlisted: "Shortlisted",
  interview: "Interview",  hired: "Hired", rejected: "Rejected",
};

const StatCard = ({ label, value, icon: Icon, light, dark, subtext }) => (
  <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{label}</p>
        <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
        {subtext && <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{subtext}</p>}
      </div>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${light} ${dark}`}>
        <Icon size={18} />
      </div>
    </div>
  </div>
);

const DashboardHomePage = () => {
  const { user } = useAuth();
  const { applications, loading } = useMyApplications();

  const total       = applications.length;
  const pending     = applications.filter((a) => a.status === "pending").length;
  const shortlisted = applications.filter((a) => ["shortlisted", "interview"].includes(a.status)).length;
  const rejected    = applications.filter((a) => a.status === "rejected").length;
  const recent      = applications.slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Welcome back, {user?.name?.split(" ")[0]} 👋
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Here's a summary of your job search activity.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Applications" value={loading ? "—" : total}       subtext="All time"            icon={FileText}     light="bg-emerald-50 text-emerald-600" dark="dark:bg-emerald-950 dark:text-emerald-400" />
        <StatCard label="Pending Review"     value={loading ? "—" : pending}     subtext="Awaiting response"  icon={Clock}        light="bg-amber-50 text-amber-600"     dark="dark:bg-amber-950 dark:text-amber-400" />
        <StatCard label="Shortlisted"        value={loading ? "—" : shortlisted} subtext="Under consideration" icon={CheckCircle} light="bg-blue-50 text-blue-600"       dark="dark:bg-blue-950 dark:text-blue-400" />
        <StatCard label="Rejected"           value={loading ? "—" : rejected}    subtext="Not selected"       icon={XCircle}      light="bg-red-50 text-red-500"         dark="dark:bg-red-950 dark:text-red-400" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent applications */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">Recent Applications</h2>
            <Link to="/dashboard/applications" className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-3 animate-pulse">
                  <div className="w-9 h-9 bg-gray-100 dark:bg-gray-800 rounded-xl shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3.5 bg-gray-100 dark:bg-gray-800 rounded w-2/5" />
                    <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-1/4" />
                  </div>
                  <div className="h-5 bg-gray-100 dark:bg-gray-800 rounded-full w-20" />
                </div>
              ))}
            </div>
          ) : recent.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-3">
                <FileText size={20} className="text-gray-400 dark:text-gray-500" />
              </div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">No applications yet</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 mb-4">Start applying to jobs to track your progress here.</p>
              <Link
                to="/jobs"
                className="inline-flex items-center gap-2 bg-emerald-600 text-white text-xs px-4 py-2 rounded-xl hover:bg-emerald-700 transition-colors"
              >
                Browse Jobs <ArrowRight size={13} />
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              {recent.map((app) => {
                const initials = app.job?.company?.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase() || "?";
                const status = app.status || "pending";
                return (
                  <Link
                    key={app._id}
                    to={`/jobs/${app.job?._id}`}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-xs font-bold shrink-0">
                      {initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{app.job?.title || "Unknown Position"}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1 truncate">
                        {app.job?.address ? <><MapPin size={10} />{app.job.address}</> : app.job?.company}
                      </p>
                    </div>
                    <span className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_STYLES[status] || "bg-gray-100 text-gray-600"}`}>
                      {STATUS_LABELS[status] || status}
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {[
              { to: "/jobs",                    icon: Briefcase,   label: "Browse Jobs",       desc: "Find new opportunities",    light: "bg-emerald-50 text-emerald-600", dark: "dark:bg-emerald-950 dark:text-emerald-400" },
              { to: "/dashboard/applications",  icon: FileText,    label: "My Applications",   desc: "Track your progress",       light: "bg-blue-50 text-blue-600",       dark: "dark:bg-blue-950 dark:text-blue-400" },
              { to: "/dashboard/profile",       icon: CheckCircle, label: "Update Profile",    desc: "Improve your visibility",   light: "bg-emerald-50 text-emerald-600", dark: "dark:bg-emerald-950 dark:text-emerald-400" },
            ].map(({ to, icon: Icon, label, desc, light, dark }) => (
              <Link key={to} to={to} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${light} ${dark}`}>
                  <Icon size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{label}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">{desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHomePage;
