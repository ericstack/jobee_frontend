import { Outlet }
  from "react-router-dom";

import Navbar
  from "../components/layout/Navbar";

import EmployerSidebar
  from "../components/dashboard/EmployerSidebar";

const EmployerDashboardLayout =
  () => {

  return (
    <div className="min-h-screen bg-slate-100">

      <Navbar />

      <div className="max-w-7xl mx-auto flex">

        <EmployerSidebar />

        <main className="flex-1 p-6">

          <Outlet />

        </main>

      </div>

    </div>
  );
};

export default
  EmployerDashboardLayout;