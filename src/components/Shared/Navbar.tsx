import { Link, NavLink } from "react-router-dom";
import img from "../../assets/icons/spark_wash_Logo.png";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };
  const navItem = (
    <>
      <li className="inline-block mx-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "underline text-primary"
              : "hover:underline hover:text-primary"
          }
        >
          Home
        </NavLink>
      </li>
      <li className="inline-block mx-2">
        <NavLink
          to="/service"
          className={({ isActive }) =>
            isActive
              ? "underline text-primary"
              : "hover:underline hover:text-primary"
          }
        >
          Service
        </NavLink>
      </li>
      <li className="inline-block mx-2">
        <NavLink
          to="/booking"
          className={({ isActive }) =>
            isActive
              ? "underline text-primary"
              : "hover:underline hover:text-primary"
          }
        >
          Booking
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="fixed z-10 w-full bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navItem}
            </ul>
          </div>
          <Link to="/" className="ml-2 text-xl font-bold">
            <img className="w-28 lg:w-48 " src={img} alt="" />
          </Link>
        </div>
        <div className="hidden lg:flex items-end space-x-6">
          <ul className="flex items-center space-x-6 text-lg">{navItem}</ul>
        </div>
        <div>
          {user ? (
            <>
              <button
                onClick={handleLogout}
                className="py-2 px-5 hover:bg-hover bg-primary text-white font-bold rounded-md"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <div className="hidden lg:flex border-[1px] border-gray-400 items-center  rounded-md">
                <Link to="/login">
                  <button className="px-5 py-2 hover:bg-hover hover:text-white font-bold rounded-s-md">
                    Sign In
                  </button>
                </Link>
                <Link to="/register">
                  {" "}
                  <button className="py-2 px-5 hover:bg-hover bg-primary text-white font-bold rounded-e-md">
                    Sign Up
                  </button>
                </Link>
              </div>
              <div className="lg:hidden">
                <button className="py-2 px-3 hover:bg-hover bg-primary text-white font-bold rounded-md">
                  Sign Up
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
