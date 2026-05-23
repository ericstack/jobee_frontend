import { Navigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

const RoleRoute = ({
  children,
  allowedRoles,
}) => {

  const {
    user,
    loading,
  } = useAuth();

  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // NOT LOGGED IN
  if (!user) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // ROLE NOT ALLOWED
  if (
    !allowedRoles.includes(
      user.role
    )
  ) {

    return (
      <Navigate
        to="/jobs"
        replace
      />
    );
  }

  return children;
};

export default RoleRoute;