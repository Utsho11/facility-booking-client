import "./styles/NavBar.css";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaRegUserCircle,
  FaTimes,
  FaVolleyballBall,
} from "react-icons/fa";
import navbarItems from "../../constants/navBarItems";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  logout,
  TUser,
  useCurrentToken,
} from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { Button } from "antd";
import { toast } from "sonner";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out");
  };

  const token = useAppSelector(useCurrentToken);

  let user;

  if (token) {
    user = verifyToken(token) as TUser;
  }

  return (
    <nav className="navbar backdrop-blur-md bg-white/90 dark:bg-[#181818]/90 border-b border-gray-200/80 dark:border-gray-800/80 transition-colors duration-300">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo hover:opacity-90 transition-opacity">
          <FaVolleyballBall size={26} color="#FE7D1F" className="animate-bounce" />
          <span className="text-gray-800 dark:text-white font-extrabold tracking-tight">
            Book My <span style={{ color: "#FE7D1F" }}>Court</span>
          </span>
        </Link>
        <ul className={`nav-menu ${isOpen ? "active" : ""}`}>
          {navbarItems.map((item, index) => (
            <li key={index} className="nav-item">
              <Link
                to={item.path}
                className="nav-link text-gray-700 dark:text-gray-200 hover:text-primary transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </Link>
            </li>
          ))}
          <li className="nav-item flex items-center">
            {user?.role === "user" ? (
              <Link
                to="/user/dashboard"
                className="nav-link flex items-center gap-1 text-gray-700 dark:text-gray-200 hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                <FaRegUserCircle size={22} />
                <span className="sm:hidden">Dashboard</span>
              </Link>
            ) : user?.role === "admin" ? (
              <Link
                to="/admin/dashboard"
                className="nav-link flex items-center gap-1 text-gray-700 dark:text-gray-200 hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                <FaRegUserCircle size={22} />
                <span className="sm:hidden">Dashboard</span>
              </Link>
            ) : null}
          </li>
          <li className="nav-item flex items-center">
            <ThemeToggle />
          </li>
          <li className="nav-item flex items-center">
            {user?.userEmail ? (
              <Button
                type="primary"
                danger
                size="middle"
                className="shadow-sm hover:scale-105 transition-transform"
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <Button
                  type="primary"
                  size="middle"
                  style={{ backgroundColor: "#FE7D1F" }}
                  className="shadow-md hover:scale-105 transition-transform font-medium"
                >
                  Log in
                </Button>
              </Link>
            )}
          </li>
        </ul>
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <div className="nav-icon text-gray-800 dark:text-white" onClick={toggleMenu}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
