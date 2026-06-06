import { useEffect, useState } from "react";
import { getMyApplications } from "../api/applicationsApi";

const useMyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const data = await getMyApplications();
      setApplications(data.applications ?? []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return { applications, loading, error, fetchApplications };
};

export default useMyApplications;
