import { Link } from "react-router-dom";
import { MapPin, Banknote, Clock, ArrowRight } from "lucide-react";

const TYPE_STYLES = {
  Permanent:  "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
  Temporary:  "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
  Internship: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
};

const JobCard = ({ job }) => {
  const initials = job.company
    ? job.company.slice(0, 2).toUpperCase()
    : "??";

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-emerald-200 dark:hover:border-emerald-800 transition-all group p-5 flex flex-col">

      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-xs font-bold shrink-0">
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
            {job.title}
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">{job.company}</p>
        </div>
        {job.jobType && (
          <span className={`shrink-0 text-xs px-2.5 py-1 rounded-full font-medium ${TYPE_STYLES[job.jobType] || "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"}`}>
            {job.jobType}
          </span>
        )}
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 leading-relaxed flex-1">
        {job.description}
      </p>

      <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-5">
        {job.address && (
          <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
            <MapPin size={11} /> {job.address}
          </span>
        )}
        {job.salary && (
          <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
            <Banknote size={11} /> ₱{Number(job.salary).toLocaleString()}
          </span>
        )}
        {job.experience && (
          <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
            <Clock size={11} /> {job.experience}
          </span>
        )}
      </div>

      <Link
        to={`/jobs/${job._id}`}
        className="inline-flex items-center justify-center gap-1.5 w-full text-xs font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 hover:bg-emerald-100 dark:hover:bg-emerald-900 py-2.5 rounded-xl transition-colors"
      >
        View Details <ArrowRight size={12} />
      </Link>

    </div>
  );
};

export default JobCard;

