import Navbar from "../../components/layout/Navbar";

import JobCard from "../../components/jobs/jobCard";

import useJobs from "../../hooks/useJobs";

const JobsPage = () => {

  const {
    jobs,
    loading,
  } = useJobs();

  return (
    <div className="min-h-screen bg-slate-100">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="flex items-center justify-between mb-8">

          <div>

            <h1 className="text-4xl font-bold">
              Find Jobs
            </h1>

            <p className="text-slate-500 mt-2">
              Explore the latest opportunities
            </p>

          </div>

        </div>

        {loading ? (

          <div>
            Loading jobs...
          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {jobs.map((job) => (

              <JobCard
                key={job._id}
                job={job}
              />

            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default JobsPage;