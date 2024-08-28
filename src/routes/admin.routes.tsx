import AddAdmin from "../pages/admin/AddAdmin";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AllBooking from "../pages/admin/AllBooking";
import CreateFacility from "../pages/admin/CreateFacility";
import ManageFacilities from "../pages/admin/ManageFacilities";
import UpdateFacility from "../pages/admin/UpdateFacility";

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
  {
    path: "addFacility",
    element: <CreateFacility />,
  },
  {
    path: "updateFacility/:id",
    element: <UpdateFacility />,
  },
];
