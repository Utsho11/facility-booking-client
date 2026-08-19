import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaCompass,
  FaCalendarCheck,
  FaInfoCircle,
  FaHeadset,
  FaUserShield,
  FaUser,
  FaSignOutAlt,
  FaChevronDown,
  FaBolt,
} from "react-icons/fa";
import { Dropdown, MenuProps, Button, Avatar, Badge } from "antd";
import navbarItems from "../../constants/navBarItems";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  logout,
  TUser,
  useCurrentToken,
} from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { toast } from "sonner";
import ThemeToggle from "./ThemeToggle";

const iconMap = {
  home: <FaHome size={15} />,
  facilities: <FaCompass size={15} />,
  booking: <FaCalendarCheck size={15} />,
  about: <FaInfoCircle size={15} />,
  contact: <FaHeadset size={15} />,
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const token = useAppSelector(useCurrentToken);
  let user: TUser | null = null;
  if (token) {
    user = verifyToken(token) as TUser;
  }

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Successfully signed out");
    navigate("/");
  };

  const userMenuItems: MenuProps["items"] = [
    {
      key: "header",
      label: (
        <div className="px-2 py-1.5 border-b border-gray-100 dark:border-gray-700">
          <p className="text-xs font-semibold text-gray-400">Signed in as</p>
          <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
            {user?.userEmail || "Athlete"}
          </p>
          <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-extrabold uppercase rounded-full bg-orange-100 text-[#FE7D1F] dark:bg-orange-950/60">
            {user?.role === "admin" ? "System Admin" : "Verified Athlete"}
          </span>
        </div>
      ),
    },
    {
      key: "dashboard",
      icon: user?.role === "admin" ? <FaUserShield className="text-[#FE7D1F]" /> : <FaUser className="text-[#FE7D1F]" />,
      label: (
        <Link to={user?.role === "admin" ? "/admin/dashboard" : "/user/dashboard"}>
          Command Dashboard
        </Link>
      ),
    },
    ...(user?.role === "user"
      ? [
          {
            key: "my-bookings",
            icon: <FaCalendarCheck className="text-blue-500" />,
            label: <Link to="/user/myBooking">My Reservations</Link>,
          },
        ]
      : []),
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <FaSignOutAlt className="text-red-500" />,
      danger: true,
      label: "Sign Out",
      onClick: handleLogout,
    },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/90 dark:bg-[#141414]/90 border-b border-gray-100 dark:border-gray-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group hover:opacity-95 transition-opacity"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-600 via-[#FE7D1F] to-amber-400 flex items-center justify-center text-white shadow-lg shadow-orange-500/25 group-hover:scale-105 transition-transform duration-300">
              <FaBolt size={20} className="animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight leading-none">
                AuraCourt <span className="text-[#FE7D1F]">Pro</span>
              </span>
              <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 tracking-wider uppercase">
                Visual Arena System
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-gray-50/80 dark:bg-[#1d1d1d]/80 p-1.5 rounded-full border border-gray-200/60 dark:border-gray-800/80 shadow-xs">
            {navbarItems.map((item, idx) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={idx}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                    isActive
                      ? "bg-[#FE7D1F] text-white shadow-md shadow-orange-500/20"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/60 dark:hover:bg-gray-800/60"
                  }`}
                >
                  <span className={isActive ? "text-white" : "text-gray-400 dark:text-gray-500"}>
                    {iconMap[item.iconName]}
                  </span>
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Elements */}
          <div className="hidden sm:flex items-center gap-3">
            <ThemeToggle />

            {user ? (
              <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow trigger={["click"]}>
                <button className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full bg-gray-100/80 dark:bg-gray-800/80 border border-gray-200/60 dark:border-gray-700/60 hover:border-orange-400 transition-all cursor-pointer">
                  <Avatar
                    style={{ backgroundColor: user.role === "admin" ? "#FE7D1F" : "#115DFC" }}
                    icon={user.role === "admin" ? <FaUserShield /> : <FaUser />}
                    size="small"
                  />
                  <span className="text-xs font-bold text-gray-800 dark:text-gray-200 max-w-[100px] truncate">
                    {user.userEmail?.split("@")[0] || "Account"}
                  </span>
                  <FaChevronDown size={10} className="text-gray-400" />
                </button>
              </Dropdown>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button
                    type="primary"
                    style={{ backgroundColor: "#FE7D1F" }}
                    className="h-10 px-5 rounded-full font-bold text-xs shadow-md shadow-orange-500/20 hover:scale-105 transition-transform border-none"
                  >
                    Sign In
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Actions & Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-[#181818] px-4 pt-3 pb-6 space-y-2 shadow-xl animate-fadeIn">
          {navbarItems.map((item, idx) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={idx}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-colors ${
                  isActive
                    ? "bg-orange-50 dark:bg-orange-950/40 text-[#FE7D1F]"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <span className="text-[#FE7D1F]">{iconMap[item.iconName]}</span>
                <span>{item.title}</span>
              </Link>
            );
          })}

          <div className="pt-4 border-t border-gray-100 dark:border-gray-800 space-y-2">
            {user ? (
              <>
                <Link
                  to={user?.role === "admin" ? "/admin/dashboard" : "/user/dashboard"}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                >
                  <FaUserShield className="text-[#FE7D1F]" />
                  <span>Command Dashboard</span>
                </Link>
                <Button
                  danger
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full h-11 rounded-2xl font-bold mt-2"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <Button
                  type="primary"
                  style={{ backgroundColor: "#FE7D1F" }}
                  className="w-full h-11 rounded-2xl font-bold text-sm shadow-md"
                >
                  Sign In to AuraCourt
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
