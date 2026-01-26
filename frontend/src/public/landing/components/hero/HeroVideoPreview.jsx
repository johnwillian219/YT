// frontend/src/public/landing/hero/HeroVideoPreview.jsx (atualizado para light theme)
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const HeroVideoPreview = ({ theme, t, isOpen, onClose }) => {
  const [videoReady, setVideoReady] = useState(false);

  // ID do vídeo do YouTube (extraído da URL https://youtu.be/SEioieeL5eA)
  const youtubeVideoId = "SEioieeL5eA";

  // Reset quando fecha
  useEffect(() => {
    if (!isOpen) {
      setVideoReady(false);
    }
  }, [isOpen]);

  // Fechar com ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const getThemeStyles = () => {
    switch (theme) {
      case "cyberpunk":
        return {
          overlay: "bg-black/70",
          container: "bg-gray-900/95 backdrop-blur-xl border-cyan-500/30",
          text: "text-cyan-100",
          muted: "text-cyan-300/70",
          closeButton:
            "bg-gray-900 hover:bg-cyan-500/20 text-cyan-300 hover:text-white border border-cyan-500/30 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]",
          demoBadge: "bg-cyan-500/10 text-cyan-300 border border-cyan-500/30",
          loading:
            "bg-gradient-to-br from-gray-900 via-gray-800 to-cyan-900/20",
        };
      case "dark":
        return {
          overlay: "bg-black/70",
          container: "bg-gray-900/95 backdrop-blur-md border-gray-800",
          text: "text-white",
          muted: "text-gray-400",
          closeButton:
            "bg-gray-900 hover:bg-purple-500/20 text-gray-300 hover:text-white border border-gray-700 hover:border-purple-500/30",
          demoBadge:
            "bg-purple-500/10 text-purple-300 border border-purple-500/30",
          loading:
            "bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900/20",
        };
      case "light":
        return {
          overlay: "bg-black/40",
          container: "bg-white border-gray-300",
          text: "text-gray-800",
          muted: "text-gray-600",
          closeButton:
            "bg-white hover:bg-gray-100 text-gray-700 hover:text-gray-900 border border-gray-300 hover:border-gray-400 hover:shadow-lg",
          demoBadge: "bg-blue-50 text-blue-600 border border-blue-200",
          loading: "bg-gradient-to-br from-gray-50 via-gray-100 to-blue-50",
        };
      default:
        return {
          overlay: "bg-black/70",
          container: "bg-gray-900/95 backdrop-blur-md border-gray-800",
          text: "text-white",
          muted: "text-gray-400",
          closeButton:
            "bg-gray-900 hover:bg-purple-500/20 text-gray-300 hover:text-white border border-gray-700 hover:border-purple-500/30",
          demoBadge:
            "bg-purple-500/10 text-purple-300 border border-purple-500/30",
          loading:
            "bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900/20",
        };
    }
  };

  if (!isOpen) return null;

  const styles = getThemeStyles();

  const handleVideoReady = () => {
    setVideoReady(true);
  };

  // URL do vídeo do YouTube com parâmetros para autoplay e controles
  const youtubeUrl = `https://www.youtube.com/embed/${youtubeVideoId}?rel=0&modestbranding=1&showinfo=0`;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-[100] animate-fadeIn" onClick={onClose}>
        <div className={`absolute inset-0 ${styles.overlay}`} />
      </div>

      {/* Modal Container */}
      <div
        className="fixed inset-0 z-[101] flex items-center justify-center p-4 animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`relative w-full max-w-4xl rounded-xl overflow-hidden ${styles.container} border shadow-2xl`}
        >
          {/* Botão Fechar (X) - NO CANTO SUPERIOR DIREITO */}
          <button
            onClick={onClose}
            className={`absolute top-4 right-4 z-10 p-3 rounded-full transition-all duration-200 hover:scale-110 ${styles.closeButton}`}
            aria-label={t("videoPreview.aria.close")}
          >
            <X className="size-5" />
          </button>

          {/* Badge de demonstração */}
          <div className="absolute top-4 left-4 z-10">
            <div
              className={`px-3 py-1.5 rounded-full text-xs font-semibold ${styles.demoBadge}`}
            >
              {t("videoPreview.demoBadge")}
            </div>
          </div>

          {/* Área do Vídeo */}
          <div className="aspect-video relative">
            {/* Overlay de loading enquanto o vídeo carrega */}
            {!videoReady && (
              <div
                className={`absolute inset-0 ${styles.loading} flex items-center justify-center`}
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4">
                    <div
                      className={`w-12 h-12 rounded-full ${theme === "light" ? "bg-blue-100" : "bg-gray-800"} flex items-center justify-center animate-pulse`}
                    >
                      <div
                        className={`w-6 h-6 ${theme === "light" ? "text-blue-400" : "text-gray-400"}`}
                      >
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-current" />
                      </div>
                    </div>
                  </div>
                  <p className={`text-sm ${styles.muted}`}>
                    Carregando vídeo...
                  </p>
                </div>
              </div>
            )}

            {/* Player do YouTube */}
            <div className="relative w-full h-full">
              <iframe
                src={youtubeUrl}
                title="Demonstração NinjaTube - YouTube"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
                onLoad={handleVideoReady}
              />
            </div>

            {/* Indicador de título do vídeo */}
            <div
              className={`absolute bottom-0 left-0 right-0 p-4 ${theme === "light" ? "bg-gradient-to-t from-white/90 to-transparent" : "bg-gradient-to-t from-black/50 to-transparent"}`}
            >
              <p className={`text-sm text-center ${styles.text} font-medium`}>
                {t("videoPreview.title")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroVideoPreview;
