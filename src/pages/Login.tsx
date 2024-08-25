import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { setUser } from "../redux/features/auth/authSlice";
import { Link } from "react-router-dom"; // Assuming you're using React Router
import { useDispatch } from "react-redux";
import { TUser } from "../types";
import { verifyToken } from "../utils/verifyToken";

const Login = () => {
  const { handleSubmit, reset, register } = useForm<TUser>({
    defaultValues: {
      email: "web@programming-hero.com",
      password: "ph-password",
    },
  });
  const dispatch = useDispatch();
  const [login] = useLoginMutation();

  const onSubmit = async (data: TUser) => {
    const res = await login(data).unwrap();
    const token = res.token;
    const user = verifyToken(token);
    dispatch(setUser({ user: user, token: token }));

    console.log("this is user=>", user);
    // Reset the form fields after submission
    reset();
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        borderRadius: "8px",
        backgroundColor: "#fff",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
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
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register("password")}
            placeholder="Enter your password"
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
            width: "100%",
          }}
        >
          Login
        </button>
      </form>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <span>
          Don't have an account? <Link to="/register">Register here</Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
