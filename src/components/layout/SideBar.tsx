import { Layout, Menu } from "antd";
import { TUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { verifyToken } from "../../utils/verifyToken";
import { Link } from "react-router-dom";
import { FaVolleyballBall } from "react-icons/fa";

const { Sider } = Layout;

const userRole = {
  ADMIN: "admin",
  USER: "user",
};

const SideBar = () => {
  const token = useAppSelector(useCurrentToken);

  let user;

  if (token) {
    user = verifyToken(token);
  }

  let sidebarItems;

  switch ((user as TUser)!.role) {
    case userRole.ADMIN:
      sidebarItems = [
        {
          key: "1",
          label: <Link to="/admin/dashboard">View Dashboard</Link>,
        },
        {
          key: "2",
          label: <Link to="/admin/manageFacilities">Facility Management</Link>,
        },
        {
          key: "3",
          label: <Link to="/admin/addFacility">Add Facility</Link>,
        },
        {
          key: "4",
          label: <Link to="/admin/addAdmin">Add Admin</Link>,
        },
        {
          key: "5",
          label: <Link to="/admin/allBookings">View Bookings</Link>,
        },
        {
          key: "6",
          label: <Link to="/">Go to Home</Link>,
        },
      ];
      break;
    case userRole.USER:
      sidebarItems = [
        {
          key: "1",
          label: <Link to="/user/dashboard">View Dashboard</Link>,
        },
        {
          key: "2",
          label: <Link to="/user/myBookings">My Bookings</Link>,
        },
        {
          key: "3",
          label: <Link to="/">Go to Home</Link>,
        },
      ];
      break;

    default:
      break;
  }

  return (
    <Sider
      width="15rem"
      breakpoint="md"
      collapsedWidth="0"
      style={{
        height: "100vh",
        position: "fixed", // Change to fixed
        top: "0",
        left: "0",
        backgroundColor: "#545454",
        zIndex: 1000, // Ensure it appears over the content
      }}
    >
      <div
        style={{
          color: "white",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="navbar-logo">
          <FaVolleyballBall size={24} color="#FE7D1F" />
          Book My <span style={{ color: "#FE7D1F" }}>Court</span>{" "}
        </div>
      </div>
      <Menu
        style={{
          backgroundColor: "#545454",
        }}
        theme="dark"
        mode="inline"
        items={sidebarItems}
      />
    </Sider>
  );
};

export default SideBar;
