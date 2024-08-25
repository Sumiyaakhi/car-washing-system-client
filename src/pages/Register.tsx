import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setRegistrationData } from "../redux/features/auth/registerSlice";
import { TUser } from "../types";
import { useSignUpMutation } from "../redux/features/auth/authApi";

const Registration = () => {
  const { handleSubmit, reset, register } = useForm<TUser>();
  const dispatch = useDispatch();
  const [signUp] = useSignUpMutation();

  const onSubmit = async (data: TUser) => {
    console.log("Registration Data:", data);

    // Dispatch the registerUser action to store the data in Redux
    dispatch(setRegistrationData(data));
    const user = await signUp(data);
    console.log("this is user=>", user);
    // Reset the form fields after submission
    reset();
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "50px auto",
        padding: "20px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        borderRadius: "10px",
        backgroundColor: "#fff",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Create an Account
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            {...register("name")}
            placeholder="Enter your name"
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register("email")}
            placeholder="Enter your email"
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div>
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            {...register("phone")}
            placeholder="Enter your phone number"
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div>
          <label htmlFor="role">Role</label>
          <select
            id="role"
            {...register("role")}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register("password")}
            placeholder="Enter your password"
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div>
          <label htmlFor="address">Address</label>
          <input
            id="address"
            {...register("address")}
            placeholder="Enter your address"
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Register
        </button>
      </form>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <span>
          Already have an account? <Link to="/login">Login here</Link>
        </span>
      </div>
    </div>
  );
};

export default Registration;
