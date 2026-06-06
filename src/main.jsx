import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            className: "!bg-white dark:!bg-gray-800 !text-gray-900 dark:!text-gray-100 !border !border-gray-200 dark:!border-gray-700",
          }}
        />
        <AppRoutes />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);

