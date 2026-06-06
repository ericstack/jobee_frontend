import { useEffect, useState } from "react";
import { getJob } from "../api/jobsApi";

const useJob = (id) => {
 
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    getJob(id)
      .then((data) => {
        if (Array.isArray(data)) return setJob(data[0]);
        if (Array.isArray(data?.jobs)) return setJob(data.jobs[0]);
        setJob(data?.job ?? data);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [id]);

  return { job, setJob, loading, error };
};

export default useJob;
