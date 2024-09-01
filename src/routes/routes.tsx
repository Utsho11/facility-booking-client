import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import HomePage from "../pages/HomePage";
import Contact from "../pages/Contact";
import { routeGenerator } from "../utils/routeGenerator";
import { adminPaths } from "./admin.routes";
import { userPaths } from "./user.routes";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import Admin from "../pages/admin/Admin";
import User from "../pages/user/User";
import FacilityDetailsPage from "../pages/facility/FacilityDetailsPage";
import CreateBooking from "../pages/CreateBooking";
import FacilitiesPage from "../pages/facility/FacilitiesPage";
import About from "../pages/about/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "about",
        element: <About />,
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
        path: "/facilities",
        element: <FacilitiesPage />,
      },
      {
        path: "/facility/:id",
        element: <FacilityDetailsPage />,
      },
      {
        path: "createBooking",
        element: <CreateBooking />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <Admin />
      </ProtectedRoute>
    ),
    children: routeGenerator(adminPaths),
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute role="user">
        <User />
      </ProtectedRoute>
    ),
    children: routeGenerator(userPaths),
  },
]);

export default router;
