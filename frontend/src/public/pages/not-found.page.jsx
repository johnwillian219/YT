import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../app/bootstrap/theme-provider";
import { useTranslation } from "../../shared/hooks/use-translation.hook";
import { motion } from "framer-motion";

// Importando ícones Heroicons
import {
  LockClosedIcon,
  UserPlusIcon,
  ChartBarIcon,
  QuestionMarkCircleIcon,
  ArrowLeftIcon,
  HomeIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

const NotFoundPage = () => {
  const { theme } = useTheme();
  const { t } = useTranslation("common");

  const getThemeStyles = () => {
    switch (theme) {
      case "cyberpunk":
        return {
          bg: "bg-gradient-to-br from-[#0a0a0f] via-[#151522] to-[#0a0a0f]",
          text: "text-[#00f0ff]",
          textSecondary: "text-[#a0f0ff]",
          textMuted: "text-[#80c0c0]",
          button:
            "bg-gradient-to-r from-[#ff00ff] to-[#cc00ff] hover:from-[#cc00cc] hover:to-[#9900cc] text-white",
          buttonSecondary:
            "bg-transparent border-2 border-[#00f0ff] text-[#00f0ff] hover:bg-[#00f0ff]/10",
          glow: "shadow-[0_0_30px_rgba(255,0,255,0.3)]",
          glowSecondary: "shadow-[0_0_20px_rgba(0,240,255,0.2)]",
          border: "border-[#00f0ff]/30",
          card: "bg-gradient-to-br from-[#151522]/60 to-[#0a0a0f]/60 backdrop-blur-sm",
          iconPrimary: "text-[#ff00ff]",
          iconSecondary: "text-[#00f0ff]",
          iconMuted: "text-[#80c0c0]",
        };
      case "dark":
        return {
          bg: "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900",
          text: "text-white",
          textSecondary: "text-gray-300",
          textMuted: "text-gray-500",
          button:
            "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white",
          buttonSecondary:
            "bg-transparent border-2 border-gray-600 text-gray-300 hover:bg-gray-800/50",
          glow: "shadow-xl shadow-blue-500/10",
          glowSecondary: "shadow-lg shadow-gray-500/10",
          border: "border-gray-700/50",
          card: "bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm",
          iconPrimary: "text-blue-400",
          iconSecondary: "text-indigo-400",
          iconMuted: "text-gray-500",
        };
      case "light":
        return {
          bg: "bg-gradient-to-br from-gray-50 via-white to-gray-100",
          text: "text-gray-900",
          textSecondary: "text-gray-700",
          textMuted: "text-gray-500",
          button:
            "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white",
          buttonSecondary:
            "bg-transparent border-2 border-gray-300 text-gray-700 hover:bg-gray-100",
          glow: "shadow-xl shadow-blue-500/20",
          glowSecondary: "shadow-lg shadow-gray-500/20",
          border: "border-gray-300/50",
          card: "bg-gradient-to-br from-white/70 to-gray-50/70 backdrop-blur-sm",
          iconPrimary: "text-blue-500",
          iconSecondary: "text-blue-600",
          iconMuted: "text-gray-500",
        };
      default:
        return {
          bg: "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900",
          text: "text-white",
          textSecondary: "text-gray-300",
          textMuted: "text-gray-500",
          button:
            "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white",
          buttonSecondary:
            "bg-transparent border-2 border-gray-600 text-gray-300 hover:bg-gray-800/50",
          glow: "shadow-xl shadow-blue-500/10",
          glowSecondary: "shadow-lg shadow-gray-500/10",
          border: "border-gray-700/50",
          card: "bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm",
          iconPrimary: "text-blue-400",
          iconSecondary: "text-indigo-400",
          iconMuted: "text-gray-500",
        };
    }
  };

  const styles = getThemeStyles();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  // Links rápidos usando apenas os textos disponíveis
  const quickLinks = [
    {
      to: "/auth/login",
      label: "Login",
      icon: LockClosedIcon,
    },
    {
      to: "/auth/register",
      label: "Registrar",
      icon: UserPlusIcon,
    },
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: ChartBarIcon,
    },
    {
      to: "/help",
      label: "Ajuda",
      icon: QuestionMarkCircleIcon,
    },
  ];

  return (
    <div
      className={`min-h-screen ${styles.bg} ${styles.text} transition-all duration-500`}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="container mx-auto px-4 py-8 md:py-16 flex flex-col items-center justify-center min-h-screen"
      >
        {/* Error Code */}
        <motion.div
          variants={itemVariants}
          animate={floatingAnimation}
          className="relative mb-8 md:mb-12"
        >
          <div className="text-7xl sm:text-8xl md:text-9xl font-black text-center leading-none">
            <div className="relative">
              <span className={`block opacity-10 ${styles.text}`}>404</span>
              <span className={`absolute inset-0 ${styles.text} blur-md`}>
                404
              </span>
              <span className={`absolute inset-0 ${styles.text}`}>404</span>
            </div>
          </div>
          <div
            className={`absolute -top-4 -right-4 w-8 h-8 rounded-full ${styles.iconPrimary} ${styles.glow}`}
          ></div>
          <div
            className={`absolute -bottom-4 -left-4 w-6 h-6 rounded-full ${styles.iconSecondary} ${styles.glowSecondary}`}
          ></div>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-3xl w-full space-y-8">
          {/* Message Section */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              {t("notFound.title")}
            </h1>
            <p
              className={`text-lg md:text-xl ${styles.textSecondary} leading-relaxed max-w-2xl mx-auto px-4`}
            >
              {t("notFound.description")}
            </p>
          </motion.div>

          {/* Icon/Illustration */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <div
              className={`p-6 rounded-2xl ${styles.card} ${styles.border} ${styles.glowSecondary} transform hover:scale-105 transition-transform duration-300`}
            >
              <svg
                className="w-24 h-24 md:w-32 md:h-32"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </motion.div>

          {/* Primary Actions */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/"
              className={`px-8 py-4 rounded-xl font-semibold text-center transition-all duration-300 ${styles.button} ${styles.glow} hover:scale-105 active:scale-95`}
            >
              <span className="flex items-center justify-center gap-3">
                <HomeIcon className="w-5 h-5" />
                {t("notFound.goHome")}
              </span>
            </Link>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.history.back()}
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${styles.buttonSecondary} hover:opacity-100 opacity-90`}
            >
              <span className="flex items-center justify-center gap-3">
                <ArrowLeftIcon className="w-5 h-5" />
                {t("notFound.goBack")}
              </span>
            </motion.button>
          </motion.div>

          {/* Quick Links - Grid responsivo: 2 colunas em mobile, 4 em desktop */}
          <motion.div
            variants={itemVariants}
            className={`p-6 md:p-8 rounded-2xl ${styles.card} ${styles.border} ${styles.glowSecondary} backdrop-blur-sm`}
          >
            <div className="flex items-center gap-3 mb-4">
              <QuestionMarkCircleIcon
                className={`w-6 h-6 ${styles.iconPrimary}`}
              />
              <h3 className={`text-xl font-semibold ${styles.text}`}>
                {t("notFound.searchTip")}
              </h3>
            </div>
            <p className={`mb-6 ${styles.textSecondary} text-sm md:text-base`}>
              {t("notFound.searchDescription")}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickLinks.map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="h-full"
                  >
                    <Link
                      to={link.to}
                      className={`flex flex-col items-center p-4 rounded-xl transition-all duration-300 ${styles.border} hover:${styles.glowSecondary} h-full group`}
                    >
                      <div
                        className={`p-3 rounded-lg mb-3 transition-all duration-300 group-hover:scale-110 group-hover:${styles.glow} ${styles.iconPrimary}`}
                      >
                        <IconComponent className="w-6 h-6 md:w-8 md:h-8" />
                      </div>
                      <span className="font-medium text-sm md:text-base text-center">
                        {link.label}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Support Section */}
          <motion.div variants={itemVariants} className="text-center space-y-2">
            <p className={`${styles.textSecondary} text-sm md:text-base`}>
              {t("notFound.needHelp")}
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="/contact"
              className="inline-flex items-center gap-2 font-medium text-sm md:text-base hover:opacity-80 transition-opacity"
            >
              <span>{t("notFound.contactSupport")}</span>
              <ArrowRightIcon className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
