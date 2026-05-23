import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import Dashboard from "../pages/DashboardPage";
import JobsPage from "../pages/jobs/JobsPage";
import ProtectedRoute from "./ProtectedRoute";
import CreateJobPage from "../pages/jobs/CreateJobPage";
import RoleRoute from "./RoleRoute";
import DashboardLayout
  from "../layouts/DashboardLayout";

import DashboardHomePage
  from "../pages/dashboard/DashboardHomePage";

import ProfilePage
  from "../pages/dashboard/ProfilePage";

import ApplicationsPage
  from "../pages/dashboard/ApplicationsPage";

import MyJobsPage
  from "../pages/dashboard/MyJobsPage";

import EmployerDashboardLayout
  from "../layouts/EmployerDashboardLayout";

import EmployerHomePage
  from "../pages/employer/EmployerHomePage";

import EmployerJobsPage
  from "../pages/employer/EmployerJobsPage";

import EmployerApplicantsPage
  from "../pages/employer/EmployerApplicantsPage";



const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/login" element={<LoginPage />} />
        <Route
  path="/employer"
  element={
    <RoleRoute
      allowedRoles={[
        "employer",
        "admin",
      ]}
    >
      <EmployerDashboardLayout />
    </RoleRoute>
  }
>

  <Route
    index
    element={
      <EmployerHomePage />
    }
  />

  <Route
    path="jobs"
    element={
      <EmployerJobsPage />
    }
  />

  <Route
    path="jobs/create"
    element={
      <CreateJobPage />
    }
  />

  <Route
    path="applicants"
    element={
      <EmployerApplicantsPage />
    }
  />

</Route>
        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <DashboardLayout />
    </ProtectedRoute>
  }
>

  <Route
    index
    element={
      <DashboardHomePage />
    }
  />

  <Route
    path="profile"
    element={<ProfilePage />}
  />

  <Route
    path="applications"
    element={
      <ApplicationsPage />
    }
  />

  <Route
    path="jobs"
    element={
      <RoleRoute
        allowedRoles={[
          "employer",
          "admin",
        ]}
      >
        <MyJobsPage />
      </RoleRoute>
    }
  />

</Route>
        <Route
          path="/register"
          element={<RegisterPage />}
        />
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <JobsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/jobs/create"
          element={
            <ProtectedRoute>
              <RoleRoute
                allowedRoles={[
                  "employer",
                  "admin",
                ]}
              ><CreateJobPage />
              </RoleRoute>       
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;