import { useState } from "react";
import { Link } from "react-router-dom";
import { FileText, ArrowRight, Search, MapPin, Banknote, ChevronRight } from "lucide-react";
import useMyApplications from "../../hooks/useMyApplications";

const STATUS_STYLES = {
  pending:     "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
  shortlisted: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
  interview:   "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-400",
  hired:       "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
  rejected:    "bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400",
};

const STATUS_LABELS = {
  pending:     "Under Review",
  shortlisted: "Shortlisted",
  interview:   "Interview",
  hired:       "Hired",
  rejected:    "Rejected",
};

const FILTERS = ["all", "pending", "shortlisted", "interview", "hired", "rejected"];

const ApplicationsPage = () => {
  const { applications, loading } = useMyApplications();
  const [query, setQuery]         = useState("");
  const [filter, setFilter]       = useState("all");

  const filtered = applications.filter((app) => {
    const q = query.toLowerCase();
    const matchesQuery = !q || app.job?.title?.toLowerCase().includes(q) || app.job?.company?.toLowerCase().includes(q);
    const matchesFilter = filter === "all" || app.status === filter;
    return matchesQuery && matchesFilter;
  });

  const counts = FILTERS.slice(1).reduce((acc, s) => {
    acc[s] = applications.filter((a) => a.status === s).length;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">My Applications</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Track all your job applications in one place</p>
        </div>
        <Link
          to="/jobs"
          className="inline-flex items-center gap-2 text-sm bg-emerald-600 text-white px-4 py-2 rounded-xl hover:bg-emerald-700 transition-colors"
        >
          Browse Jobs <ArrowRight size={14} />
        </Link>
      </div>

      {/* Stats strip */}
      {!loading && applications.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Total",       value: applications.length,      color: "text-gray-900 dark:text-gray-100",       bg: "bg-white dark:bg-gray-900" },
            { label: "Under Review", value: counts.pending,           color: "text-amber-700 dark:text-amber-400",    bg: "bg-amber-50 dark:bg-amber-950" },
            { label: "Shortlisted", value: (counts.shortlisted || 0) + (counts.interview || 0), color: "text-blue-700 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-950" },
            { label: "Hired",       value: counts.hired,              color: "text-emerald-700 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-950" },
          ].map(({ label, value, color, bg }) => (
            <div key={label} className={`${bg} rounded-xl border border-gray-100 dark:border-gray-800 px-4 py-3`}>
              <p className={`text-2xl font-bold ${color}`}>{value ?? 0}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by job title or company…"
            className="w-full pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {FILTERS.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-2 rounded-xl text-xs font-medium capitalize transition-colors ${
                filter === s
                  ? "bg-emerald-600 text-white"
                  : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              {s === "all" ? "All" : STATUS_LABELS[s]}
              {s !== "all" && counts[s] > 0 && (
                <span className="ml-1.5 opacity-70">{counts[s]}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        {loading ? (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="px-6 py-4 flex items-center gap-4 animate-pulse">
                <div className="w-9 h-9 bg-gray-100 dark:bg-gray-800 rounded-xl shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3.5 bg-gray-100 dark:bg-gray-800 rounded w-2/5" />
                  <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-1/4" />
                </div>
                <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-20 hidden sm:block" />
                <div className="h-5 bg-gray-100 dark:bg-gray-800 rounded-full w-20" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-4">
              <FileText size={22} className="text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              {applications.length === 0 ? "No applications yet" : "No results"}
            </h3>
            <p className="text-xs text-gray-400 dark:text-gray-500 max-w-xs mb-5">
              {applications.length === 0
                ? "Once you apply to jobs, they'll show up here with their current status."
                : "Try adjusting your search or filter."}
            </p>
            {applications.length === 0 && (
              <Link
                to="/jobs"
                className="inline-flex items-center gap-2 bg-emerald-600 text-white text-sm px-5 py-2.5 rounded-xl hover:bg-emerald-700 transition-colors"
              >
                Find Jobs to Apply <ArrowRight size={14} />
              </Link>
            )}
          </div>
        ) : (
          <>
            {/* Table header */}
            <div className="hidden md:grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-6 py-3 border-b border-gray-100 dark:border-gray-800">
              <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide">Job</span>
              <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide w-36">Location</span>
              <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide w-24">Applied</span>
              <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide w-28">Status</span>
              <span className="w-8" />
            </div>

            <div className="divide-y divide-gray-50 dark:divide-gray-800">
              {filtered.map((app) => {
                const initials = app.job?.company?.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase() || "?";
                const appliedDate = app.createdAt
                  ? new Date(app.createdAt).toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" })
                  : "—";
                const status = app.status || "pending";

                return (
                  <div
                    key={app._id}
                    className="px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors md:grid md:grid-cols-[1fr_auto_auto_auto_auto] md:gap-4"
                  >
                    {/* Job info */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-xs font-bold shrink-0">
                        {initials}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">{app.job?.title || "Unknown Position"}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{app.job?.company}</p>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="w-36 hidden md:flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500 truncate">
                      {app.job?.address ? (
                        <><MapPin size={11} className="shrink-0" /><span className="truncate">{app.job.address}</span></>
                      ) : app.job?.salary ? (
                        <><Banknote size={11} className="shrink-0" /><span>P{Number(app.job.salary).toLocaleString()}</span></>
                      ) : "—"}
                    </div>

                    {/* Date */}
                    <span className="text-xs text-gray-400 dark:text-gray-500 w-24 hidden md:block">{appliedDate}</span>

                    {/* Status */}
                    <span className={`w-28 inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_STYLES[status] || "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"}`}>
                      {STATUS_LABELS[status] || status}
                    </span>

                    {/* View link */}
                    <Link
                      to={`/jobs/${app.job?._id}`}
                      className="w-8 h-8 hidden md:flex items-center justify-center rounded-lg text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-colors"
                    >
                      <ChevronRight size={14} />
                    </Link>
                  </div>
                );
              })}
            </div>

            <div className="px-6 py-3 border-t border-gray-100 dark:border-gray-800">
              <p className="text-xs text-gray-400 dark:text-gray-500">
                {filtered.length} of {applications.length} application{applications.length !== 1 ? "s" : ""}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ApplicationsPage;
