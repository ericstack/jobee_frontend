import { useForm } from "react-hook-form";
import { createJob } from "../../api/jobsApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Briefcase, Building2, Mail, MapPin, Banknote, FileText, Users } from "lucide-react";

const Field = ({ label, children, hint }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{label}</label>
    {children}
    {hint && <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{hint}</p>}
  </div>
);

const inputClass =
  "w-full px-3.5 py-2.5 border border-gray-300 dark:border-gray-700 rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition";

const CreateJobPage = () => {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    try {
      await createJob(formData);
      toast.success("Job posted successfully");
      navigate("/employer/jobs");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to post job");
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Post a Job</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Fill in the details below to attract the right candidates</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 space-y-5">
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-gray-800 pb-3 -mx-6 px-6">
            Basic Information
          </h2>

          <Field label="Job Title">
            <div className="relative">
              <Briefcase size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="e.g. Senior Software Engineer"
                {...register("title", { required: true })}
                className={`${inputClass} pl-10`}
              />
            </div>
          </Field>

          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Company Name">
              <div className="relative">
                <Building2 size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  placeholder="Your company name"
                  {...register("company", { required: true })}
                  className={`${inputClass} pl-10`}
                />
              </div>
            </Field>

            <Field label="Contact Email">
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <input
                  type="email"
                  placeholder="hr@company.com"
                  {...register("email", { required: true })}
                  className={`${inputClass} pl-10`}
                />
              </div>
            </Field>
          </div>

          <Field label="Location / Address">
            <div className="relative">
              <MapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="e.g. Makati City, Metro Manila"
                {...register("address", { required: true })}
                className={`${inputClass} pl-10`}
              />
            </div>
          </Field>

          <Field label="Job Description">
            <div className="relative">
              <FileText size={15} className="absolute left-3.5 top-3.5 text-gray-400 dark:text-gray-500" />
              <textarea
                placeholder="Describe the role, responsibilities, and what you're looking for…"
                rows={5}
                {...register("description", { required: true })}
                className={`${inputClass} pl-10 resize-none`}
              />
            </div>
          </Field>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 space-y-5">
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-gray-800 pb-3 -mx-6 px-6">
            Job Details
          </h2>

          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Industry">
              <select
                {...register("industry", { required: true })}
                multiple
                className={`${inputClass} h-32`}
              >
                <option value="Business">Business</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Banking">Banking</option>
                <option value="Education/Training">Education / Training</option>
                <option value="Telecommunication">Telecommunication</option>
                <option value="Others">Others</option>
              </select>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
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
                <option value="1-2 years experience">1–2 years</option>
                <option value="2-5 years experience">2–5 years</option>
                <option value="5 years experience">5+ years</option>
              </select>
            </Field>

            <Field label="Monthly Salary (₱)">
              <div className="relative">
                <Banknote size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <input
                  type="number"
                  placeholder="e.g. 35000"
                  {...register("salary", { required: true })}
                  className={`${inputClass} pl-10`}
                />
              </div>
            </Field>

            <Field label="No. of Vacancies" hint="Default is 1">
              <div className="relative">
                <Users size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <input
                  type="number"
                  placeholder="1"
                  {...register("positions")}
                  className={`${inputClass} pl-10`}
                />
              </div>
            </Field>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors"
          >
            {isSubmitting ? "Posting…" : "Post Job"}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-2.5 rounded-xl text-sm text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateJobPage;

