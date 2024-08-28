import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import HomePage from "../pages/HomePage";
import Contact from "../pages/Contact";
import About from "../pages/About";
import { routeGenerator } from "../utils/routeGenerator";
import { adminPaths } from "./admin.routes";
import { userPaths } from "./user.routes";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import Admin from "../pages/admin/Admin";
import User from "../pages/user/User";

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
