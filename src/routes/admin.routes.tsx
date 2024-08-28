import AddAdmin from "../pages/admin/AddAdmin";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AllBooking from "../pages/admin/AllBooking";
import ManageFacilities from "../pages/admin/ManageFacilities";

export const adminPaths = [
  {
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "manageFacilities",
    element: <ManageFacilities />,
  },
  {
    path: "allBookings",
    element: <AllBooking />,
  },
  {
    path: "addAdmin",
    element: <AddAdmin />,
  },
];
