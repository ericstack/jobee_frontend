import { useForm } from "react-hook-form";
import { loginUser } from "../../api/authApi";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";

import toast from "react-hot-toast";

const LoginPage = () => {
  const { register, handleSubmit } = useForm();

  const { login } = useAuth();

  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    try {
     const user = await login(formData);
      console.log(user);
      
      toast.success("Welcome back!");

      navigate("/", {
        replace: true,
      });

    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message ||
        "Login failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-slate-500">
          Login
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
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
            Login
          </button>
        </form>

        <p className="mt-4 text-sm">
          No account?
          <Link
            to="/register"
            className="ml-1 text-blue-600"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;