import { Link } from "react-router-dom";
import { Bookmark, MapPin, Banknote, ArrowUpRight, Trash2 } from "lucide-react";
import useSavedJobs from "../../hooks/useSavedJobs";

const TYPE_STYLES = {
  Permanent: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  Temporary: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  Internship: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
};

const SavedJobsPage = () => {
  const { jobs, savedIds, loading, toggleSave } = useSavedJobs();
  // show only those still saved (optimistic removals hide instantly)
  const visible = jobs.filter((j) => savedIds.has(j._id));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Saved Jobs</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Jobs you've bookmarked for later</p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        {loading ? (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="px-6 py-4 flex items-center gap-4 animate-pulse">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-xl shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3.5 bg-gray-100 dark:bg-gray-800 rounded w-2/5" />
                  <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-1/4" />
                </div>
                <div className="h-8 bg-gray-100 dark:bg-gray-800 rounded-lg w-20" />
              </div>
            ))}
          </div>
        ) : visible.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-4">
              <Bookmark size={22} className="text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">No saved jobs yet</h3>
            <p className="text-xs text-gray-400 dark:text-gray-500 max-w-xs mb-5">
              Tap the bookmark icon on any job to save it here for later.
            </p>
            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 bg-emerald-600 text-white text-sm px-5 py-2.5 rounded-xl hover:bg-emerald-700 transition-colors"
            >
              Browse Jobs <ArrowUpRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-50 dark:divide-gray-800">
            {visible.map((job) => {
              const initials = job.company?.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase() || "?";
              return (
                <div key={job._id} className="px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-xs font-bold shrink-0">
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">{job.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate flex items-center gap-2">
                        {job.company}
                        {job.jobType && (
                          <span className={`px-1.5 py-0.5 rounded-full font-medium ${TYPE_STYLES[job.jobType] || "bg-gray-100 text-gray-600"}`}>
                            {job.jobType}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="hidden md:flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                    {job.address && <span className="flex items-center gap-1"><MapPin size={12} />{job.address}</span>}
                    {job.salary && <span className="flex items-center gap-1"><Banknote size={12} />P{Number(job.salary).toLocaleString()}</span>}
                  </div>

                  <div className="flex items-center gap-2 sm:justify-end">
                    <button
                      type="button"
                      onClick={() => toggleSave(job._id)}
                      title="Remove from saved"
                      aria-label="Remove from saved"
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-400 hover:text-red-600 hover:border-red-200 dark:hover:border-red-900 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                    <Link
                      to={`/jobs/${job._id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950 hover:bg-emerald-100 dark:hover:bg-emerald-900 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      View <ArrowUpRight size={12} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedJobsPage;
