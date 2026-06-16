import Navbar from "../../components/layout/Navbar";
import useJobs from "../../hooks/useJobs";
import useSavedJobs from "../../hooks/useSavedJobs";
import { Search, SlidersHorizontal, MapPin, Banknote, ArrowUpRight, X, Building2, ChevronLeft, ChevronRight, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

const TYPE_STYLES = {
  Permanent: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  Temporary: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  Internship: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
};

const JOB_TYPES = ["Permanent", "Temporary", "Internship"];
const INDUSTRIES = [
  "Business",
  "Information Technology",
  "Banking",
  "Education/Training",
  "Telecommunication",
  "Others",
];
const SORT_OPTIONS = [
  { value: "-postingDate", label: "Newest first" },
  { value: "postingDate", label: "Oldest first" },
  { value: "-salary", label: "Salary: high to low" },
  { value: "salary", label: "Salary: low to high" },
];

const JobsPage = () => {
  // filter inputs
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [company, setCompany] = useState("");
  const [jobType, setJobType] = useState("");
  const [industry, setIndustry] = useState("");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [sort, setSort] = useState("-postingDate");
  const [showFilters, setShowFilters] = useState(false);

  const PAGE_SIZE = 10;
  const [page, setPage] = useState(1);

  // debounced filter snapshot; any filter/sort change resets to the first page
  const [filterPart, setFilterPart] = useState({ sort: "-postingDate" });
  useEffect(() => {
    const t = setTimeout(() => {
      setFilterPart({ keyword, location, company, jobType, industry, salaryMin, salaryMax, sort });
      setPage(1);
    }, 400);
    return () => clearTimeout(t);
  }, [keyword, location, company, jobType, industry, salaryMin, salaryMax, sort]);

  const applied = useMemo(
    () => ({ ...filterPart, page, limit: PAGE_SIZE }),
    [filterPart, page],
  );

  const { jobs, total, loading } = useJobs(applied);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const { savedIds, toggleSave } = useSavedJobs();

  const activeCount = useMemo(
    () => [location, company, jobType, industry, salaryMin, salaryMax].filter(Boolean).length,
    [location, company, jobType, industry, salaryMin, salaryMax],
  );

  const clearFilters = () => {
    setLocation("");
    setCompany("");
    setJobType("");
    setIndustry("");
    setSalaryMin("");
    setSalaryMax("");
  };

  const inputCls =
    "w-full px-3 py-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent";

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
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search by job title, company, or keyword…"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters((s) => !s)}
              className={`inline-flex items-center gap-2 border px-4 py-2.5 rounded-xl text-sm transition-colors ${
                showFilters || activeCount > 0
                  ? "border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950"
                  : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              <SlidersHorizontal size={15} />
              Filters
              {activeCount > 0 && (
                <span className="ml-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-semibold">
                  {activeCount}
                </span>
              )}
            </button>
          </div>

          {/* Filters panel */}
          {showFilters && (
            <div className="mt-4 max-w-3xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* Location */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Location</label>
                  <div className="relative">
                    <MapPin size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Makati"
                      className={`${inputCls} pl-8`}
                    />
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Company</label>
                  <div className="relative">
                    <Building2 size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Jobeee"
                      className={`${inputCls} pl-8`}
                    />
                  </div>
                </div>

                {/* Job type */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Job Type</label>
                  <select value={jobType} onChange={(e) => setJobType(e.target.value)} className={inputCls}>
                    <option value="">All types</option>
                    {JOB_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                {/* Industry */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Industry</label>
                  <select value={industry} onChange={(e) => setIndustry(e.target.value)} className={inputCls}>
                    <option value="">All industries</option>
                    {INDUSTRIES.map((i) => (
                      <option key={i} value={i}>{i}</option>
                    ))}
                  </select>
                </div>

                {/* Salary range */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Salary (₱)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      value={salaryMin}
                      onChange={(e) => setSalaryMin(e.target.value)}
                      placeholder="Min"
                      className={inputCls}
                    />
                    <span className="text-gray-400 text-xs">–</span>
                    <input
                      type="number"
                      min="0"
                      value={salaryMax}
                      onChange={(e) => setSalaryMax(e.target.value)}
                      placeholder="Max"
                      className={inputCls}
                    />
                  </div>
                </div>
              </div>

              {activeCount > 0 && (
                <div className="mt-3 flex justify-end">
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                  >
                    <X size={12} /> Clear filters
                  </button>
                </div>
              )}
            </div>
          )}
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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Showing <span className="font-semibold text-gray-900 dark:text-gray-100">{total}</span>
                {keyword ? ` result${total !== 1 ? "s" : ""} for "${keyword}"` : ` job${total !== 1 ? "s" : ""}`}
                {activeCount > 0 && <span className="text-gray-400"> · {activeCount} filter{activeCount !== 1 ? "s" : ""} applied</span>}
              </p>
              <label className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="hidden sm:inline">Sort by</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="px-3 py-1.5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </label>
            </div>

            {jobs.length === 0 ? (
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm py-20 text-center">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">No jobs found</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                <div className="hidden md:grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-6 py-3 border-b border-gray-100 dark:border-gray-800 items-center">
                  <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide">Job</span>
                  <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide w-24 text-center">Type</span>
                  <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide w-40">Location</span>
                  <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide w-28">Salary</span>
                  <span className="w-28" />
                </div>

                <div className="divide-y divide-gray-50 dark:divide-gray-800">
                  {jobs.map((job) => {
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

                        <div className="flex items-center gap-2 md:w-28 md:justify-end">
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
                          <button
                            type="button"
                            onClick={() => toggleSave(job._id)}
                            title={savedIds.has(job._id) ? "Remove from saved" : "Save job"}
                            aria-label={savedIds.has(job._id) ? "Remove from saved" : "Save job"}
                            className={`ml-auto md:ml-0 inline-flex items-center justify-center w-7 h-7 rounded-lg border transition-colors ${
                              savedIds.has(job._id)
                                ? "border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950"
                                : "border-gray-200 dark:border-gray-700 text-gray-400 hover:text-emerald-600 hover:border-emerald-200 dark:hover:border-emerald-800"
                            }`}
                          >
                            <Bookmark size={13} fill={savedIds.has(job._id) ? "currentColor" : "none"} />
                          </button>
                          <Link
                            to={`/jobs/${job._id}`}
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950 hover:bg-emerald-100 dark:hover:bg-emerald-900 px-3 py-1.5 rounded-lg transition-colors"
                          >
                            Apply
                            <ArrowUpRight size={12} />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="px-6 py-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, total)} of {total} job{total !== 1 ? "s" : ""}
                  </p>
                  {totalPages > 1 && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page <= 1}
                        className="inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40 disabled:pointer-events-none transition-colors"
                      >
                        <ChevronLeft size={13} /> Prev
                      </button>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Page {page} of {totalPages}
                      </span>
                      <button
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page >= totalPages}
                        className="inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40 disabled:pointer-events-none transition-colors"
                      >
                        Next <ChevronRight size={13} />
                      </button>
                    </div>
                  )}
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
