import { Link } from "react-router-dom";
import { Briefcase, PlusCircle } from "lucide-react";

const MyJobsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">My Jobs</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Jobs you have posted</p>
        </div>
        <Link
          to="/employer/jobs/create"
          className="inline-flex items-center gap-2 text-sm bg-emerald-600 text-white px-4 py-2 rounded-xl hover:bg-emerald-700 transition-colors"
        >
          <PlusCircle size={15} />
          Post a Job
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-4">
            <Briefcase size={22} className="text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">No jobs posted yet</h3>
          <p className="text-xs text-gray-400 dark:text-gray-500 max-w-xs mb-5">
            Post your first job listing to start attracting qualified candidates.
          </p>
          <Link
            to="/employer/jobs/create"
            className="inline-flex items-center gap-2 bg-emerald-600 text-white text-sm px-5 py-2.5 rounded-xl hover:bg-emerald-700 transition-colors"
          >
            <PlusCircle size={14} />
            Post a Job
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyJobsPage;

