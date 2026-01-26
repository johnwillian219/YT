import React from "react";
import { Star, Quote, User } from "lucide-react";

const TestimonialCard = ({ testimonial, position = "center", theme }) => {
  const getThemeStyles = () => {
    if (position === "center") {
      switch (theme) {
        case "cyberpunk":
          return {
            card: "border-cyan-500/40 bg-gradient-to-br from-gray-900/50 via-gray-900/30 to-cyan-900/10 hover:border-cyan-500/60 hover:shadow-2xl hover:shadow-cyan-500/20",
            accent: "from-cyan-500 to-pink-500",
            quoteIcon: "text-cyan-400",
            content: "text-cyan-100",
            name: "text-white",
            role: "text-cyan-300",
            rating: "text-yellow-400",
            borderAccent: "border-cyan-500/30",
            userIconBg: "bg-cyan-500/20",
            userIconColor: "text-cyan-300",
            scale: "scale-[1.02] md:scale-[1.03]",
            shadow: "shadow-xl shadow-cyan-500/10",
          };
        case "dark":
          return {
            card: "border-purple-500/40 bg-gradient-to-br from-gray-800/50 via-gray-900/40 to-purple-900/20 hover:border-purple-500/60 hover:shadow-2xl hover:shadow-purple-500/20",
            accent: "from-purple-600 to-pink-600",
            quoteIcon: "text-purple-400",
            content: "text-gray-200",
            name: "text-white",
            role: "text-purple-300",
            rating: "text-yellow-400",
            borderAccent: "border-purple-500/30",
            userIconBg: "bg-purple-500/20",
            userIconColor: "text-purple-300",
            scale: "scale-[1.02] md:scale-[1.03]",
            shadow: "shadow-xl shadow-purple-500/10",
          };
        case "light":
          return {
            // FUNDO BRANCO PURO + TEXTO ESCURO
            card: "bg-white border border-gray-300 rounded-2xl hover:border-blue-500 hover:shadow-xl transition-all duration-300",

            // Ícone azul forte para contraste
            quoteIcon: "text-blue-600",

            // Estrelas em laranja/amarelo vibrante
            rating: "text-amber-500",
            ratingFill: "fill-amber-500",

            // TEXTO PRETO/CINZA ESCURO para alto contraste
            content: "text-gray-900 font-medium",
            name: "text-gray-900 font-bold",
            role: "text-gray-700",

            // Linha divisória visível
            borderAccent: "border-gray-200",

            // Avatar com fundo azul claro
            userIconBg: "bg-blue-50",
            userIconColor: "text-blue-600",

            // Sombra média para dar profundidade
            shadow: "shadow-lg",
            scale: "scale-[1.02] md:scale-[1.03]",
          };
        default:
          return {
            card: "border-purple-500/40 bg-gradient-to-br from-gray-800/50 via-gray-900/40 to-purple-900/20 hover:border-purple-500/60 hover:shadow-2xl hover:shadow-purple-500/20",
            accent: "from-purple-600 to-pink-600",
            quoteIcon: "text-purple-400",
            content: "text-gray-200",
            name: "text-white",
            role: "text-purple-300",
            rating: "text-yellow-400",
            borderAccent: "border-purple-500/30",
            userIconBg: "bg-purple-500/20",
            userIconColor: "text-purple-300",
            scale: "scale-[1.02] md:scale-[1.03]",
            shadow: "shadow-xl shadow-purple-500/10",
          };
      }
    } else {
      // Cards laterais
      switch (theme) {
        case "cyberpunk":
          return {
            card: "border-cyan-500/20 bg-gray-900/30 hover:border-cyan-500/40 hover:bg-gray-900/40",
            accent: "from-cyan-500/50 to-pink-500/50",
            quoteIcon: "text-cyan-400/60",
            content: "text-cyan-200/80",
            name: "text-cyan-100",
            role: "text-cyan-300/70",
            rating: "text-yellow-400/80",
            borderAccent: "border-cyan-500/20",
            userIconBg: "bg-gray-800",
            userIconColor: "text-cyan-400",
            scale: "scale-95 opacity-90",
            shadow: "shadow-md",
          };
        case "dark":
          return {
            card: "border-gray-700/50 bg-gray-800/30 hover:border-gray-600 hover:bg-gray-800/40",
            accent: "from-purple-600/50 to-pink-600/50",
            quoteIcon: "text-purple-400/60",
            content: "text-gray-300",
            name: "text-white",
            role: "text-gray-400",
            rating: "text-yellow-400/80",
            borderAccent: "border-gray-600",
            userIconBg: "bg-gray-700",
            userIconColor: "text-gray-400",
            scale: "scale-95 opacity-90",
            shadow: "shadow-md",
          };
        case "light":
          return {
            // Card lateral: branco com borda mais suave
            card: "bg-white border border-gray-200 rounded-2xl hover:border-blue-400 hover:shadow-lg transition-all duration-300",

            // Ícone azul um pouco mais suave
            quoteIcon: "text-blue-500",

            // Estrelas laranja suave
            rating: "text-amber-400",
            ratingFill: "fill-amber-400",

            // Texto escuro, mantém contraste
            content: "text-gray-800",
            name: "text-gray-900 font-bold",
            role: "text-gray-600",

            // Linha divisória clara
            borderAccent: "border-gray-100",

            // Avatar neutro
            userIconBg: "bg-gray-50",
            userIconColor: "text-gray-500",

            // Sombra leve
            shadow: "shadow-md",
            scale: "scale-100", // Mantém tamanho normal
          };
        default:
          return {
            card: "border-gray-700/50 bg-gray-800/30 hover:border-gray-600 hover:bg-gray-800/40",
            accent: "from-purple-600/50 to-pink-600/50",
            quoteIcon: "text-purple-400/60",
            content: "text-gray-300",
            name: "text-white",
            role: "text-gray-400",
            rating: "text-yellow-400/80",
            borderAccent: "border-gray-600",
            userIconBg: "bg-gray-700",
            userIconColor: "text-gray-400",
            scale: "scale-95 opacity-90",
            shadow: "shadow-md",
          };
      }
    }
  };

  const styles = getThemeStyles();

  const translateClass =
    position === "left"
      ? "-translate-x-4"
      : position === "right"
        ? "translate-x-4"
        : "";

  const getRatingColor = () => {
    return styles.rating;
  };

  const getRatingFill = () => {
    return styles.ratingFill || "fill-amber-400";
  };

  return (
    <div
      className={`
        border rounded-2xl p-6 md:p-7 flex flex-col h-full 
        transition-all duration-300 relative
        ${styles.card} ${styles.scale} ${translateClass} ${styles.shadow}
        animate-slideUp
      `}
    >
      {/* Ícone de aspas */}
      <div className="mb-4">
        <Quote className={`w-8 h-8 ${styles.quoteIcon}`} />
      </div>

      {/* Rating */}
      <div className="flex gap-1 mb-6">
        {[...Array(testimonial.rating || 5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${getRatingColor()} ${getRatingFill()}`}
          />
        ))}
      </div>

      {/* Conteúdo - TEXTO ESCURO para alto contraste */}
      <p className={`text-lg leading-relaxed mb-8 ${styles.content}`}>
        "{testimonial.content}"
      </p>

      {/* Autor */}
      <div
        className={`flex items-center gap-4 pt-6 border-t ${styles.borderAccent} mt-auto`}
      >
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center ${styles.userIconBg}`}
        >
          <User className={`w-6 h-6 ${styles.userIconColor}`} />
        </div>

        <div className="flex-1">
          <h4 className={`font-bold text-lg mb-1 ${styles.name}`}>
            {testimonial.name}
          </h4>
          <p className={`text-sm font-medium ${styles.role}`}>
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
