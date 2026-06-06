import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import AdminSidebar from "../components/dashboard/AdminSidebar";

const AdminDashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <div className="max-w-7xl mx-auto flex">
        <AdminSidebar />
        <main className="flex-1 p-6 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;

