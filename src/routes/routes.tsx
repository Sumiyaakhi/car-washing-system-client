import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import App from "../App";
import { adminPaths } from "./admin.route";
import { routesGenerator } from "../utils/routesGenerator";
import DashboardLayout from "../components/layout/DashboardLayout";
import Error from "../pages/Error";
import Service from "../pages/PublicPages/Service";
import Booking from "../pages/PublicPages/Booking";
import Home from "../pages/PublicPages/Home";
import Reviews from "../pages/Reviews";
import ServiceDetails from "../pages/PublicPages/ServiceDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "service",
        element: <Service />,
      },
      {
        path: "/services/:id",
        element: <ServiceDetails />,
      },

      {
        path: "booking",
        element: <Booking />,
      },
      {
        path: "reviews",
        element: <Reviews />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/admin",
    element: <DashboardLayout />,
    children: routesGenerator(adminPaths),
  },
]);

export default router;
