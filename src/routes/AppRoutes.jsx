import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import JobsPage from "../pages/jobs/JobsPage";
import CreateJobPage from "../pages/jobs/CreateJobPage";
import JobDetailPage from "../pages/jobs/JobDetailPage";

import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHomePage from "../pages/dashboard/DashboardHomePage";
import ProfilePage from "../pages/dashboard/ProfilePage";
import ApplicationsPage from "../pages/dashboard/ApplicationsPage";
import MyJobsPage from "../pages/dashboard/MyJobsPage";

import EmployerDashboardLayout from "../layouts/EmployerDashboardLayout";
import EmployerHomePage from "../pages/employer/EmployerHomePage";
import EmployerJobsPage from "../pages/employer/EmployerJobsPage";
import EmployerApplicantsPage from "../pages/employer/EmployerApplicantsPage";
import EmployerJobDetailPage from "../pages/employer/EmployerJobDetailPage";
import EmployerApplicantDetailPage from "../pages/employer/EmployerApplicantDetailPage";

import AdminDashboardLayout from "../layouts/AdminDashboardLayout";
import AdminHomePage from "../pages/admin/AdminHomePage";
import AdminUsersPage from "../pages/admin/AdminUsersPage";
import AdminJobsPage from "../pages/admin/AdminJobsPage";
import AdminAnalyticsPage from "../pages/admin/AdminAnalyticsPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <JobsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs/:id"
          element={
            <ProtectedRoute>
              <JobDetailPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHomePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="applications" element={<ApplicationsPage />} />
          <Route
            path="jobs"
            element={
              <RoleRoute allowedRoles={["employer", "admin"]}>
                <MyJobsPage />
              </RoleRoute>
            }
          />
        </Route>

        <Route
          path="/employer"
          element={
            <RoleRoute allowedRoles={["employer", "admin"]}>
              <EmployerDashboardLayout />
            </RoleRoute>
          }
        >
          <Route index element={<EmployerHomePage />} />
          <Route path="jobs" element={<EmployerJobsPage />} />
          <Route path="jobs/create" element={<CreateJobPage />} />
          <Route path="jobs/:id" element={<EmployerJobDetailPage />} />
          <Route path="applicants" element={<EmployerApplicantsPage />} />
          <Route path="applicants/:id" element={<EmployerApplicantDetailPage />} />
        </Route>

        <Route
          path="/admin"
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <AdminDashboardLayout />
            </RoleRoute>
          }
        >
          <Route index element={<AdminHomePage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="jobs" element={<AdminJobsPage />} />
          <Route path="jobs/create" element={<CreateJobPage />} />
          <Route path="analytics" element={<AdminAnalyticsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

