import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectCurrentTheme,
  toggleTheme,
} from "../../redux/features/theme/themeSlice";

const ThemeToggle: React.FC<{ className?: string }> = ({ className = "" }) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectCurrentTheme);
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => dispatch(toggleTheme())}
      aria-label="Toggle Theme"
      className={`relative inline-flex items-center justify-center p-2 rounded-full transition-all duration-300 transform hover:scale-110 focus:outline-none ${
        isDark
          ? "bg-gray-800 text-yellow-400 hover:bg-gray-700 shadow-[0_0_12px_rgba(250,204,21,0.3)]"
          : "bg-orange-100 text-orange-600 hover:bg-orange-200 shadow-sm"
      } ${className}`}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDark ? (
        <FaSun className="w-5 h-5 transition-transform duration-500 rotate-0 hover:rotate-90" />
      ) : (
        <FaMoon className="w-5 h-5 transition-transform duration-500 -rotate-12 hover:rotate-0" />
      )}
    </button>
  );
};

export default ThemeToggle;
