import { useForm } from "react-hook-form";
import { registerUser } from "../../api/authApi";

import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

const RegisterPage = () => {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    try {
      await registerUser(formData);

      toast.success("Registration successful");

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6">
          Register
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Name"
            {...register("name")}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="w-full border rounded-lg p-3"
          />

          <button
            className="w-full bg-black text-white py-3 rounded-lg"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-sm">
          Already have an account?
          <Link
            to="/login"
            className="ml-1 text-blue-600"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;