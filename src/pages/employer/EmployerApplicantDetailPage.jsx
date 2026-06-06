import { useParams, useNavigate, Link } from "react-router-dom";
import useApplication from "../../hooks/useApplication";
import { updateApplicationStatus } from "../../api/applicationsApi";
import toast from "react-hot-toast";
import { useState } from "react";
import {
  ArrowLeft, Mail, Phone, FileText, Briefcase, MapPin,
  CheckCircle2, XCircle, Clock, UserCheck, Trophy, ExternalLink,
} from "lucide-react";

const STATUS_STYLES = {
  pending:     "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800",
  shortlisted: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800",
  interview:   "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-400 dark:border-purple-800",
  hired:       "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800",
  rejected:    "bg-red-50 text-red-600 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-900",
};

const STATUS_ICONS = {
  pending:     Clock,
  shortlisted: UserCheck,
  interview:   Briefcase,
  hired:       Trophy,
  rejected:    XCircle,
};

const PIPELINE = [
  { key: "pending",     label: "Applied" },
  { key: "shortlisted", label: "Shortlisted" },
  { key: "interview",   label: "Interview" },
  { key: "hired",       label: "Hired" },
];

const PIPELINE_ORDER = ["pending", "shortlisted", "interview", "hired"];

const Skeleton = () => (
  <div className="space-y-6 animate-pulse">
    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-24" />
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-5">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 space-y-4">
          <div className="flex gap-4">
            <div className="w-14 h-14 rounded-full bg-gray-200 dark:bg-gray-800" />
            <div className="flex-1 space-y-2">
              <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-1/3" />
              <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 space-y-3">
          {[...Array(5)].map((_, i) => <div key={i} className="h-3 bg-gray-200 dark:bg-gray-800 rounded" />)}
        </div>
      </div>
      <div className="space-y-5">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 h-48" />
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 h-32" />
      </div>
    </div>
  </div>
);

const EmployerApplicantDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { application, setApplication, loading, error } = useApplication(id);
  const [updating, setUpdating] = useState(false);

  const handleStatusChange = async (status) => {
    setUpdating(true);
    try {
      const data = await updateApplicationStatus(id, status);
      setApplication((prev) => ({ ...prev, status, ...(data.application || {}) }));
      toast.success(`Status updated to ${status}`);
    } catch {
      toast.error("Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <Skeleton />;

  if (error || !application) {
    return (
      <div className="py-20 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">Application not found.</p>
        <Link to="/employer/applicants" className="mt-4 inline-flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 hover:underline">
          <ArrowLeft size={14} /> Back to Applicants
        </Link>
      </div>
    );
  }

  const { user, job, status = "pending", coverLetter, resume, createdAt } = application;
  const initials = user?.name?.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase() || "?";
  const appliedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" })
    : null;

  const currentIdx = PIPELINE_ORDER.indexOf(status);
  const StatusIcon = STATUS_ICONS[status] || Clock;

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
      >
        <ArrowLeft size={14} /> Back to Applicants
      </button>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-5">
          {/* Applicant profile card */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-xl font-bold shrink-0">
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">{user?.name || "Unknown Applicant"}</h1>
                <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {user?.email && (
                    <a href={`mailto:${user.email}`} className="flex items-center gap-1.5 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                      <Mail size={13} />{user.email}
                    </a>
                  )}
                  {user?.phone && (
                    <a href={`tel:${user.phone}`} className="flex items-center gap-1.5 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                      <Phone size={13} />{user.phone}
                    </a>
                  )}
                </div>
                {appliedDate && (
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 flex items-center gap-1.5">
                    <Clock size={11} />Applied {appliedDate}
                  </p>
                )}
              </div>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border capitalize shrink-0 ${STATUS_STYLES[status] || ""}`}>
                <StatusIcon size={12} />{status}
              </span>
            </div>
          </div>

          {/* Cover letter */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
              <FileText size={14} className="text-gray-400" />
              Cover Letter
            </h2>
            {coverLetter ? (
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">{coverLetter}</p>
            ) : (
              <p className="text-sm text-gray-400 dark:text-gray-500 italic">No cover letter provided.</p>
            )}
          </div>

          {/* Resume */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
              <Briefcase size={14} className="text-gray-400" />
              Resume / CV
            </h2>
            {resume ? (
              <a
                href={resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 rounded-xl text-sm font-medium hover:bg-emerald-100 dark:hover:bg-emerald-900 transition-colors"
              >
                <FileText size={14} />
                View Resume
                <ExternalLink size={12} />
              </a>
            ) : (
              <p className="text-sm text-gray-400 dark:text-gray-500 italic">No resume uploaded.</p>
            )}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Status management */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">Application Status</h2>

            {/* Pipeline tracker */}
            <div className="flex items-center gap-1 mb-5">
              {PIPELINE.map((step, idx) => {
                const isCompleted = currentIdx > idx;
                const isActive = currentIdx === idx && status !== "rejected";
                return (
                  <div key={step.key} className="flex-1 flex flex-col items-center gap-1">
                    <div className={`w-full h-1.5 rounded-full transition-colors ${
                      isCompleted || isActive
                        ? "bg-emerald-500 dark:bg-emerald-400"
                        : "bg-gray-200 dark:bg-gray-700"
                    }`} />
                    <span className={`text-[10px] font-medium ${
                      isCompleted || isActive ? "text-emerald-600 dark:text-emerald-400" : "text-gray-400 dark:text-gray-500"
                    }`}>{step.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Action buttons */}
            <div className="space-y-2">
              {status === "pending" && (
                <>
                  <button
                    disabled={updating}
                    onClick={() => handleStatusChange("shortlisted")}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors"
                  >
                    <UserCheck size={14} /> Shortlist Applicant
                  </button>
                  <button
                    disabled={updating}
                    onClick={() => handleStatusChange("rejected")}
                    className="w-full flex items-center justify-center gap-2 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 disabled:opacity-60 text-sm font-medium px-4 py-2.5 rounded-xl transition-colors"
                  >
                    <XCircle size={14} /> Reject
                  </button>
                </>
              )}

              {status === "shortlisted" && (
                <>
                  <button
                    disabled={updating}
                    onClick={() => handleStatusChange("interview")}
                    className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-60 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors"
                  >
                    <Briefcase size={14} /> Schedule Interview
                  </button>
                  <button
                    disabled={updating}
                    onClick={() => handleStatusChange("rejected")}
                    className="w-full flex items-center justify-center gap-2 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 disabled:opacity-60 text-sm font-medium px-4 py-2.5 rounded-xl transition-colors"
                  >
                    <XCircle size={14} /> Reject
                  </button>
                </>
              )}

              {status === "interview" && (
                <>
                  <button
                    disabled={updating}
                    onClick={() => handleStatusChange("hired")}
                    className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors"
                  >
                    <Trophy size={14} /> Mark as Hired
                  </button>
                  <button
                    disabled={updating}
                    onClick={() => handleStatusChange("rejected")}
                    className="w-full flex items-center justify-center gap-2 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 disabled:opacity-60 text-sm font-medium px-4 py-2.5 rounded-xl transition-colors"
                  >
                    <XCircle size={14} /> Reject
                  </button>
                </>
              )}

              {status === "hired" && (
                <div className="flex items-center gap-2 p-3 bg-emerald-50 dark:bg-emerald-950 rounded-xl">
                  <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <p className="text-sm text-emerald-700 dark:text-emerald-300 font-medium">Hired</p>
                </div>
              )}

              {status === "rejected" && (
                <>
                  <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950 rounded-xl mb-2">
                    <XCircle size={16} className="text-red-500 dark:text-red-400 shrink-0" />
                    <p className="text-sm text-red-600 dark:text-red-400 font-medium">Application Rejected</p>
                  </div>
                  <button
                    disabled={updating}
                    onClick={() => handleStatusChange("pending")}
                    className="w-full flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-60 text-sm font-medium px-4 py-2.5 rounded-xl transition-colors"
                  >
                    Revert to Pending
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Job info */}
          {job && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
              <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Applied Position</h2>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-xs font-bold shrink-0">
                  {job.company?.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase() || "?"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{job.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{job.company}</p>
                  {job.address && (
                    <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1 mt-1">
                      <MapPin size={10} />{job.address}
                    </p>
                  )}
                </div>
              </div>
              <Link
                to={`/employer/jobs/${job._id}`}
                className="mt-3 inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                View job <ExternalLink size={11} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployerApplicantDetailPage;
