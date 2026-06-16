import api from "./axios";

export const loginUser = async (data) => {
  const response = await api.post("/auth/v1/login", data);
  return response.data;
};

export const registerUser = async (data) => {
  const response = await api.post("/auth/v1/register", data);
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get("/auth/v1/me");
  return response.data;
};

// Update the current user's profile (name/email and/or avatar photo).
// Pass a FormData when uploading a photo (field name: "photo").
export const updateProfile = async (formData) => {
  const response = await api.put("/user/v1/me/update", formData);
  return response.data;
};

// Change the current user's password => returns a fresh { token }.
export const updatePassword = async (data) => {
  const response = await api.put("/user/v1/password/update", data);
  return response.data;
};
