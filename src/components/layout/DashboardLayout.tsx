import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, useCurrentUser } from "../../redux/features/auth/authSlice";
import { sidebarItemGenerator } from "../../utils/sidebarItemGenerator";
import { adminPaths } from "../../routes/admin.route";
import { userPaths } from "../../routes/user.route";
import { TSidebarItem } from "../../types";
import Swal from "sweetalert2";

const DashboardLayout = () => {
  const user = useAppSelector(useCurrentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const role = user?.role;

  // Generate sidebar items based on the user's role
  let sidebarItems: TSidebarItem[] = [];

  if (role) {
    switch (role) {
      case "admin":
        sidebarItems = sidebarItemGenerator(adminPaths, role);
        break;
      case "user":
        sidebarItems = sidebarItemGenerator(userPaths, role);
        break;
      default:
        break;
    }
  }

  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (accordion: string) => {
    setOpenAccordion(openAccordion === accordion ? null : accordion);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());
        Swal.fire(
          "Logged Out",
          "You have been successfully logged out.",
          "success"
        );

        // Redirect to home page
        navigate("/");
      }
    });
  };
  return (
    <div className="drawer lg:drawer-open font-lora">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content bg-base-200 p-5">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className="btn bg-primary text-white hover:bg-hover drawer-button lg:hidden"
        >
          Open drawer
        </label>
        <Outlet />
      </div>
      <div className="drawer-side ">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu  text-black font-semibold min-h-full w-72 p-8">
          <li className="py-1 text-[17px]">
            <Link to="/">Home</Link>
          </li>
          {sidebarItems.map((item) => (
            <li className="py-1 text-[17px]" key={item.key}>
              {item.children && item.children.length > 0 ? (
                <>
                  {/* Parent item that toggles the children */}
                  <div
                    onClick={() => toggleAccordion(item.key)}
                    className="cursor-pointer flex justify-between items-center"
                  >
                    <span>{item.label}</span>

                    {openAccordion === item.key ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5 transition-transform transform rotate-180"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5 transition-transform transform"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    )}
                  </div>
                  {/* Show child items if accordion is open */}
                  {openAccordion === item.key && (
                    <ul className="ml-4">
                      {item.children.map((child) => (
                        <li key={child.key} className="py-1">
                          {child.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                // If no children, display the item as a simple link
                item.label
              )}
            </li>
          ))}
          <div className="md:mt-20">
            <button
              onClick={handleLogout}
              className="w-full py-3 px-5 hover:bg-hover bg-primary text-white font-bold rounded-md"
            >
              Log out
            </button>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
