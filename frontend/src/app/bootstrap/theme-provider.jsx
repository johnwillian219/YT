import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Try to get theme from localStorage
    const savedTheme = localStorage.getItem("ninjatube-theme");
    // Return saved theme or default to 'cyberpunk'
    return savedTheme || "cyberpunk";
  });

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute("data-theme", theme);
    document.body.setAttribute("data-theme", theme);

    // Save to localStorage
    localStorage.setItem("ninjatube-theme", theme);

    // Update Tailwind dark mode class
    if (theme === "dark" || theme === "cyberpunk") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      if (prev === "cyberpunk") return "dark";
      if (prev === "dark") return "light";
      return "cyberpunk";
    });
  };

  const setThemeDirectly = (newTheme) => {
    if (["cyberpunk", "dark", "light"].includes(newTheme)) {
      setTheme(newTheme);
    }
  };

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, setTheme: setThemeDirectly }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
