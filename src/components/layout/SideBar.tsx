import { Layout, Menu } from "antd";
import { TUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { verifyToken } from "../../utils/verifyToken";
import { Link } from "react-router-dom";
import {
  FaVolleyballBall,
  FaHome,
  FaCalendarAlt,
  FaPlusCircle,
  FaUserShield,
  FaChartPie,
  FaListAlt,
} from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";
import { selectCurrentTheme } from "../../redux/features/theme/themeSlice";

const { Sider } = Layout;

const userRole = {
  ADMIN: "admin",
  USER: "user",
};

const SideBar = () => {
  const token = useAppSelector(useCurrentToken);
  const currentTheme = useAppSelector(selectCurrentTheme);
  const isDark = currentTheme === "dark";

  let user;

  if (token) {
    user = verifyToken(token);
  }

  let sidebarItems = [];

  switch ((user as TUser)?.role) {
    case userRole.ADMIN:
      sidebarItems = [
        {
          key: "1",
          icon: <FaChartPie size={16} />,
          label: <Link to="/admin/dashboard">Dashboard</Link>,
        },
        {
          key: "2",
          icon: <FaListAlt size={16} />,
          label: <Link to="/admin/manageFacilities">Manage Facilities</Link>,
        },
        {
          key: "3",
          icon: <FaPlusCircle size={16} />,
          label: <Link to="/admin/addFacility">Add Facility</Link>,
        },
        {
          key: "4",
          icon: <FaUserShield size={16} />,
          label: <Link to="/admin/addAdmin">Add Admin</Link>,
        },
        {
          key: "5",
          icon: <FaCalendarAlt size={16} />,
          label: <Link to="/admin/allBookings">All Bookings</Link>,
        },
        {
          key: "6",
          icon: <FaHome size={16} />,
          label: <Link to="/">Go to Home</Link>,
        },
      ];
      break;
    case userRole.USER:
      sidebarItems = [
        {
          key: "1",
          icon: <FaChartPie size={16} />,
          label: <Link to="/user/dashboard">Dashboard</Link>,
        },
        {
          key: "2",
          icon: <FaCalendarAlt size={16} />,
          label: <Link to="/user/myBookings">My Bookings</Link>,
        },
        {
          key: "3",
          icon: <FaHome size={16} />,
          label: <Link to="/">Go to Home</Link>,
        },
      ];
      break;

    default:
      break;
  }

  return (
    <Sider
      width="16rem"
      breakpoint="md"
      collapsedWidth="0"
      className="shadow-xl"
      style={{
        height: "100vh",
        position: "fixed",
        top: "0",
        left: "0",
        backgroundColor: isDark ? "#181818" : "#2d3748",
        zIndex: 1000,
        borderRight: isDark ? "1px solid #2d2d2d" : "1px solid #4a5568",
      }}
    >
      <div className="flex flex-col h-full justify-between pb-6">
        <div>
          <div
            style={{
              height: "4.5rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderBottom: isDark ? "1px solid #282828" : "1px solid #4a5568",
            }}
          >
            <Link to="/" className="flex items-center gap-2 text-white no-underline">
              <FaVolleyballBall size={24} color="#FE7D1F" />
              <span className="font-bold text-lg">
                Book My <span style={{ color: "#FE7D1F" }}>Court</span>
              </span>
            </Link>
          </div>
          <Menu
            style={{
              backgroundColor: "transparent",
              marginTop: "1rem",
              borderRight: "none",
            }}
            theme="dark"
            mode="inline"
            items={sidebarItems}
          />
        </div>
        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-700/50">
          <span className="text-xs text-gray-400 font-medium">Toggle Theme</span>
          <ThemeToggle />
        </div>
      </div>
    </Sider>
  );
};

export default SideBar;
