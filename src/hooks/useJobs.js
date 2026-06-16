import { useCallback, useEffect, useState } from "react";

import { getJobs } from "../api/jobsApi";

const useJobs = (filters = {}) => {
  const [jobs, setJobs] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // stable dependency for the filter object
  const filterKey = JSON.stringify(filters);

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      const active = JSON.parse(filterKey);
      const params = {};
      Object.entries(active).forEach(([k, v]) => {
        if (v !== "" && v !== null && v !== undefined) params[k] = v;
      });
      if (!params.limit) params.limit = 10;
      const data = await getJobs(params);
      setJobs(data.jobs || []);
      setTotal(data.total ?? data.jobs?.length ?? 0);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [filterKey]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return {
    jobs,
    total,
    loading,
    fetchJobs,
  };
};

export default useJobs;
