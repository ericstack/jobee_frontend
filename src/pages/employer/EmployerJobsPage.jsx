import { useState } from "react";
import { Link } from "react-router-dom";
import useJobs from "../../hooks/useJobs";
import { deleteJob } from "../../api/jobsApi";
import CreateJobModal from "../../components/jobs/CreateJobModal";
import EditJobModal from "../../components/jobs/EditJobModal";
import ConfirmModal from "../../components/ui/ConfirmModal";
import { PlusCircle, Briefcase, MapPin, Banknote, ChevronRight, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const TYPE_STYLES = {
  Permanent: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  Temporary:  "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  Internship: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
};

const EmployerJobsPage = () => {
  const { jobs, loading, fetchJobs } = useJobs();
  const [createOpen, setCreateOpen] = useState(false);
  const [editJob, setEditJob]       = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const handleDelete = async () => {
    await deleteJob(deleteTarget._id);
    toast.success("Job deleted");
    setDeleteTarget(null);
    fetchJobs();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">My Job Listings</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage and track your posted jobs</p>
        </div>
        <button
          onClick={() => setCreateOpen(true)}
          className="inline-flex items-center gap-2 text-sm bg-emerald-600 text-white px-4 py-2 rounded-xl hover:bg-emerald-700 transition-colors"
        >
          <PlusCircle size={15} />
          Post a Job
        </button>
      </div>

      {loading ? (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="px-6 py-4 flex items-center gap-4 animate-pulse">
                <div className="w-9 h-9 bg-gray-100 dark:bg-gray-800 rounded-lg shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3.5 bg-gray-100 dark:bg-gray-800 rounded w-1/3" />
                  <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-1/4" />
                </div>
                <div className="h-5 bg-gray-100 dark:bg-gray-800 rounded w-20" />
                <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-28" />
                <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-20" />
                <div className="h-7 bg-gray-100 dark:bg-gray-800 rounded w-20" />
              </div>
            ))}
          </div>
        </div>
      ) : jobs?.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center justify-center py-20 text-center">
          <div className="w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-4">
            <Briefcase size={22} className="text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">No jobs posted yet</h3>
          <p className="text-xs text-gray-400 dark:text-gray-500 max-w-xs mb-5">
            Start attracting talent by creating your first job listing.
          </p>
          <button
            onClick={() => setCreateOpen(true)}
            className="inline-flex items-center gap-2 bg-emerald-600 text-white text-sm px-5 py-2.5 rounded-xl hover:bg-emerald-700 transition-colors"
          >
            <PlusCircle size={14} /> Post a Job
          </button>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 items-center">
            <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide">Job</span>
            <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide w-24 text-center">Type</span>
            <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide w-36">Location</span>
            <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide w-24">Salary</span>
            <span className="w-24" />
          </div>

          <div className="divide-y divide-gray-50 dark:divide-gray-800">
            {jobs.map((job) => {
              const initials = job.company?.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase() || "?";
              return (
                <div
                  key={job._id}
                  className="px-6 py-4 grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 items-center hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-xs font-bold shrink-0">
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{job.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{job.company}</p>
                    </div>
                  </div>

                  <span className={`w-24 text-center inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-medium ${TYPE_STYLES[job.jobType] || "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"}`}>
                    {job.jobType || "—"}
                  </span>

                  <div className="w-36 flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 truncate">
                    <MapPin size={12} className="shrink-0" />
                    <span className="truncate">{job.address || "—"}</span>
                  </div>

                  <div className="w-24 flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                    <Banknote size={12} className="shrink-0" />
                    <span>{job.salary ? `P${Number(job.salary).toLocaleString()}` : "—"}</span>
                  </div>

                  <div className="w-24 flex items-center justify-end gap-1">
                    <button
                      onClick={() => setEditJob(job)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-colors"
                      title="Edit"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(job)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                    <Link
                      to={`/employer/jobs/${job._id}`}
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-colors"
                      title="View"
                    >
                      <ChevronRight size={15} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="px-6 py-3 border-t border-gray-100 dark:border-gray-800">
            <p className="text-xs text-gray-400 dark:text-gray-500">{jobs.length} listing{jobs.length !== 1 ? "s" : ""}</p>
          </div>
        </div>
      )}

      <CreateJobModal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        onSuccess={fetchJobs}
      />

      <EditJobModal
        isOpen={!!editJob}
        onClose={() => setEditJob(null)}
        job={editJob}
        onSuccess={fetchJobs}
      />

      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete Job Posting"
        description={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        confirmLabel="Delete Job"
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default EmployerJobsPage;
