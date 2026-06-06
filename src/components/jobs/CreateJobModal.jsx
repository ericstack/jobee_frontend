import { useForm } from "react-hook-form";
import { createJob } from "../../api/jobsApi";
import toast from "react-hot-toast";
import { X, Briefcase, Building2, Mail, MapPin, Banknote, FileText, Users } from "lucide-react";
import { useEffect } from "react";

const Field = ({ label, children, hint }) => (
  <div>
    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
    {children}
    {hint && <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{hint}</p>}
  </div>
);

const inputClass =
  "w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition";

const CreateJobModal = ({ isOpen, onClose, onSuccess }) => {
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

  useEffect(() => {
    if (!isOpen) reset();
  }, [isOpen, reset]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    if (isOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const onSubmit = async (formData) => {
    try {
      await createJob(formData);
      toast.success("Job posted successfully");
      reset();
      onClose();
      onSuccess?.();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to post job");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 shrink-0">
          <div>
            <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">Post a Job</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Fill in the details to attract the right candidates</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 px-6 py-5">
          <form id="create-job-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-4">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Basic Information</p>

              <Field label="Job Title">
                <div className="relative">
                  <Briefcase size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                  <input
                    type="text"
                    placeholder="e.g. Senior Software Engineer"
                    {...register("title", { required: true })}
                    className={`${inputClass} pl-9`}
                  />
                </div>
              </Field>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Company Name">
                  <div className="relative">
                    <Building2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                    <input
                      type="text"
                      placeholder="Your company name"
                      {...register("company", { required: true })}
                      className={`${inputClass} pl-9`}
                    />
                  </div>
                </Field>

                <Field label="Contact Email">
                  <div className="relative">
                    <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                    <input
                      type="email"
                      placeholder="hr@company.com"
                      {...register("email", { required: true })}
                      className={`${inputClass} pl-9`}
                    />
                  </div>
                </Field>
              </div>

              <Field label="Location / Address">
                <div className="relative">
                  <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                  <input
                    type="text"
                    placeholder="e.g. Makati City, Metro Manila"
                    {...register("address", { required: true })}
                    className={`${inputClass} pl-9`}
                  />
                </div>
              </Field>

              <Field label="Job Description">
                <div className="relative">
                  <FileText size={14} className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500" />
                  <textarea
                    placeholder="Describe the role, responsibilities, and what you're looking for…"
                    rows={4}
                    {...register("description", { required: true })}
                    className={`${inputClass} pl-9 resize-none`}
                  />
                </div>
              </Field>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Job Details</p>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Industry">
                  <select
                    {...register("industry", { required: true })}
                    multiple
                    className={`${inputClass} h-28`}
                  >
                    <option value="Business">Business</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Banking">Banking</option>
                    <option value="Education/Training">Education / Training</option>
                    <option value="Telecommunication">Telecommunication</option>
                    <option value="Others">Others</option>
                  </select>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Hold Ctrl/Cmd for multiple</p>
                </Field>

                <Field label="Employment Type">
                  <select {...register("jobType", { required: true })} className={inputClass}>
                    <option value="">Select type…</option>
                    <option value="Permanent">Permanent</option>
                    <option value="Temporary">Temporary</option>
                    <option value="Internship">Internship</option>
                  </select>
                </Field>

                <Field label="Minimum Education">
                  <select {...register("minEducation", { required: true })} className={inputClass}>
                    <option value="">Select education…</option>
                    <option value="Bachelors">Bachelor's Degree</option>
                    <option value="Masters">Master's Degree</option>
                    <option value="PhD">PhD</option>
                  </select>
                </Field>

                <Field label="Experience Required">
                  <select {...register("experience", { required: true })} className={inputClass}>
                    <option value="">Select experience…</option>
                    <option value="No Experience">No Experience</option>
                    <option value="1-2 years experience">1-2 years</option>
                    <option value="2-5 years experience">2-5 years</option>
                    <option value="5 years experience">5+ years</option>
                  </select>
                </Field>

                <Field label="Monthly Salary (PHP)">
                  <div className="relative">
                    <Banknote size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                    <input
                      type="number"
                      placeholder="e.g. 35000"
                      {...register("salary", { required: true })}
                      className={`${inputClass} pl-9`}
                    />
                  </div>
                </Field>

                <Field label="No. of Vacancies" hint="Default is 1">
                  <div className="relative">
                    <Users size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                    <input
                      type="number"
                      placeholder="1"
                      {...register("positions")}
                      className={`${inputClass} pl-9`}
                    />
                  </div>
                </Field>
              </div>
            </div>
          </form>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 dark:border-gray-800 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="create-job-form"
            disabled={isSubmitting}
            className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            {isSubmitting ? "Posting…" : "Post Job"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateJobModal;
