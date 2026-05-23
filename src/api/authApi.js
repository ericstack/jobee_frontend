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
