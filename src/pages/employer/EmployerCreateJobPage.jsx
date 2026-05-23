import { useForm } from "react-hook-form";

import Navbar from "../../components/layout/Navbar";

import { createJob } from "../../api/jobsApi";

import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

const EmployerCreateJobPage = () => {

  const {
    register,
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (
    formData
  ) => {

    try {

      await createJob(formData);

      toast.success(
        "Job posted successfully"
      );

      navigate("/jobs");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to create job"
      );

    }
  };

  return (
    <div className="min-h-screen bg-slate-100">

      <Navbar />

      <div className="max-w-3xl mx-auto py-10 px-6">

        <div className="bg-white rounded-2xl shadow-sm border p-8">

          <h1 className="text-3xl font-bold mb-8">
            Post a Job
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >

            <input
              type="text"
              placeholder="Job Title"
              {...register("title", { required: true })}
              className="w-full border rounded-lg p-3"
            />

            <input
              type="text"
              placeholder="Company"
              {...register("company", { required: true })}
              className="w-full border rounded-lg p-3"
            />

            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
              className="w-full border rounded-lg p-3"
            />

            <input
              type="text"
              placeholder="Address"
              {...register("address", { required: true })}
              className="w-full border rounded-lg p-3"
            />

            <select
              {...register("industry", { required: true })}
              multiple
              className="w-full border rounded-lg p-3"
            >
              <option value="Business">Business</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Banking">Banking</option>
              <option value="Education/Training">Education/Training</option>
              <option value="Telecommunication">Telecommunication</option>
              <option value="Others">Others</option>
            </select>

            <select
              {...register("jobType", { required: true })}
              className="w-full border rounded-lg p-3"
            >
              <option value="">Select Job Type</option>
              <option value="Permanent">Permanent</option>
              <option value="Temporary">Temporary</option>
              <option value="Internship">Internship</option>
            </select>

            <select
              {...register("minEducation", { required: true })}
              className="w-full border rounded-lg p-3"
            >
              <option value="">Select Minimum Education</option>
              <option value="Bachelors">Bachelors</option>
              <option value="Masters">Masters</option>
              <option value="PhD">PhD</option>
            </select>

            <select
              {...register("experience", { required: true })}
              className="w-full border rounded-lg p-3"
            >
              <option value="">Select Experience</option>
              <option value="No Experience">No Experience</option>
              <option value="1-2 years experience">1-2 years experience</option>
              <option value="2-5 years experience">2-5 years experience</option>
              <option value="5 years experience ">5 years experience</option>
            </select>

            <input
              type="number"
              placeholder="Salary"
              {...register("salary", { required: true })}
              className="w-full border rounded-lg p-3"
            />

            <input
              type="number"
              placeholder="Positions (default 1)"
              {...register("positions")}
              className="w-full border rounded-lg p-3"
            />

            <textarea
              placeholder="Description"
              rows="6"
              {...register("description", { required: true })}
              className="w-full border rounded-lg p-3"
            />

            <button
              className="bg-black text-white px-6 py-3 rounded-lg"
            >
              Post Job
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default EmployerCreateJobPage;