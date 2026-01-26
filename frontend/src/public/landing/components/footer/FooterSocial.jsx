import React from "react";
import {
  Youtube,
  Instagram,
  Facebook,
  MessageCircle,
  Share2,
} from "lucide-react";
import WhatsAppIcon from "../../../../assets/images/icons/WhatsAppIcon";

const FooterSocial = ({ theme, t }) => {
  const socialLabels = t("social", { returnObjects: true }) || {};

  const socials = [
    {
      icon: <Youtube className="w-6 h-6" />,
      href: "#",
      label: socialLabels.youtube || "YouTube",
      color: "hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/30",
      bg: "bg-red-500/5",
      border: "border-red-500/15",
    },
    {
      icon: <Instagram className="w-6 h-6" />,
      href: "#",
      label: socialLabels.instagram || "Instagram",
      color:
        "hover:bg-pink-500/10 hover:text-pink-500 hover:border-pink-500/30",
      bg: "bg-pink-500/5",
      border: "border-pink-500/15",
    },
    {
      icon: <Facebook className="w-6 h-6" />,
      href: "#",
      label: socialLabels.facebook || "Facebook",
      color:
        "hover:bg-blue-600/10 hover:text-blue-600 hover:border-blue-500/30",
      bg: "bg-blue-500/5",
      border: "border-blue-500/15",
    },
    {
      icon: <WhatsAppIcon className="w-6 h-6" />,
      href: "#",
      label: socialLabels.whatsapp || "WhatsApp",
      color:
        "hover:bg-green-500/10 hover:text-green-500 hover:border-green-500/30",
      bg: "bg-green-500/5",
      border: "border-green-500/15",
    },
  ];

  const getThemeStyles = () => {
    switch (theme) {
      case "cyberpunk":
        return {
          title: "text-white font-bold text-lg mb-4",
          subtitle: "text-cyan-300/80 text-sm mb-6",
          container: "bg-gray-900/30 p-4 rounded-xl",
        };
      case "dark":
        return {
          title: "text-white font-bold text-lg mb-4",
          subtitle: "text-gray-400 text-sm mb-6",
          container: "bg-gray-800/30 p-4 rounded-xl",
        };
      case "light":
      default:
        return {
          title: "text-gray-900 font-bold text-lg mb-4",
          subtitle: "text-gray-600 text-sm mb-6",
          container: "bg-gray-50 p-4 rounded-xl",
        };
    }
  };

  const styles = getThemeStyles();

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Share2
          className={`w-5 h-5 ${
            theme === "light"
              ? "text-blue-500"
              : theme === "cyberpunk"
                ? "text-cyan-400"
                : "text-purple-400"
          }`}
        />
        <h3 className={styles.title}>{t("social.title") || "Conecte-se"}</h3>
      </div>

      <p className={styles.subtitle}>{t("social.subtitle")}</p>

      <div className="grid grid-cols-2 gap-4">
        {socials.map((social, index) => (
          <a
            key={index}
            href={social.href}
            className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-300 ${social.bg} border ${social.border} ${social.color} hover:scale-105 active:scale-95 group`}
            aria-label={social.label}
            title={social.label}
          >
            <div className={`p-2 rounded-lg ${social.bg} ${social.color}`}>
              {social.icon}
            </div>
            <div>
              <div className="font-medium text-sm">{social.label}</div>
              <div
                className={`text-xs ${
                  theme === "light" ? "text-gray-500" : "text-gray-400"
                }`}
              >
                {t("social.labels.follow")}
              </div>
            </div>
            <MessageCircle
              className={`w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity ${
                theme === "light" ? "text-gray-400" : "text-gray-500"
              }`}
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default FooterSocial;
