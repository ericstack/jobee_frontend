import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { LayoutDashboard, Briefcase, Users, User, LogOut } from "lucide-react";

const navItems = [
  { to: "/employer", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/employer/jobs", label: "My Jobs", icon: Briefcase },
  { to: "/employer/applicants", label: "Applicants", icon: Users },
  { to: "/employer/profile", label: "Profile", icon: User },
];

const EmployerSidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path, exact) =>
    exact ? location.pathname === path : location.pathname.startsWith(path);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col min-h-[calc(100vh-4rem)] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-4">

      <div className="mb-4 px-3 py-2">
        <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
          Employer
        </span>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map(({ to, label, icon: Icon, exact }) => (
          <Link
            key={to}
            to={to}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              isActive(to, exact)
                ? "bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
            }`}
          >
            <Icon
              size={18}
              className={isActive(to, exact) ? "text-emerald-600 dark:text-emerald-400" : "text-gray-400 dark:text-gray-500"}
            />
            {label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-gray-200 dark:border-gray-800 pt-4 mt-4">
        <div className="flex items-center gap-3 px-3 mb-3">
          <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-xs font-bold shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{user?.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user?.role}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
        >
          <LogOut size={18} />
          Sign out
        </button>
      </div>

    </aside>
  );
};

export default EmployerSidebar;

