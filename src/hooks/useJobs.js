import { useEffect, useState } from "react";

import { getJobs } from "../api/jobsApi";

const useJobs = () => {
  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const data = await getJobs();

      setJobs(data.jobs);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return {
    jobs,
    loading,
    fetchJobs,
  };
};

export default useJobs;
