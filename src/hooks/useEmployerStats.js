import { useCallback, useEffect, useState } from "react";
import { getMyJobs } from "../api/jobsApi";
import { getEmployerApplications } from "../api/applicationsApi";

const POLL_MS = 20000; // refresh every 20s for near-realtime metrics

const useEmployerStats = () => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    try {
      const [jobsRes, appsRes] = await Promise.all([
        getMyJobs(),
        getEmployerApplications(),
      ]);
      setJobs(jobsRes.data || []);
      setApplications(appsRes.applications || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
    const id = setInterval(fetchStats, POLL_MS);
    const onFocus = () => fetchStats();
    window.addEventListener("focus", onFocus);
    return () => {
      clearInterval(id);
      window.removeEventListener("focus", onFocus);
    };
  }, [fetchStats]);

  const count = (status) => applications.filter((a) => a.status === status).length;

  const recentJobs = [...jobs]
    .sort((a, b) => new Date(b.postingDate || 0) - new Date(a.postingDate || 0))
    .slice(0, 5);

  return {
    loading,
    jobs,
    applications,
    activeListings: jobs.length,
    totalApplications: applications.length,
    pending: count("pending"),
    shortlisted: count("shortlisted"),
    interviews: count("interview"),
    hired: count("hired"),
    rejected: count("rejected"),
    recentJobs,
    refetch: fetchStats,
  };
};

export default useEmployerStats;
