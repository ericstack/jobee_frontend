import { Briefcase, Search, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import useJobs from "../../hooks/useJobs";

const TYPE_STYLES = {
  Permanent:  "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
  Temporary:  "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
  Internship: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
};

const AdminJobsPage = () => {
  const { jobs, loading } = useJobs();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">All Jobs</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Review and manage all job listings on the platform</p>
        </div>
        <Link
          to="/admin/jobs/create"
          className="inline-flex items-center gap-2 text-sm bg-emerald-600 text-white px-4 py-2 rounded-xl hover:bg-emerald-700 transition-colors"
        >
          <PlusCircle size={15} />
          Post a Job
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="p-4 border-b border-gray-100 dark:border-gray-800">
          <div className="relative max-w-sm">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search jobs…"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
        </div>

        {loading ? (
          <div className="p-6 space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-4">
              <Briefcase size={22} className="text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">No jobs yet</h3>
            <p className="text-xs text-gray-400 dark:text-gray-500 max-w-xs">
              Job listings created by employers will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Company</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Salary</th>
                  <th className="px-6 py-4" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                {jobs.map((job) => (
                  <tr key={job._id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">{job.title}</td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{job.company}</td>
                    <td className="px-6 py-4">
                      {job.type && (
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${TYPE_STYLES[job.type] || "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"}`}>
                          {job.type}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                      {job.salary ? `₱${Number(job.salary).toLocaleString()}` : "—"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-xs text-red-500 dark:text-red-400 hover:underline">Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminJobsPage;

