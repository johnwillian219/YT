// frontend/src/public/landing/components/DesktopNav.jsx
import React from "react";
import {
  Sparkles,
  DollarSign,
  BookOpen,
  HelpCircle,
  ChevronRight,
} from "lucide-react";
import DesktopDropdown from "./DesktopDropdown";

const DesktopNav = ({
  theme,
  t,
  navLinks,
  features,
  isFeaturesDropdownOpen,
  setIsFeaturesDropdownOpen,
  scrollToSection,
}) => {
  const getThemeStyles = () => {
    switch (theme) {
      case "cyberpunk":
        return {
          navItem: "text-cyan-100 hover:text-white hover:bg-cyan-500/10",
          hoverBg: "hover:bg-cyan-500/10",
          icon: "text-cyan-300",
        };
      case "dark":
        return {
          navItem: "text-gray-300 hover:text-white hover:bg-gray-800",
          hoverBg: "hover:bg-gray-800",
          icon: "text-gray-400",
        };
      case "light":
        return {
          navItem: "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
          hoverBg: "hover:bg-gray-100",
          icon: "text-gray-500",
        };
      default:
        return {
          navItem: "text-gray-300 hover:text-white hover:bg-gray-800",
          hoverBg: "hover:bg-gray-800",
          icon: "text-gray-400",
        };
    }
  };

  const themeStyles = getThemeStyles();

  return (
    <nav className="hidden lg:flex items-center space-x-1">
      {navLinks.map((link, idx) => {
        const IconComponent = link.Icon;
        return (
          <div
            key={idx}
            className="relative group"
            onMouseEnter={() =>
              link.hasDropdown && setIsFeaturesDropdownOpen(true)
            }
            onMouseLeave={() =>
              link.hasDropdown && setIsFeaturesDropdownOpen(false)
            }
          >
            <button
              onClick={() => {
                if (link.onClick) link.onClick();
                else if (link.href) window.open(link.href, "_blank");
              }}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-all duration-200 font-medium ${themeStyles.navItem}`}
            >
              <IconComponent className="w-4 h-4" />
              <span>{link.label}</span>
              {link.hasDropdown && (
                <ChevronRight className="w-4 h-4 transform group-hover:rotate-90 transition-transform" />
              )}
            </button>
            {link.hasDropdown && (
              <DesktopDropdown
                theme={theme}
                t={t}
                features={features}
                isOpen={isFeaturesDropdownOpen}
                scrollToSection={scrollToSection}
              />
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default DesktopNav;
