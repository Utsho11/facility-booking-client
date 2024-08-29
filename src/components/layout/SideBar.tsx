import { Layout, Menu } from "antd";
import { TUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { verifyToken } from "../../utils/verifyToken";
import { Link } from "react-router-dom";

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
          label: <Link to="/admin/allBookings">View Bookings</Link>,
        },
        {
          key: "4",
          label: <Link to="/admin/addAdmin">Add Admin</Link>,
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
      ];
      break;

    default:
      break;
  }

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{ height: "100vh", position: "sticky", top: "0", left: "0" }}
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
        <h1>PH Uni</h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default SideBar;
