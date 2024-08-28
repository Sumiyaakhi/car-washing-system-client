import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setRegistrationData } from "../redux/features/auth/registerSlice";
import { TUser } from "../types";
import { useSignUpMutation } from "../redux/features/auth/authApi";

const Registration: React.FC = () => {
  const { handleSubmit, reset, register } = useForm<TUser>();
  const dispatch = useDispatch();
  const [signUp] = useSignUpMutation();

  const onSubmit: SubmitHandler<TUser> = async (data) => {
    try {
      console.log("Registration Data:", data);

      // Dispatch the registerUser action to store the data in Redux
      dispatch(setRegistrationData(data));
      const user = await signUp(data).unwrap();
      console.log("User:", user);

      // Reset the form fields after submission
      reset();
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen font-lora">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 text-primary">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              {...register("name", { required: true })}
              placeholder="Enter your name"
              className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

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
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              id="phone"
              {...register("phone", { required: true })}
              placeholder="Enter your phone number"
              className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="img"
              className="block text-sm font-medium text-gray-700"
            >
              Image
            </label>
            <input
              id="img"
              {...register("img")}
              placeholder="Enter your photo link"
              className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <select
              id="role"
              {...register("role", { required: true })}
              className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
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

          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              id="address"
              {...register("address")}
              placeholder="Enter your address"
              className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-primary text-white font-semibold rounded-md hover:bg-hover transition duration-300"
          >
            Register
          </button>
        </form>

        <div className="text-center mt-4">
          <span className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary text-[18px] hover:underline"
            >
              Login here
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Registration;
