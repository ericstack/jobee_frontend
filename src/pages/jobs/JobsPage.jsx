import Navbar from "../../components/layout/Navbar";
import useJobs from "../../hooks/useJobs";
import { Search, SlidersHorizontal, MapPin, Banknote, Clock, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const TYPE_STYLES = {
  Permanent: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  Temporary: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  Internship: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
};

const JobsPage = () => {
  const { jobs, loading } = useJobs();
  const [query, setQuery] = useState("");

  const filtered = jobs.filter((j) => {
    const q = query.toLowerCase();
    return (
      !q ||
      j.title?.toLowerCase().includes(q) ||
      j.company?.toLowerCase().includes(q) ||
      j.address?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />

      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">Browse Jobs</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1.5 text-sm">Explore the latest opportunities across the Philippines</p>

          <div className="mt-5 flex flex-col sm:flex-row gap-3 max-w-2xl">
            <div className="relative flex-1">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by job title, company, or keyword…"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <button className="inline-flex items-center gap-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 px-4 py-2.5 rounded-xl text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <SlidersHorizontal size={15} />
              Filters
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="px-6 py-4 flex items-center gap-4 animate-pulse">
                  <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-xl shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3.5 bg-gray-100 dark:bg-gray-800 rounded w-2/5" />
                    <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-1/4" />
                  </div>
                  <div className="h-5 bg-gray-100 dark:bg-gray-800 rounded w-20 hidden sm:block" />
                  <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-32 hidden md:block" />
                  <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-20 hidden md:block" />
                  <div className="h-8 bg-gray-100 dark:bg-gray-800 rounded-lg w-20" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Showing <span className="font-semibold text-gray-900 dark:text-gray-100">{filtered.length}</span>
              {query ? ` result${filtered.length !== 1 ? "s" : ""} for "${query}"` : " jobs"}
            </p>

            {filtered.length === 0 ? (
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm py-20 text-center">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">No jobs found</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Try adjusting your search terms</p>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                <div className="hidden md:grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-6 py-3 border-b border-gray-100 dark:border-gray-800 items-center">
                  <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide">Job</span>
                  <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide w-24 text-center">Type</span>
                  <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide w-40">Location</span>
                  <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide w-28">Salary</span>
                  <span className="w-20" />
                </div>

                <div className="divide-y divide-gray-50 dark:divide-gray-800">
                  {filtered.map((job) => {
                    const initials = job.company?.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase() || "?";
                    return (
                      <div
                        key={job._id}
                        className="px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors md:grid md:grid-cols-[1fr_auto_auto_auto_auto] md:gap-4"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-xs font-bold shrink-0">
                            {initials}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">{job.title}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{job.company}</p>
                          </div>
                        </div>

                        <span className={`w-24 hidden md:inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-medium ${TYPE_STYLES[job.jobType] || "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"}`}>
                          {job.jobType || "—"}
                        </span>

                        <div className="w-40 hidden md:flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                          <MapPin size={12} className="shrink-0" />
                          <span className="truncate">{job.address || "—"}</span>
                        </div>

                        <div className="w-28 hidden md:flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                          <Banknote size={12} className="shrink-0" />
                          <span>{job.salary ? `P${Number(job.salary).toLocaleString()}` : "—"}</span>
                        </div>

                        <div className="flex items-center gap-2 md:w-20 md:justify-end">
                          <div className="flex items-center gap-3 md:hidden text-xs text-gray-400 dark:text-gray-500">
                            {job.jobType && (
                              <span className={`px-2 py-0.5 rounded-full font-medium ${TYPE_STYLES[job.jobType] || "bg-gray-100 text-gray-600"}`}>
                                {job.jobType}
                              </span>
                            )}
                            {job.address && (
                              <span className="flex items-center gap-1">
                                <MapPin size={11} />{job.address}
                              </span>
                            )}
                            {job.salary && (
                              <span className="flex items-center gap-1">
                                <Banknote size={11} />P{Number(job.salary).toLocaleString()}
                              </span>
                            )}
                          </div>
                          <Link
                            to={`/jobs/${job._id}`}
                            className="ml-auto md:ml-0 inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950 hover:bg-emerald-100 dark:hover:bg-emerald-900 px-3 py-1.5 rounded-lg transition-colors"
                          >
                            Apply
                            <ArrowUpRight size={12} />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="px-6 py-3 border-t border-gray-100 dark:border-gray-800">
                  <p className="text-xs text-gray-400 dark:text-gray-500">{filtered.length} job{filtered.length !== 1 ? "s" : ""} listed</p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default JobsPage;
