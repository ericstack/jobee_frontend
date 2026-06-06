import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import useJob from "../../hooks/useJob";
import { deleteJob } from "../../api/jobsApi";
import EditJobModal from "../../components/jobs/EditJobModal";
import ConfirmModal from "../../components/ui/ConfirmModal";
import toast from "react-hot-toast";
import {
  ArrowLeft, MapPin, Banknote, GraduationCap, Briefcase,
  Users, Clock, Tag, Pencil, Trash2, FileText, UserCheck, Trophy,
} from "lucide-react";

const TYPE_STYLES = {
  Permanent: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  Temporary:  "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  Internship: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
};

const Detail = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0 mt-0.5">
      <Icon size={13} className="text-gray-500 dark:text-gray-400" />
    </div>
    <div>
      <p className="text-xs text-gray-400 dark:text-gray-500">{label}</p>
      <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mt-0.5">{value}</p>
    </div>
  </div>
);

const StatPill = ({ icon: Icon, label, value, color }) => (
  <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm px-5 py-4 flex items-center gap-3">
    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
      <Icon size={16} />
    </div>
    <div>
      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 leading-none">{value}</p>
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{label}</p>
    </div>
  </div>
);

const Skeleton = () => (
  <div className="space-y-6 animate-pulse">
    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-20" />
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 space-y-3">
      <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-1/3" />
      <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4" />
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => <div key={i} className="h-20 bg-gray-200 dark:bg-gray-800 rounded-xl" />)}
    </div>
  </div>
);

const EmployerJobDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { job, setJob, loading, error } = useJob(id);
  console.log(job);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleDelete = async () => {
    await deleteJob(id);
    toast.success("Job deleted");
    setDeleteOpen(false);
    navigate("/employer/jobs");
  };

  if (loading) return <Skeleton />;

  if (error || !job) {
    return (
      <div className="py-20 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">Job not found or unavailable.</p>
        <Link to="/employer/jobs" className="mt-4 inline-flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 hover:underline">
          <ArrowLeft size={14} /> Back to My Jobs
        </Link>
      </div>
    );
  }

  const initials = job.company?.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase() || "?";
  const industries = Array.isArray(job.industry) ? job.industry : job.industry ? [job.industry] : [];
  const postedAt = (job.postingDate || job.createdAt)
    ? new Date(job.postingDate || job.createdAt).toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" })
    : null;

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
      >
        <ArrowLeft size={14} /> Back to My Jobs
      </button>

      {/* Header */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 min-w-0">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-lg font-bold shrink-0">
              {initials}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">{job.title}</h1>
                {job.jobType && (
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${TYPE_STYLES[job.jobType] || "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"}`}>
                    {job.jobType}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{job.company}</p>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-400 dark:text-gray-500">
                {job.address && <span className="flex items-center gap-1"><MapPin size={11} />{job.address}</span>}
                {postedAt && <span className="flex items-center gap-1"><Clock size={11} />Posted {postedAt}</span>}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setEditOpen(true)}
              className="inline-flex items-center gap-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 text-sm px-3 py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <Pencil size={14} /> Edit
            </button>
            <button
              onClick={() => setDeleteOpen(true)}
              className="inline-flex items-center gap-2 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-sm px-3 py-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
            >
              <Trash2 size={14} /> Delete
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatPill icon={FileText}   label="Applications" value="0" color="bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400" />
        <StatPill icon={UserCheck}  label="Shortlisted"  value="0" color="bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400" />
        <StatPill icon={Clock}      label="Interviews"   value="0" color="bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400" />
        <StatPill icon={Trophy}     label="Hired"        value="0" color="bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">Job Description</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
              {job.description || "No description provided."}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Applicants</h2>
              <Link to="/employer/applicants" className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline">
                View all
              </Link>
            </div>
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="w-11 h-11 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-3">
                <Users size={18} className="text-gray-400 dark:text-gray-500" />
              </div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">No applicants yet</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Applications will appear here once candidates apply.</p>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 space-y-4">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Job Details</h2>
            {job.address      && <Detail icon={MapPin}       label="Location"         value={job.address} />}
            {job.salary       && <Detail icon={Banknote}     label="Monthly Salary"   value={`P${Number(job.salary).toLocaleString()}`} />}
            {job.jobType      && <Detail icon={Briefcase}    label="Employment Type"  value={job.jobType} />}
            {job.minEducation && <Detail icon={GraduationCap} label="Min. Education"  value={job.minEducation} />}
            {job.experience   && <Detail icon={Clock}        label="Experience"       value={job.experience} />}
            {job.positions    && <Detail icon={Users}        label="Vacancies"        value={`${job.positions} open position${job.positions > 1 ? "s" : ""}`} />}
          </div>

          {industries.length > 0 && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
              <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Industries</h2>
              <div className="flex flex-wrap gap-2">
                {industries.map((ind) => (
                  <span key={ind} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium">
                    <Tag size={10} />{ind}
                  </span>
                ))}
              </div>
            </div>
          )}

          {job.email && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
              <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Contact</h2>
              <p className="text-sm text-emerald-600 dark:text-emerald-400">{job.email}</p>
            </div>
          )}
        </div>
      </div>

      <EditJobModal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        job={job}
        onSuccess={(updated) => setJob((prev) => ({ ...prev, ...updated }))}
      />

      <ConfirmModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="Delete Job Posting"
        description={`Are you sure you want to delete "${job.title}"? This action cannot be undone.`}
        confirmLabel="Delete Job"
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default EmployerJobDetailPage;
