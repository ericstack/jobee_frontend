import Navbar from "../components/layout/Navbar";
import { useAuth } from "../hooks/useAuth";

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold">
          Welcome back,
          <span className="ml-2">
            {user?.name}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default DashboardPage;