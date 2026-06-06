import api from "./axios";

// GET ALL JOBS
export const getJobs = async () => {
  const response = await api.get("/jobs/v1/jobs");

  return response.data;
};
//TODO: test create job with form data and file upload

// CREATE JOB
export const createJob = async (formData) => {
  const response = await api.post("/jobs/v1/job/new", formData);

  return response.data;
};

// GET SINGLE JOB
export const getJob = async (id) => {
  const response = await api.get(`/jobs/v1/job/${id}`);

  return response.data;
};

// UPDATE JOB
export const updateJob = async (id, formData) => {
  const response = await api.put(`/jobs/v1/job/${id}`, formData);

  return response.data;
};

// DELETE JOB
export const deleteJob = async (id) => {
  const response = await api.delete(`/jobs/v1/job/${id}`);

  return response.data;
};
