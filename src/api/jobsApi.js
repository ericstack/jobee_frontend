import api from "./axios";

// GET ALL JOBS (optionally filtered: keyword, location, company, jobType, salaryMin, salaryMax)
export const getJobs = async (params = {}) => {
  const response = await api.get("/jobs/v1/jobs", { params });

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

// GET JOBS POSTED BY THE CURRENT EMPLOYER/ADMIN => { results, data: [...] }
export const getMyJobs = async () => {
  const response = await api.get("/user/v1/jobs/published");

  return response.data;
};

// SAVED JOBS (bookmarks)
export const getSavedJobs = async () => {
  const response = await api.get("/user/v1/jobs/saved");
  return response.data;
};

export const saveJob = async (jobId) => {
  const response = await api.put(`/user/v1/jobs/saved/${jobId}`);
  return response.data;
};

export const unsaveJob = async (jobId) => {
  const response = await api.delete(`/user/v1/jobs/saved/${jobId}`);
  return response.data;
};

// Fetch an access-controlled resume (with auth) and return a temporary object URL.
export const fetchResumeUrl = async (resumePath) => {
  const response = await api.get(resumePath, { responseType: "blob" });
  return URL.createObjectURL(response.data);
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
