import { Link } from "react-router-dom";

const JobCard = ({ job }) => {

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-md transition">

      <div className="flex items-start justify-between">

        <div>

          <h2 className="text-xl font-semibold">
            {job.title}
          </h2>

          <p className="text-slate-500 mt-1">
            {job.company}
          </p>

        </div>

        <span className="bg-slate-100 text-sm px-3 py-1 rounded-full">
          {job.type}
        </span>

      </div>

      <p className="mt-4 text-slate-600 line-clamp-2">
        {job.description}
      </p>

      <div className="mt-6 flex items-center justify-between">

        <span className="font-semibold">
          ₱ {job.salary}
        </span>

        <Link
          to={`/jobs/${job._id}`}
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          View Job
        </Link>

      </div>

    </div>
  );
};

export default JobCard;