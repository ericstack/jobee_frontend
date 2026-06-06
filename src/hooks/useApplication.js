import { useEffect, useState } from "react";
import { getApplication } from "../api/applicationsApi";

const useApplication = (id) => {
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    getApplication(id)
      .then((data) => setApplication(data.application))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [id]);

  return { application, setApplication, loading, error };
};

export default useApplication;
