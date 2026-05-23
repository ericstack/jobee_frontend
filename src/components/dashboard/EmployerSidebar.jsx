import {
  Link,
  useLocation,
} from "react-router-dom";

const EmployerSidebar = () => {

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

      <h2 className="text-2xl font-bold mb-8">
        Employer
      </h2>

      <nav className="space-y-2">

        <Link
          to="/employer"
          className={linkClass(
            "/employer"
          )}
        >
          Overview
        </Link>

        <Link
          to="/employer/jobs"
          className={linkClass(
            "/employer/jobs"
          )}
        >
          My Jobs
        </Link>

        <Link
          to="/employer/jobs/create"
          className={linkClass(
            "/employer/jobs/create"
          )}
        >
          Post Job
        </Link>

        <Link
          to="/employer/applicants"
          className={linkClass(
            "/employer/applicants"
          )}
        >
          Applicants
        </Link>

      </nav>

    </aside>
  );
};

export default EmployerSidebar;