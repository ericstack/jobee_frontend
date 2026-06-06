import { useForm } from "react-hook-form";
import { registerUser } from "../../api/authApi";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Briefcase, Mail, Lock, User, Building2 } from "lucide-react";

const inputClass =
  "w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition";

const RegisterPage = () => {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    try {
      await registerUser(formData);
      toast.success("Account created! Please sign in.");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-950">
      <div className="hidden lg:flex lg:w-1/2 bg-emerald-600 flex-col justify-between p-12">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <Briefcase size={16} className="text-white" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">jobee</span>
        </Link>

        <div>
          <h2 className="text-white text-3xl font-bold mb-4">Start your journey today</h2>
          <p className="text-emerald-200 leading-relaxed">
            Join thousands of professionals finding meaningful work and building their careers with Jobee.
          </p>
        </div>

        <ul className="space-y-3">
          {[
            "Free to join — no hidden fees",
            "Apply to hundreds of curated jobs",
            "Get discovered by top employers",
          ].map((item) => (
            <li key={item} className="flex items-center gap-3 text-emerald-100 text-sm">
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <span className="text-white text-xs">✓</span>
              </div>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Briefcase size={16} className="text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
              job<span className="text-emerald-600">ee</span>
            </span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">Create your account</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1.5 text-sm">Get started for free today</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full name</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <input type="text" placeholder="Juan dela Cruz" {...register("name", { required: true })} className={inputClass} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <input type="email" placeholder="you@example.com" {...register("email", { required: true })} className={inputClass} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <input type="password" placeholder="At least 8 characters" {...register("password", { required: true })} className={inputClass} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">I am a…</label>
              <div className="relative">
                <Building2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <select
                  {...register("role")}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition appearance-none"
                >
                  <option value="user">Job Seeker</option>
                  <option value="employer">Employer</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white py-2.5 rounded-xl text-sm font-medium transition-colors"
            >
              {isSubmitting ? "Creating account…" : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-500 dark:text-gray-400 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

