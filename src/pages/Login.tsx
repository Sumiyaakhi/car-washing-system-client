import { useForm, SubmitHandler } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { setUser } from "../redux/features/auth/authSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TUser } from "../types";
import { verifyToken } from "../utils/verifyToken";
import Swal from "sweetalert2";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleSubmit, reset, register } = useForm<TUser>({
    defaultValues: {
      email: "sumiya.akhi793@gmail.com",
      password: "akhi",
    },
  });

  const dispatch = useDispatch();
  const [login] = useLoginMutation();

  const onSubmit: SubmitHandler<TUser> = async (data) => {
    try {
      const res = await login(data).unwrap();
      const token = res.token;
      const user = verifyToken(token);
      dispatch(setUser({ user, token }));

      if (user) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Log In successful",
          showConfirmButton: false,
          timer: 2000,
        });

        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true });
      }

      console.log("User:", user);

      reset();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen font-lora">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 text-primary">
          Sign In
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", { required: true })}
              placeholder="Enter your email"
              className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password", { required: true })}
              placeholder="Enter your password"
              className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-primary text-white font-semibold rounded-md hover:bg-hover transition duration-300"
          >
            Sign In
          </button>
        </form>

        <div className="text-center mt-4">
          <span className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary text-[18px] hover:underline"
            >
              Register here
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
