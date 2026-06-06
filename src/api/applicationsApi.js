import api from "./axios";

// Job seeker: submit application
export const applyToJob = async (jobId, data) => {
  const response = await api.post(`api/user/v1/job/${jobId}/apply`, { jobId, ...data });
  return response.data;
};

// Job seeker: own applications
export const getMyApplications = async () => {
  const response = await api.get("api/user/v1/job/me");
  return response.data;
};

export const getEmployerApplications = async () => {
  const response = await api.get("api/user/v1/job/employer");
  return response.data;
};

export const getApplication = async (id) => {
  const response = await api.get(`api/user/v1/job/${id}`);
  return response.data;
};

export const updateApplicationStatus = async (id, status) => {
  const response = await api.put(`api/user/v1/job/${id}/status`, { status });
  return response.data;
};
