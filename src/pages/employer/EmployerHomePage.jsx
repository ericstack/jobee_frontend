import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { Briefcase, Users, TrendingUp, Clock, PlusCircle, ArrowRight, FileText, MapPin, Banknote } from "lucide-react";
import CreateJobModal from "../../components/jobs/CreateJobModal";
import useEmployerStats from "../../hooks/useEmployerStats";

const TYPE_STYLES = {
  Permanent: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  Temporary: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  Internship: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
};

const StatCard = ({ label, value, icon: Icon, light, dark, subtext }) => (
  <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{label}</p>
        <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
        {subtext && <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{subtext}</p>}
      </div>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${light} ${dark}`}>
        <Icon size={18} />
      </div>
    </div>
  </div>
);

const EmployerHomePage = () => {
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const {
    loading,
    activeListings,
    totalApplications,
    shortlisted,
    interviews,
    recentJobs,
    applications,
    refetch,
  } = useEmployerStats();

  const show = (n) => (loading ? "—" : n);
  const applicantsFor = (jobId) =>
    applications.filter((a) => a.job?._id === jobId).length;

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Welcome back, {user?.name?.split(" ")[0]} 👋
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Here's an overview of your hiring activity.</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 bg-emerald-600 text-white text-sm px-4 py-2 rounded-xl hover:bg-emerald-700 transition-colors"
        >
          <PlusCircle size={15} />
          Post a Job
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Listings" value={show(activeListings)} subtext="Jobs posted" icon={Briefcase}
          light="bg-emerald-50 text-emerald-600" dark="dark:bg-emerald-950 dark:text-emerald-400" />
        <StatCard label="Total Applications" value={show(totalApplications)} subtext="Across all jobs" icon={FileText}
          light="bg-blue-50 text-blue-600" dark="dark:bg-blue-950 dark:text-blue-400" />
        <StatCard label="Shortlisted" value={show(shortlisted)} subtext="Under review" icon={TrendingUp}
          light="bg-emerald-50 text-emerald-600" dark="dark:bg-emerald-950 dark:text-emerald-400" />
        <StatCard label="Interviews" value={show(interviews)} subtext="Scheduled" icon={Clock}
          light="bg-amber-50 text-amber-600" dark="dark:bg-amber-950 dark:text-amber-400" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">Recent Job Listings</h2>
            <Link to="/employer/jobs" className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-3 animate-pulse">
                  <div className="w-9 h-9 bg-gray-100 dark:bg-gray-800 rounded-xl shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3.5 bg-gray-100 dark:bg-gray-800 rounded w-2/5" />
                    <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-1/4" />
                  </div>
                  <div className="h-5 bg-gray-100 dark:bg-gray-800 rounded-full w-16" />
                </div>
              ))}
            </div>
          ) : recentJobs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-3">
                <Briefcase size={20} className="text-gray-400 dark:text-gray-500" />
              </div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">No jobs posted yet</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 mb-4">
                Create your first job listing to start receiving applications.
              </p>
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-2 bg-emerald-600 text-white text-xs px-4 py-2 rounded-xl hover:bg-emerald-700 transition-colors"
              >
                <PlusCircle size={13} /> Post a Job
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {recentJobs.map((job) => {
                const count = applicantsFor(job._id);
                return (
                  <Link
                    key={job._id}
                    to={`/employer/jobs/${job._id}`}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
                      <Briefcase size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{job.title}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-2 truncate">
                        {job.jobType && (
                          <span className={`px-1.5 py-0.5 rounded-full font-medium ${TYPE_STYLES[job.jobType] || "bg-gray-100 text-gray-600"}`}>
                            {job.jobType}
                          </span>
                        )}
                        {job.address && <span className="flex items-center gap-0.5"><MapPin size={10} />{job.address}</span>}
                        {job.salary && <span className="flex items-center gap-0.5"><Banknote size={10} />P{Number(job.salary).toLocaleString()}</span>}
                      </p>
                    </div>
                    <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400">
                      <Users size={11} />{count}
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button
              onClick={() => setModalOpen(true)}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group text-left"
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                <PlusCircle size={16} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Post a Job</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">Create a new listing</p>
              </div>
            </button>
            {[
              { to: "/employer/applicants", icon: Users, label: "View Applicants", desc: "Review candidates", light: "bg-blue-50 text-blue-600", dark: "dark:bg-blue-950 dark:text-blue-400" },
              { to: "/employer/jobs", icon: Briefcase, label: "Manage Jobs", desc: "Edit your listings", light: "bg-emerald-50 text-emerald-600", dark: "dark:bg-emerald-950 dark:text-emerald-400" },
            ].map(({ to, icon: Icon, label, desc, light, dark }) => (
              <Link key={to} to={to} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${light} ${dark}`}>
                  <Icon size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{label}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">{desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <CreateJobModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={refetch}
      />
    </div>
  );
};

export default EmployerHomePage;
