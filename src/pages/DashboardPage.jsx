import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { Search, ArrowRight, Briefcase, Users, Building2, TrendingUp } from "lucide-react";

const FEATURED_CATEGORIES = [
  { label: "Technology", count: "2.4k jobs", icon: "💻" },
  { label: "Business", count: "1.8k jobs", icon: "📊" },
  { label: "Education", count: "950 jobs", icon: "🎓" },
  { label: "Healthcare", count: "1.2k jobs", icon: "⚕️" },
  { label: "Banking", count: "670 jobs", icon: "🏦" },
  { label: "Telecommunications", count: "430 jobs", icon: "📡" },
];

const STATS = [
  { label: "Jobs Posted", value: "10,000+", icon: Briefcase, light: "bg-emerald-50 text-emerald-600", dark: "dark:bg-emerald-950 dark:text-emerald-400" },
  { label: "Candidates", value: "50,000+", icon: Users, light: "bg-blue-50 text-blue-600", dark: "dark:bg-blue-950 dark:text-blue-400" },
  { label: "Companies", value: "5,000+", icon: Building2, light: "bg-emerald-50 text-emerald-600", dark: "dark:bg-emerald-950 dark:text-emerald-400" },
  { label: "Placements", value: "30,000+", icon: TrendingUp, light: "bg-amber-50 text-amber-600", dark: "dark:bg-amber-950 dark:text-amber-400" },
];

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />

      <section className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-full mb-6">
            #1 Job Platform in the Philippines
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 tracking-tight leading-tight mb-5">
            Find your dream job <br className="hidden sm:block" />
            <span className="text-emerald-600">today</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto mb-10">
            Connect with thousands of employers and discover opportunities that match your skills and ambitions.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Search jobs, companies, skills…"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <Link
              to="/jobs"
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl text-sm font-medium transition-colors"
            >
              Search Jobs <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {STATS.map(({ label, value, icon: Icon, light, dark }) => (
            <div key={label} className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm text-center">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3 ${light} ${dark}`}>
                <Icon size={18} />
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Browse by Category</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Find jobs in your field of expertise</p>
          </div>
          <Link to="/jobs" className="text-sm text-emerald-600 dark:text-emerald-400 font-medium hover:underline flex items-center gap-1">
            View all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {FEATURED_CATEGORIES.map(({ label, count, icon }) => (
            <Link
              key={label}
              to="/jobs"
              className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-emerald-200 dark:hover:border-emerald-800 transition-all text-center group"
            >
              <div className="text-2xl mb-2">{icon}</div>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">{label}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{count}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-emerald-600 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Are you an employer?</h2>
          <p className="text-emerald-200 mb-8">
            Post your job listings and find qualified candidates quickly and efficiently.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 bg-white text-emerald-700 hover:bg-gray-50 px-6 py-3 rounded-xl text-sm font-semibold transition-colors"
            >
              Post a Job <ArrowRight size={15} />
            </Link>
            <Link
              to="/jobs"
              className="inline-flex items-center justify-center gap-2 border border-white/40 text-white hover:bg-white/10 px-6 py-3 rounded-xl text-sm font-medium transition-colors"
            >
              Browse Candidates
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Briefcase size={13} className="text-white" />
            </div>
            <span className="font-bold text-gray-900 dark:text-gray-100">job<span className="text-emerald-600">ee</span></span>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500">© 2025 Jobee. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default DashboardPage;

