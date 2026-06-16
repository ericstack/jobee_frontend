import api from "./axios";

// An "application" is identified on the frontend by a composite id:
//   `${jobId}__${applicantId}`   (applications are embedded in jobs on the backend)
const splitAppId = (compositeId) => {
  const [jobId, applicantId] = String(compositeId).split("__");
  return { jobId, applicantId };
};

// Job seeker: submit application
// Backend: PUT /api/jobs/v1/job/:id/apply  (multipart, field name "file")
export const applyToJob = async (jobId, data) => {
  const response = await api.put(
    `jobs/v1/job/${jobId}/apply`,
    data instanceof FormData ? data : { jobId, ...data },
  );
  return response.data;
};

// Job seeker: own applications => { applications: [...] }
export const getMyApplications = async () => {
  const response = await api.get("jobs/v1/me/applications");
  return response.data;
};

// Employer/admin: all applicants across their jobs => { applications: [...] }
export const getEmployerApplications = async () => {
  const response = await api.get("jobs/v1/employer/applicants");
  return response.data;
};

// Single application detail => { application: {...} }
export const getApplication = async (compositeId) => {
  const { jobId, applicantId } = splitAppId(compositeId);
  const response = await api.get(
    `jobs/v1/job/${jobId}/applicant/${applicantId}`,
  );
  return response.data;
};

// Employer/admin: update an applicant's status
export const updateApplicationStatus = async (compositeId, status) => {
  const { jobId, applicantId } = splitAppId(compositeId);
  const response = await api.put(
    `jobs/v1/job/${jobId}/applicant/${applicantId}/status`,
    { status },
  );
  return response.data;
};
