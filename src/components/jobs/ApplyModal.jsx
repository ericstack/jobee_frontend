import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { applyToJob } from "../../api/applicationsApi";
import toast from "react-hot-toast";
import { X, Send, CheckCircle2, FileText, ArrowRight, Upload } from "lucide-react";

const TYPE_STYLES = {
  Permanent: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  Temporary:  "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  Internship: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
};

const ApplyModal = ({ isOpen, onClose, job, onSuccess }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();
  const [submitted, setSubmitted] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);

  useEffect(() => {
    if (!isOpen) { reset(); setSubmitted(false); setResumeFile(null); }
  }, [isOpen, reset]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    if (isOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen || !job) return null;

  const initials = job.company?.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase() || "?";

  const onSubmit = async ({ coverLetter }) => {
    const formData = new FormData();
    formData.append("jobId", job._id);
    if (coverLetter) formData.append("coverLetter", coverLetter);
    if (resumeFile) formData.append("file", resumeFile);
    try {
      await applyToJob(job._id, formData);
      setSubmitted(true);
      onSuccess?.();
    } catch (err) {
      const msg = err.response?.data?.message || "";
      if (err.response?.status === 400 && msg.toLowerCase().includes("already")) {
        toast.error("You have already applied for this job.");
        onSuccess?.();
        onClose();
      } else {
        toast.error(msg || "Failed to submit application. Please try again.");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg flex flex-col bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
            {submitted ? "Application Submitted" : "Apply for this Job"}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {submitted ? (
          /* ── Success state ── */
          <div className="px-6 py-10 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950 rounded-2xl flex items-center justify-center mb-4">
              <CheckCircle2 size={28} className="text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">You're all set!</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Your application for <span className="font-medium text-gray-800 dark:text-gray-200">{job.title}</span> at
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-6">{job.company}</p>
            <div className="flex gap-3 w-full">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Continue Browsing
              </button>
              <button
                onClick={() => { onClose(); navigate("/dashboard/applications"); }}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors"
              >
                My Applications <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ) : (
          /* ── Apply form ── */
          <>
            <div className="px-6 py-5 space-y-5 overflow-y-auto">
              {/* Job summary */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-xs font-bold shrink-0">
                  {initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">{job.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{job.company}</p>
                </div>
                {job.jobType && (
                  <span className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-medium ${TYPE_STYLES[job.jobType] || "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"}`}>
                    {job.jobType}
                  </span>
                )}
              </div>

              {/* Cover letter */}
              <form id="apply-form" onSubmit={handleSubmit(onSubmit)}>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Cover Letter <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <div className="relative">
                  <FileText size={14} className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" />
                  <textarea
                    {...register("coverLetter")}
                    rows={6}
                    placeholder="Introduce yourself and explain why you're a great fit for this role…"
                    className="w-full pl-9 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none transition"
                  />
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5">
                  A personalised cover letter significantly increases your chances.
                </p>

                {/* Resume upload */}
                <div className="mt-4">
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Resume / CV <span className="text-gray-400 font-normal">(PDF only, max 2 MB)</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:border-emerald-400 dark:hover:border-emerald-600 transition-colors group">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950 transition-colors">
                      <Upload size={14} className="text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      {resumeFile ? (
                        <p className="text-sm text-gray-900 dark:text-gray-100 truncate">{resumeFile.name}</p>
                      ) : (
                        <p className="text-sm text-gray-400 dark:text-gray-500">Click to upload your resume…</p>
                      )}
                    </div>
                    {resumeFile && (
                      <button
                        type="button"
                        onClick={(e) => { e.preventDefault(); setResumeFile(null); }}
                        className="w-5 h-5 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shrink-0"
                      >
                        <X size={11} />
                      </button>
                    )}
                    <input
                      type="file"
                      accept=".pdf"
                      className="sr-only"
                      onChange={(e) => setResumeFile(e.target.files[0] || null)}
                    />
                  </label>
                </div>
              </form>
            </div>

            <div className="flex items-center gap-3 px-6 py-4 border-t border-gray-100 dark:border-gray-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-sm text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="apply-form"
                disabled={isSubmitting}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
              >
                <Send size={14} />
                {isSubmitting ? "Submitting…" : "Submit Application"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ApplyModal;
