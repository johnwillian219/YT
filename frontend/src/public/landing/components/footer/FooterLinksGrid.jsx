import React from "react";
import { ChevronRight } from "lucide-react";

const FooterLinksGrid = ({ theme, t }) => {
  const sections = t("sections", { returnObjects: true }) || {};

  const getThemeStyles = () => {
    switch (theme) {
      case "cyberpunk":
        return {
          title: "text-white font-bold text-sm mb-5 uppercase tracking-wider",
          link: "text-cyan-200/80 hover:text-cyan-300 transition-all duration-200",
          icon: "text-cyan-400/60 group-hover:text-cyan-400",
        };
      case "dark":
        return {
          title: "text-white font-bold text-sm mb-5 uppercase tracking-wider",
          link: "text-gray-400 hover:text-white transition-all duration-200",
          icon: "text-gray-500 group-hover:text-gray-400",
        };
      case "light":
      default:
        return {
          title:
            "text-gray-900 font-bold text-sm mb-5 uppercase tracking-wider",
          link: "text-gray-600 hover:text-blue-600 transition-all duration-200",
          icon: "text-gray-400 group-hover:text-blue-500",
        };
    }
  };

  const styles = getThemeStyles();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
      {Object.entries(sections).map(([key, section]) => (
        <div key={key}>
          <h4 className={styles.title}>{section.title}</h4>
          <ul className="space-y-4">
            {Array.isArray(section.links) &&
              section.links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href || "#"}
                    className={`group flex items-center text-sm font-medium ${styles.link}`}
                  >
                    <ChevronRight
                      className={`w-3 h-3 mr-2 transition-all group-hover:translate-x-1 ${styles.icon}`}
                    />
                    <span className="group-hover:translate-x-0.5 transition-transform">
                      {link.name}
                    </span>
                  </a>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default FooterLinksGrid;
