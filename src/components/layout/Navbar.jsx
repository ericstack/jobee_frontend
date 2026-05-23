import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    navigate("/login");
  };
//TODO: Add active class to the current link
// TODO: add a dropdown for user profile and logout and
//  DONE: load dashboard menu when user is logged in 
  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        <Link
          to="/dashboard"
          className="text-xl font-bold"
        >
          Jobee
        </Link>

        <div className="flex items-center gap-4">

          {user ? (
            <>
           

            {(user?.role === "employer" ||
              user?.role === "admin") && (
                <Link to="/jobs/create">
                  Post Job
                </Link>
            )}
            <span className="text-sm">
                {user?.name}
              </span>

              <button
                onClick={handleLogout}
                className="bg-black text-white px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
             <Link to="/jobs">
              Jobs
            </Link>
              <Link to="/login">
                Login
              </Link>

              <Link
                to="/register"
                className="bg-black text-white px-4 py-2 rounded-lg"
              >
                Register
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;