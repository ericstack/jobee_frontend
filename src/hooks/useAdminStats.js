import { useCallback, useEffect, useState } from "react";
import { getUsers } from "../api/usersApi";
import { getJobs } from "../api/jobsApi";
import { getEmployerApplications } from "../api/applicationsApi";

const POLL_MS = 20000; // near-realtime refresh

const useAdminStats = () => {
  const [users, setUsers] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    try {
      const [usersRes, jobsRes, appsRes] = await Promise.all([
        getUsers({ limit: 1000 }),
        getJobs({ limit: 1 }), // only need the `total`
        getEmployerApplications(), // admin gets ALL applications
      ]);
      setUsers(usersRes.data || []);
      setTotalJobs(jobsRes.total ?? jobsRes.jobs?.length ?? 0);
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

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const newUsersToday = users.filter(
    (u) => u.createdAt && new Date(u.createdAt) >= startOfToday,
  ).length;
  const hired = applications.filter((a) => a.status === "hired").length;

  return {
    loading,
    users,
    applications,
    totalUsers: users.length,
    employers: users.filter((u) => u.role === "employer").length,
    jobSeekers: users.filter((u) => u.role === "user").length,
    admins: users.filter((u) => u.role === "admin").length,
    newUsersToday,
    totalJobs,
    totalApplications: applications.length,
    placementRate: applications.length
      ? Math.round((hired / applications.length) * 100)
      : 0,
    refetch: fetchStats,
  };
};

export default useAdminStats;
