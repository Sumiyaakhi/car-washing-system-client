import AdminDashboard from "../pages/DasboardPages/AdminPages/AdminDashboard";
import CreateSlot from "../pages/DasboardPages/AdminPages/CreateSlot";
import ServiceManagement from "../pages/DasboardPages/AdminPages/ServiceManagement";
import SlotManagement from "../pages/DasboardPages/AdminPages/SlotManagement";
import UserBookings from "../pages/DasboardPages/AdminPages/UserBookings";
import UserManagement from "../pages/DasboardPages/AdminPages/UserManagement";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "User Management",
    children: [
      {
        name: "User Bookings",
        path: "user-bookings",
        element: <UserBookings />,
      },
      {
        name: "User Management",
        path: "user-management",
        element: <UserManagement />,
      },
    ],
  },
  {
    name: "Service Management",
    path: "service-management",
    element: <ServiceManagement />,
  },
  {
    name: "Slot Management",
    path: "slot-management",
    element: <SlotManagement />,
  },
  {
    name: "Create Slot",
    path: "create-slot",
    element: <CreateSlot />,
  },
];

// export const adminRoutes = adminPaths.reduce((acc: TRoute[], item) => {
//   if (item.path && item.element) {
//     acc.push({
//       path: item.path,
//       element: item.element,
//     });
//   }
//   if (item.children) {
//     item.children.forEach((child) => {
//       acc.push({
//         path: child.path,
//         element: child.element,
//       });
//     });
//   }
//   return acc;
// }, []);

// export const adminSidebarItems = adminPaths.reduce(
//   (acc: TSidebarItem[], item) => {
//     if (item.path && item.element) {
//       acc.push({
//         key: item.name,
//         label: <NavLink to={`/admin/${item.path}`}>{item.name}</NavLink>,
//       });
//     }
//     if (item.children) {
//       acc.push({
//         key: item.name,
//         label: item.name,
//         children: item.children.map((child) => ({
//           key: child.name,
//           label: <NavLink to={`/admin/${child.path}`}>{child.name}</NavLink>,
//         })),
//       });
//     }
//     return acc;
//   },
//   []
// );
