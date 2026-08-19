import React from "react";
import { Layout, Menu } from "antd";
import { TUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { verifyToken } from "../../utils/verifyToken";
import { Link, useLocation } from "react-router-dom";
import {
  FaBolt,
  FaHome,
  FaCalendarAlt,
  FaPlusCircle,
  FaUserShield,
  FaChartPie,
  FaListAlt,
  FaCompass,
  FaUserCircle,
} from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";
import { selectCurrentTheme } from "../../redux/features/theme/themeSlice";

const { Sider } = Layout;

const SideBar: React.FC = () => {
  const token = useAppSelector(useCurrentToken);
  const currentTheme = useAppSelector(selectCurrentTheme);
  const isDark = currentTheme === "dark";
  const location = useLocation();

  let user: TUser | null = null;
  if (token) {
    user = verifyToken(token) as TUser;
  }

  let sidebarItems = [];

  if (user?.role === "admin") {
    sidebarItems = [
      {
        key: "/admin/dashboard",
        icon: <FaChartPie size={16} className="text-[#FE7D1F]" />,
        label: <Link to="/admin/dashboard">Command Dashboard</Link>,
      },
      {
        key: "/admin/manageFacilities",
        icon: <FaListAlt size={16} className="text-orange-400" />,
        label: <Link to="/admin/manageFacilities">Manage Arenas</Link>,
      },
      {
        key: "/admin/addFacility",
        icon: <FaPlusCircle size={16} className="text-amber-400" />,
        label: <Link to="/admin/addFacility">Add New Arena</Link>,
      },
      {
        key: "/admin/addAdmin",
        icon: <FaUserShield size={16} className="text-blue-400" />,
        label: <Link to="/admin/addAdmin">Provision Admin</Link>,
      },
      {
        key: "/admin/allBookings",
        icon: <FaCalendarAlt size={16} className="text-emerald-400" />,
        label: <Link to="/admin/allBookings">All Reservations</Link>,
      },
      {
        key: "/",
        icon: <FaHome size={16} className="text-gray-400" />,
        label: <Link to="/">Return to Public Portal</Link>,
      },
    ];
  } else {
    sidebarItems = [
      {
        key: "/user/dashboard",
        icon: <FaChartPie size={16} className="text-[#FE7D1F]" />,
        label: <Link to="/user/dashboard">Athlete Dashboard</Link>,
      },
      {
        key: "/user/myBookings",
        icon: <FaCalendarAlt size={16} className="text-blue-400" />,
        label: <Link to="/user/myBookings">My Reservations</Link>,
      },
      {
        key: "/facilities",
        icon: <FaCompass size={16} className="text-amber-400" />,
        label: <Link to="/facilities">Explore Arenas</Link>,
      },
      {
        key: "/",
        icon: <FaHome size={16} className="text-gray-400" />,
        label: <Link to="/">Return to Public Portal</Link>,
      },
    ];
  }

  return (
    <Sider
      width="17rem"
      breakpoint="lg"
      collapsedWidth="0"
      className="shadow-2xl z-50 border-r border-gray-200 dark:border-gray-800"
      style={{
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: isDark ? "#141414" : "#1a202c",
      }}
    >
      <div className="flex flex-col h-full justify-between pb-6">
        <div>
          {/* Brand Header */}
          <div className="h-20 flex items-center px-6 border-b border-gray-700/40 dark:border-gray-800">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-600 to-[#FE7D1F] flex items-center justify-center text-white shadow-md shadow-orange-500/30 group-hover:scale-105 transition-transform">
                <FaBolt size={20} />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-lg text-white tracking-tight">
                  AuraCourt <span className="text-[#FE7D1F]">Pro</span>
                </span>
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                  {user?.role === "admin" ? "Admin Control" : "Player Hub"}
                </span>
              </div>
            </Link>
          </div>

          {/* Nav Items */}
          <div className="px-3 py-4">
            <Menu
              style={{
                backgroundColor: "transparent",
                borderRight: "none",
              }}
              theme="dark"
              mode="inline"
              selectedKeys={[location.pathname]}
              items={sidebarItems}
            />
          </div>
        </div>

        {/* User Card & Theme Toggle Footer */}
        <div className="px-4 space-y-3">
          <div className="p-3.5 bg-gray-800/60 dark:bg-[#1e1e1e] rounded-2xl border border-gray-700/50 dark:border-gray-800 flex items-center gap-3">
            <FaUserCircle size={28} className="text-[#FE7D1F]" />
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">
                {user?.userEmail || "Authorized User"}
              </p>
              <span className="text-[10px] text-gray-400 capitalize font-medium">
                Role: {user?.role || "Athlete"}
              </span>
            </div>
          </div>

          <div className="px-2 flex items-center justify-between">
            <span className="text-xs text-gray-400 font-medium">Dark / Light Mode</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </Sider>
  );
};

export default SideBar;
