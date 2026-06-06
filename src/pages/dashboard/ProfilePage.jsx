import { useAuth } from "../../hooks/useAuth";
import { User, Mail, Shield, Edit3 } from "lucide-react";

const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-4 py-4 border-b border-gray-100 dark:border-gray-800 last:border-0">
    <div className="w-9 h-9 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
      <Icon size={15} className="text-gray-500 dark:text-gray-400" />
    </div>
    <div>
      <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider font-medium mb-0.5">{label}</p>
      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{value || "—"}</p>
    </div>
  </div>
);

const ProfilePage = () => {
  const { user } = useAuth();

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Profile</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage your personal information</p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-emerald-500 to-emerald-700" />
        <div className="px-6 pb-6">
          <div className="flex items-end justify-between -mt-8 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-900 border-4 border-white dark:border-gray-900 shadow-sm flex items-center justify-center">
              <span className="text-lg font-bold text-emerald-700 dark:text-emerald-300">{initials}</span>
            </div>
            <button className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 px-3 py-1.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <Edit3 size={13} />
              Edit
            </button>
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{user?.name}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 capitalize mt-0.5">{user?.role}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Account Details</h3>
        <InfoRow icon={User} label="Full Name" value={user?.name} />
        <InfoRow icon={Mail} label="Email Address" value={user?.email} />
        <InfoRow icon={Shield} label="Account Role" value={user?.role} />
      </div>
    </div>
  );
};

export default ProfilePage;

