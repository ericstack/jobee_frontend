import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getSavedJobs, saveJob, unsaveJob } from "../api/jobsApi";

// Manages the current user's saved (bookmarked) jobs.
const useSavedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [savedIds, setSavedIds] = useState(new Set());
  const [loading, setLoading] = useState(true);

  const fetchSaved = useCallback(async () => {
    try {
      const data = await getSavedJobs();
      const list = data.jobs || [];
      setJobs(list);
      setSavedIds(new Set(list.map((j) => j._id)));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSaved();
  }, [fetchSaved]);

  // optimistic toggle; reverts on failure
  const toggleSave = useCallback(
    async (jobId) => {
      const wasSaved = savedIds.has(jobId);
      setSavedIds((prev) => {
        const next = new Set(prev);
        if (wasSaved) next.delete(jobId);
        else next.add(jobId);
        return next;
      });
      try {
        if (wasSaved) await unsaveJob(jobId);
        else await saveJob(jobId);
        toast.success(wasSaved ? "Removed from saved" : "Job saved");
      } catch (err) {
        // revert
        setSavedIds((prev) => {
          const next = new Set(prev);
          if (wasSaved) next.add(jobId);
          else next.delete(jobId);
          return next;
        });
        toast.error(err?.response?.data?.message || "Could not update saved jobs");
      }
    },
    [savedIds],
  );

  return { jobs, savedIds, loading, fetchSaved, toggleSave };
};

export default useSavedJobs;
