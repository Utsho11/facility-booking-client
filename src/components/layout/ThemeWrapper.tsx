import React, { useEffect } from "react";
import { ConfigProvider, theme as antTheme } from "antd";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentTheme } from "../../redux/features/theme/themeSlice";

interface ThemeWrapperProps {
  children: React.ReactNode;
}

const ThemeWrapper: React.FC<ThemeWrapperProps> = ({ children }) => {
  const currentTheme = useAppSelector(selectCurrentTheme);
  const isDark = currentTheme === "dark";

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark
          ? antTheme.darkAlgorithm
          : antTheme.defaultAlgorithm,
        token: {
          colorPrimary: "#FE7D1F",
          borderRadius: 8,
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
          colorBgContainer: isDark ? "#1e1e1e" : "#ffffff",
          colorBgElevated: isDark ? "#2a2a2a" : "#ffffff",
          colorText: isDark ? "#f3f4f6" : "#1f2937",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default ThemeWrapper;
