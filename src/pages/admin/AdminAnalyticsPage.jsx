import { BarChart2, TrendingUp, Users, Briefcase, FileText } from "lucide-react";

const MetricCard = ({ label, value, icon: Icon, light, dark }) => (
  <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4">
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${light} ${dark}`}>
      <Icon size={20} />
    </div>
    <div>
      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
    </div>
  </div>
);

const AdminAnalyticsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Analytics</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Platform-wide statistics and trends</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <MetricCard label="Total Users" value="0" icon={Users}
          light="bg-emerald-50 text-emerald-600" dark="dark:bg-emerald-950 dark:text-emerald-400" />
        <MetricCard label="Active Jobs" value="0" icon={Briefcase}
          light="bg-blue-50 text-blue-600" dark="dark:bg-blue-950 dark:text-blue-400" />
        <MetricCard label="Total Applications" value="0" icon={FileText}
          light="bg-emerald-50 text-emerald-600" dark="dark:bg-emerald-950 dark:text-emerald-400" />
        <MetricCard label="Placement Rate" value="0%" icon={TrendingUp}
          light="bg-amber-50 text-amber-600" dark="dark:bg-amber-950 dark:text-amber-400" />
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-gray-900 dark:text-gray-100">Activity Chart</h2>
          <span className="text-xs text-gray-400 dark:text-gray-500">Last 30 days</span>
        </div>
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-4">
            <BarChart2 size={22} className="text-gray-400 dark:text-gray-500" />
          </div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">No data to display yet</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Charts will appear as the platform grows.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalyticsPage;

