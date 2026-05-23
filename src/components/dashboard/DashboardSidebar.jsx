import {
  Link,
  useLocation,
} from "react-router-dom";

import { useAuth }
  from "../../hooks/useAuth";

const DashboardSidebar = () => {

  const { user } = useAuth();

  const location =
    useLocation();

  const linkClass = (path) =>
    `block px-4 py-3 rounded-lg transition ${
      location.pathname === path
        ? "bg-black text-white"
        : "hover:bg-slate-200"
    }`;

  return (
    <aside className="w-64 min-h-screen border-r bg-white p-4">

      <div className="mb-8">

        <h2 className="text-xl font-bold">
          Dashboard
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          {user?.name}
        </p>

      </div>

      <nav className="space-y-2">

        <Link
          to="/dashboard"
          className={linkClass(
            "/dashboard"
          )}
        >
          Overview
        </Link>

        <Link
          to="/dashboard/profile"
          className={linkClass(
            "/dashboard/profile"
          )}
        >
          Profile
        </Link>

        <Link
          to="/dashboard/applications"
          className={linkClass(
            "/dashboard/applications"
          )}
        >
          Applications
        </Link>

        {(user?.role ===
          "employer" ||
          user?.role ===
          "admin") && (

          <Link
            to="/dashboard/jobs"
            className={linkClass(
              "/dashboard/jobs"
            )}
          >
            My Jobs
          </Link>

        )}

      </nav>

    </aside>
  );
};

export default DashboardSidebar;