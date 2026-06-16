import api from "./axios";

// Admin: list users => { results, data: [...] }
export const getUsers = async (params = {}) => {
  const response = await api.get("/user/v1/users", { params });
  return response.data;
};

// Admin: delete a user by id
export const deleteUser = async (id) => {
  const response = await api.delete(`/user/v1/users/${id}`);
  return response.data;
};
