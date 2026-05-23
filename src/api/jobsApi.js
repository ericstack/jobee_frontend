import api from "./axios";

// GET ALL JOBS
export const getJobs = async () => {
  const response = await api.get("/jobs");

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
  const response = await api.get(`/jobs/${id}`);

  return response.data;
};
