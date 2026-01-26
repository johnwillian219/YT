import React, { useState } from "react";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";

const FooterNewsletter = ({ theme, t }) => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail("");
      }, 3000);
    }
  };

  const getThemeStyles = () => {
    switch (theme) {
      case "cyberpunk":
        return {
          title: "text-white font-bold text-lg mb-4",
          input:
            "bg-gray-900/50 border border-cyan-500/30 text-white placeholder-cyan-300/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30",
          button:
            "bg-gradient-to-r from-cyan-500 to-pink-500 text-white hover:shadow-lg hover:shadow-cyan-500/30",
          success: "text-cyan-300",
          note: "text-cyan-300/60",
        };
      case "dark":
        return {
          title: "text-white font-bold text-lg mb-4",
          input:
            "bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30",
          button:
            "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/30",
          success: "text-purple-300",
          note: "text-gray-400",
        };
      case "light":
      default:
        return {
          title: "text-gray-900 font-bold text-lg mb-4",
          input:
            "bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30",
          button:
            "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg hover:shadow-blue-500/30",
          success: "text-blue-600",
          note: "text-gray-500",
        };
    }
  };

  const styles = getThemeStyles();

  return (
    <div className="mb-12">
      <h4 className={styles.title}>{t("newsletter.title")}</h4>

      <form onSubmit={handleSubmit} className="mb-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Mail
                className={`w-4 h-4 ${theme === "light" ? "text-gray-400" : "text-gray-500"}`}
              />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("newsletter.placeholder")}
              className={`pl-10 pr-4 py-3 w-full rounded-xl text-sm focus:outline-none transition-all ${styles.input}`}
              required
            />
          </div>
          <button
            type="submit"
            className={`px-6 py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 ${styles.button}`}
          >
            {subscribed ? (
              <>
                <CheckCircle className="w-4 h-4" />
                {t("newsletter.success") || "Inscrito!"}
              </>
            ) : (
              <>
                {t("newsletter.button")}
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>

      {subscribed ? (
        <p className={`text-sm flex items-center gap-2 ${styles.success}`}>
          <CheckCircle className="w-4 h-4" />
          {t("newsletter.successMessage") || "Obrigado por se inscrever!"}
        </p>
      ) : (
        <p className={`text-xs ${styles.note}`}>{t("newsletter.note")}</p>
      )}
    </div>
  );
};

export default FooterNewsletter;
