import { createContext, useEffect, useState } from "react";

import {
  getProfile,
  loginUser,
} from "../api/authApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const data = await getProfile();

      setUser(data.user);
    } catch (error) {
      // Only force logout when the token is actually rejected (401).
      // Transient/network errors shouldn't sign the user out.
      if (error?.response?.status === 401) {
        localStorage.removeItem("token");
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  // LOGIN FUNCTION
  const login = async (formData) => {
 // LOGIN
  const loginData =
    await loginUser(formData);

  // SAVE TOKEN
  localStorage.setItem(
    "token",
    loginData.token
  );

  // FETCH ACTUAL USER
  const profileData =
    await getProfile();

  // SET USER
  setUser(profileData.user);
  return profileData;
  };

  // LOGOUT FUNCTION
  const logout = () => {
    localStorage.removeItem("token");

    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        refreshProfile: fetchProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
