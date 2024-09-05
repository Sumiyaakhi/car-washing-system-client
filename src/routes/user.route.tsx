import PastBookings from "../pages/DasboardPages/UserPages/PastBookings";
import ProfileManagement from "../pages/DasboardPages/UserPages/ProfileManagement";
import UpcomingBookings from "../pages/DasboardPages/UserPages/UpcomingBookings";

export const userPaths = [
  {
    name: "Manage profile",
    path: "manage-profile",
    element: <ProfileManagement />,
  },
  {
    name: "Past bookings",
    path: "past-bookings",
    element: <PastBookings />,
  },
  {
    name: "Upcoming bookings",
    path: "Upcoming-bookings",
    element: <UpcomingBookings />,
  },
  // {
  //   name: 'Dashboard',
  //   path: 'dashboard',
  //   element: <AdminDashboard />,
  // },
  // {
  //   name: 'Academic Management',
  //   children: [
  //     {
  //       name: 'Academic Semester',
  //       path: 'academic-semester',
  //       element: <AcademicSemester />,
  //     },
  //   ],
  // },
  // {
  //   name: 'User Management',
  //   children: [
  //     {
  //       name: 'Create Admin',
  //       path: 'create-admin',
  //       element: <CreateAdmin />,
  //     },
  //     {
  //       name: 'Create Faculty',
  //       path: 'create-faculty',
  //       element: <CreateFaculty />,
  //     },
  //     {
  //       name: 'Create Student',
  //       path: 'create-student',
  //       element: <CreateStudent />,
  //     },
  //     {
  //       name: 'Create Member',
  //       path: 'create-member',
  //       element: <CreateStudent />,
  //     },
  //   ],
  // },
];
