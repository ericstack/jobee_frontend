import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const GuestRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default GuestRoute;
