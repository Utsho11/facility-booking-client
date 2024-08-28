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
import { Button, Dropdown, MenuProps } from "antd";
import { toast } from "sonner";

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

  console.log(user?.userEmail);

  const items: MenuProps["items"] = [
    ...(user?.role === "admin"
      ? [
          {
            key: "1",
            label: <Link to="/admin/dashboard">View Dashboard</Link>,
          },
          {
            key: "2",
            label: (
              <Link to="/admin/manageFacilities">Facility Management</Link>
            ),
          },
          {
            key: "3",
            label: <Link to="/admin/allBookings">View Bookings</Link>,
          },
          {
            key: "4",
            label: <Link to="/admin/addAdmin">Add Admin</Link>,
          },
        ]
      : [
          {
            key: "1",
            label: <Link to="/user/dashboard">View Dashboard</Link>,
          },
          {
            key: "2",
            label: <Link to="/user/myBookings">My Bookings</Link>,
          },
        ]),
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <FaVolleyballBall size={24} color="#FE7D1F" />
          Book My <span style={{ color: "#FE7D1F" }}>Court</span>{" "}
        </div>
        <ul className={`nav-menu ${isOpen ? "active" : ""}`}>
          {navbarItems.map((item, index) => (
            <li key={index} className="nav-item">
              <Link to={item.path} className="nav-link">
                {item.title}
              </Link>
            </li>
          ))}
          <li className="nav-item">
            {user ? (
              <Dropdown menu={{ items }} placement="bottom" arrow>
                <FaRegUserCircle size={24} className="nav-link" />
              </Dropdown>
            ) : (
              ""
            )}
          </li>
          <li className="nav-item">
            {user?.userEmail ? (
              <Button
                style={{ backgroundColor: "#fe7d1f", color: "#fff" }}
                size="small"
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <Link to="/login" className="nav-link">
                <Button
                  style={{ backgroundColor: "#645bff", color: "#fff" }}
                  className="button"
                  size="small"
                >
                  Log in
                </Button>
              </Link>
            )}
          </li>
        </ul>
        <div className="nav-icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
