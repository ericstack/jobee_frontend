import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <div className="max-w-7xl mx-auto flex">
        <DashboardSidebar />
        <main className="flex-1 p-6 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

