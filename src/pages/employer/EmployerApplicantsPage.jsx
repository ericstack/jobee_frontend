import { useState } from "react";
import { Link } from "react-router-dom";
import { Users, Search, ChevronRight } from "lucide-react";
import useApplications from "../../hooks/useApplications";
import { updateApplicationStatus } from "../../api/applicationsApi";
import toast from "react-hot-toast";

const STATUS_STYLES = {
  pending:     "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
  shortlisted: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
  interview:   "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-400",
  hired:       "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
  rejected:    "bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400",
};

const STATUS_FILTERS = ["all", "pending", "shortlisted", "interview", "hired", "rejected"];

const NEXT_ACTION = {
  pending:     { label: "Shortlist", next: "shortlisted" },
  shortlisted: { label: "Interview", next: "interview" },
  interview:   { label: "Hire",      next: "hired" },
};

const EmployerApplicantsPage = () => {
  const { applications, loading, fetchApplications } = useApplications();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [updating, setUpdating] = useState(null);

  const filtered = applications.filter((app) => {
    const matchesQuery =
      !query ||
      app.user?.name?.toLowerCase().includes(query.toLowerCase()) ||
      app.job?.title?.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  const handleStatusChange = async (appId, status) => {
    setUpdating(appId);
    try {
      await updateApplicationStatus(appId, status);
      toast.success(`Marked as ${status}`);
      fetchApplications();
    } catch {
      toast.error("Failed to update status");
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Applicants</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Candidates who applied to your job listings</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or job…"
            className="w-full pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 rounded-xl text-xs font-medium capitalize transition-colors ${
                statusFilter === s
                  ? "bg-emerald-600 text-white"
                  : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        {loading ? (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="px-6 py-4 flex items-center gap-4 animate-pulse">
                <div className="w-9 h-9 bg-gray-100 dark:bg-gray-800 rounded-full shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3.5 bg-gray-100 dark:bg-gray-800 rounded w-1/4" />
                  <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-1/3" />
                </div>
                <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-28 hidden md:block" />
                <div className="h-5 bg-gray-100 dark:bg-gray-800 rounded-full w-20" />
                <div className="h-7 bg-gray-100 dark:bg-gray-800 rounded-lg w-20" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-4">
              <Users size={22} className="text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              {applications.length === 0 ? "No applicants yet" : "No results"}
            </h3>
            <p className="text-xs text-gray-400 dark:text-gray-500 max-w-xs">
              {applications.length === 0
                ? "Once candidates apply to your job listings, they will appear here."
                : "Try adjusting your search or filter."}
            </p>
          </div>
        ) : (
          <>
            {/* Table header */}
            <div className="hidden md:grid grid-cols-[1fr_1fr_auto_auto_auto] gap-4 px-6 py-3 border-b border-gray-100 dark:border-gray-800">
              <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide">Applicant</span>
              <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide">Applied For</span>
              <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide w-24">Date</span>
              <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide w-28">Status</span>
              <span className="w-28" />
            </div>

            <div className="divide-y divide-gray-50 dark:divide-gray-800">
              {filtered.map((app) => {
                const initials = app.user?.name?.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase() || "?";
                const appliedDate = app.createdAt
                  ? new Date(app.createdAt).toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" })
                  : "—";
                const next = NEXT_ACTION[app.status];

                return (
                  <div
                    key={app._id}
                    className="px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors md:grid md:grid-cols-[1fr_1fr_auto_auto_auto] md:gap-4"
                  >
                    {/* Applicant */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-xs font-bold shrink-0">
                        {initials}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{app.user?.name || "Unknown"}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{app.user?.email}</p>
                      </div>
                    </div>

                    {/* Job */}
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate hidden md:block">{app.job?.title || "—"}</p>

                    {/* Date */}
                    <span className="text-xs text-gray-400 dark:text-gray-500 w-24 hidden md:block">{appliedDate}</span>

                    {/* Status badge */}
                    <span className={`w-28 inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-medium capitalize ${STATUS_STYLES[app.status] || "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"}`}>
                      {app.status || "pending"}
                    </span>

                    {/* Actions */}
                    <div className="flex items-center gap-2 w-28 justify-end">
                      {next && (
                        <button
                          disabled={updating === app._id}
                          onClick={() => handleStatusChange(app._id, next.next)}
                          className="text-xs px-2.5 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950 disabled:opacity-50 transition-colors"
                        >
                          {next.label}
                        </button>
                      )}
                      {app.status !== "rejected" && app.status !== "hired" && (
                        <button
                          disabled={updating === app._id}
                          onClick={() => handleStatusChange(app._id, "rejected")}
                          className="text-xs px-2.5 py-1.5 rounded-lg border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 disabled:opacity-50 transition-colors"
                        >
                          Reject
                        </button>
                      )}
                      <Link
                        to={`/employer/applicants/${app._id}`}
                        className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-colors"
                      >
                        <ChevronRight size={14} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="px-6 py-3 border-t border-gray-100 dark:border-gray-800">
              <p className="text-xs text-gray-400 dark:text-gray-500">
                {filtered.length} of {applications.length} applicant{applications.length !== 1 ? "s" : ""}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EmployerApplicantsPage;
