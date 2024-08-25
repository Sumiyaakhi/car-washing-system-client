import AdminDashboard from "../pages/DasboardPages/AdminPages/AdminDashboard";
import CreateService from "../pages/DasboardPages/AdminPages/CreateService";
import CreateSlot from "../pages/DasboardPages/AdminPages/CreateSlot";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Create-Service",
    path: "create-service",
    element: <CreateService />,
  },
  {
    name: "Create-Slot",
    path: "create-slot",
    element: <CreateSlot />,
  },
  {
    name: "user-management",
    children: [
      {
        name: "Create-admin",
        path: "create-admin",
        element: <CreateSlot />,
      },
      {
        name: "Create-Service",
        path: "create-service",
        element: <CreateService />,
      },
      {
        name: "Create-Slot",
        path: "create-slot",
        element: <CreateSlot />,
      },
    ],
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
