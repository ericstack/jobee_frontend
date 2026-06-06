import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import useJob from "../../hooks/useJob";
import ApplyModal from "../../components/jobs/ApplyModal";
import {
  ArrowLeft, MapPin, Banknote, GraduationCap, Briefcase,
  Users, Clock, Building2, Tag, Send, CheckCircle2,
} from "lucide-react";

const TYPE_STYLES = {
  Permanent: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  Temporary:  "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  Internship: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
};

const Detail = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0 mt-0.5">
      <Icon size={14} className="text-gray-500 dark:text-gray-400" />
    </div>
    <div>
      <p className="text-xs text-gray-400 dark:text-gray-500">{label}</p>
      <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mt-0.5">{value}</p>
    </div>
  </div>
);

const Skeleton = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
    <Navbar />
    <div className="max-w-5xl mx-auto px-6 py-10 animate-pulse space-y-6">
      <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-24" />
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-8 space-y-4">
        <div className="flex gap-4">
          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
          <div className="space-y-2 flex-1">
            <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-1/3" />
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4" />
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-8 space-y-3">
          {[...Array(6)].map((_, i) => <div key={i} className="h-3 bg-gray-200 dark:bg-gray-800 rounded" />)}
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 space-y-4">
          {[...Array(5)].map((_, i) => <div key={i} className="h-10 bg-gray-200 dark:bg-gray-800 rounded-lg" />)}
        </div>
      </div>
    </div>
  </div>
);

const JobDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { job, loading, error } = useJob(id);
  const [applyOpen, setApplyOpen] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  if (loading) return <Skeleton />;

  if (error || !job) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Navbar />
        <div className="max-w-5xl mx-auto px-6 py-20 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">Job not found or unavailable.</p>
          <Link to="/jobs" className="mt-4 inline-flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 hover:underline">
            <ArrowLeft size={14} /> Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  const initials = job.company?.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase() || "?";
  const industries = Array.isArray(job.industry) ? job.industry : job.industry ? [job.industry] : [];
  const postedAt = (job.postingDate || job.createdAt)
    ? new Date(job.postingDate || job.createdAt).toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" })
    : null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 mb-6 transition-colors"
        >
          <ArrowLeft size={14} /> Back
        </button>

        {/* Header card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-8 mb-6">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-xl font-bold shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{job.title}</h1>
                {job.jobType && (
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${TYPE_STYLES[job.jobType] || "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"}`}>
                    {job.jobType}
                  </span>
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{job.company}</p>
              <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-gray-400 dark:text-gray-500">
                {job.address && <span className="flex items-center gap-1.5"><MapPin size={12} />{job.address}</span>}
                {job.salary  && <span className="flex items-center gap-1.5"><Banknote size={12} />P{Number(job.salary).toLocaleString()} / month</span>}
                {postedAt    && <span className="flex items-center gap-1.5"><Clock size={12} />Posted {postedAt}</span>}
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-8">
              <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">Job Description</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                {job.description || "No description provided."}
              </p>
            </div>

            {industries.length > 0 && (
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-8">
                <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">Industries</h2>
                <div className="flex flex-wrap gap-2">
                  {industries.map((ind) => (
                    <span key={ind} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium">
                      <Tag size={11} />{ind}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Apply card */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
              {hasApplied ? (
                <div className="flex items-center gap-3 p-3 bg-emerald-50 dark:bg-emerald-950 rounded-xl mb-4">
                  <CheckCircle2 size={18} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Application Submitted</p>
                    <p className="text-xs text-emerald-600/70 dark:text-emerald-400/70 mt-0.5">We'll notify you of any updates.</p>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setApplyOpen(true)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-5 py-3 rounded-xl transition-colors mb-4"
                >
                  <Send size={14} />
                  Apply Now
                </button>
              )}
              {job.email && (
                <a
                  href={`mailto:${job.email}`}
                  className="w-full inline-flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 text-sm px-5 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Email Employer
                </a>
              )}
            </div>

            {/* Job info card */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 space-y-4">
              <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Job Details</h2>
              {job.address      && <Detail icon={MapPin}        label="Location"        value={job.address} />}
              {job.salary       && <Detail icon={Banknote}      label="Monthly Salary"  value={`P${Number(job.salary).toLocaleString()}`} />}
              {job.jobType      && <Detail icon={Briefcase}     label="Employment Type" value={job.jobType} />}
              {job.minEducation && <Detail icon={GraduationCap} label="Min. Education"  value={job.minEducation} />}
              {job.experience   && <Detail icon={Clock}         label="Experience"      value={job.experience} />}
              {job.positions    && <Detail icon={Users}         label="Vacancies"       value={`${job.positions} open position${job.positions > 1 ? "s" : ""}`} />}
              {job.company      && <Detail icon={Building2}     label="Company"         value={job.company} />}
            </div>
          </div>
        </div>
      </div>

      <ApplyModal
        isOpen={applyOpen}
        onClose={() => setApplyOpen(false)}
        job={job}
        onSuccess={() => setHasApplied(true)}
      />
    </div>
  );
};

export default JobDetailPage;
