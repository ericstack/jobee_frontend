import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Briefcase, Mail, Lock } from "lucide-react";

const LoginPage = () => {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    try {
      const data = await login(formData);
      toast.success("Welcome back!");
      const role = data?.user?.role;
      if (role === "admin") navigate("/admin", { replace: true });
      else if (role === "employer") navigate("/employer", { replace: true });
      else navigate("/dashboard", { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
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
          <blockquote className="text-white/90 text-2xl font-light leading-relaxed mb-6">
            "Find your next great opportunity or discover the talent that will drive your company forward."
          </blockquote>
          <p className="text-emerald-200 text-sm">Trusted by thousands of job seekers and employers</p>
        </div>

        <div className="flex gap-8">
          {[["10k+", "Jobs posted"], ["50k+", "Candidates"], ["5k+", "Companies"]].map(([num, label]) => (
            <div key={label}>
              <p className="text-white text-2xl font-bold">{num}</p>
              <p className="text-emerald-200 text-sm">{label}</p>
            </div>
          ))}
        </div>
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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">Welcome back</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1.5 text-sm">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  {...register("email", { required: true })}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("password", { required: true })}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white py-2.5 rounded-xl text-sm font-medium transition-colors"
            >
              {isSubmitting ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-500 dark:text-gray-400 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

