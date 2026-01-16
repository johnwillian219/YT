import React, { useState, useEffect } from "react";
import {
  Star,
  Users,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useTheme } from "../../app/bootstrap/theme-provider";
import { useTranslation } from "../../shared/hooks/use-translation.hook";
import Container from "../components/Container";

const TestimonialsSection = () => {
  const { theme } = useTheme();
  const { t } = useTranslation("testimonials");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  // Estado para testemunhos
  const [testimonials, setTestimonials] = useState([]);

  // Inicializa os testemunhos quando as traduções carregam
  useEffect(() => {
    const loadedTestimonials = t("testimonials", { returnObjects: true });
    if (Array.isArray(loadedTestimonials) && loadedTestimonials.length > 0) {
      setTestimonials(loadedTestimonials);
    }
  }, [t]);

  // Atualiza largura da janela para responsividade
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Configurações simples de tema
  const getThemeClasses = () => {
    const base = {
      cyberpunk: {
        text: {
          primary: "text-white",
          secondary: "text-gray-300",
          accent: "text-purple-400",
        },
        bg: {
          card: "bg-gray-800/30",
          accent: "from-purple-600 to-pink-600",
        },
        border: "border-gray-700/50",
      },
      dark: {
        text: {
          primary: "text-white",
          secondary: "text-gray-300",
          accent: "text-purple-300",
        },
        bg: {
          card: "bg-gray-800/50",
          accent: "from-purple-600 to-pink-600",
        },
        border: "border-gray-700",
      },
      light: {
        text: {
          primary: "text-gray-900",
          secondary: "text-gray-700",
          accent: "text-blue-600",
        },
        bg: {
          card: "bg-white",
          accent: "from-blue-600 to-purple-600",
        },
        border: "border-gray-200",
      },
    };

    return base[theme] || base.cyberpunk;
  };

  const themeClasses = getThemeClasses();

  const nextSlide = () => {
    if (testimonials.length > 0) {
      setCurrentSlide((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevSlide = () => {
    if (testimonials.length > 0) {
      setCurrentSlide((prev) =>
        prev === 0 ? testimonials.length - 1 : prev - 1
      );
    }
  };

  // Para desktop, mostra 3 cards, para mobile mostra 1
  const getVisibleTestimonials = () => {
    if (!Array.isArray(testimonials) || testimonials.length === 0) {
      return [];
    }

    if (windowWidth < 768) {
      // Mobile: mostra apenas o slide atual
      return [testimonials[currentSlide]];
    } else {
      // Desktop: mostra 3 cards (atual, próximo, anterior)
      const slides = [];
      for (let i = -1; i <= 1; i++) {
        const index =
          (currentSlide + i + testimonials.length) % testimonials.length;
        slides.push({
          ...testimonials[index],
          position:
            i === 0 ? "center"
            : i === -1 ? "left"
            : "right",
        });
      }
      return slides;
    }
  };

  const visibleTestimonials = getVisibleTestimonials();
  const features = t("cta.features", { returnObjects: true }) || [];

  return (
    <section className="py-20">
      <Container>
        {/* Cabeçalho simples */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users className={`w-5 h-5 ${themeClasses.text.accent}`} />
            <span
              className={`text-sm font-semibold ${themeClasses.text.accent}`}
            >
              {t("header.badge")}
            </span>
          </div>

          <h2
            className={`text-2xl md:text-4xl font-bold mb-4 ${themeClasses.text.primary}`}
          >
            {t("header.title")}{" "}
            <span
              className={`bg-gradient-to-r ${themeClasses.bg.accent} bg-clip-text text-transparent`}
            >
              {t("header.highlight")}
            </span>
          </h2>

          <p className={`text-lg ${themeClasses.text.secondary} mb-8`}>
            {t("header.subtitle")}
          </p>
        </div>

        {/* Carrossel de depoimentos */}
        <div className="relative mb-12">
          {/* Controles de navegação */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <button
              onClick={prevSlide}
              className={`p-2 rounded-full ${theme === "light" ? "bg-gray-100 hover:bg-gray-200 text-gray-700" : "bg-gray-800 hover:bg-gray-700 text-gray-300"} transition-colors`}
              aria-label={t("carousel.prev")}
              disabled={testimonials.length === 0}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Indicadores */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide ?
                      theme === "light" ?
                        "bg-gray-900"
                      : "bg-white"
                    : theme === "light" ? "bg-gray-300"
                    : "bg-gray-600"
                  }`}
                  aria-label={t("carousel.goTo", { index: index + 1 })}
                  disabled={testimonials.length === 0}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className={`p-2 rounded-full ${theme === "light" ? "bg-gray-100 hover:bg-gray-200 text-gray-700" : "bg-gray-800 hover:bg-gray-700 text-gray-300"} transition-colors`}
              aria-label={t("carousel.next")}
              disabled={testimonials.length === 0}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Slides do carrossel */}
          <div className="relative">
            {/* Para desktop: grid de 3 colunas */}
            <div className="hidden md:grid md:grid-cols-3 gap-6">
              {visibleTestimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl border ${themeClasses.border} ${themeClasses.bg.card} transition-all duration-300 ${
                    testimonial.position === "center" ?
                      "scale-105 shadow-lg"
                    : "opacity-80 scale-95"
                  }`}
                >
                  {/* Rating */}
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>

                  {/* Conteúdo */}
                  <p className={`italic mb-6 ${themeClasses.text.secondary}`}>
                    "{testimonial.content}"
                  </p>

                  {/* Autor */}
                  <div className="flex items-center">
                    <div className="flex-1">
                      <h4 className={`font-bold ${themeClasses.text.primary}`}>
                        {testimonial.name}
                      </h4>
                      <p className={`text-sm ${themeClasses.text.secondary}`}>
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Para mobile: apenas 1 card */}
            <div className="md:hidden">
              {visibleTestimonials.length > 0 && (
                <div
                  className={`p-6 rounded-xl border ${themeClasses.border} ${themeClasses.bg.card} transition-all duration-300`}
                >
                  {/* Rating */}
                  <div className="flex mb-4">
                    {[...Array(visibleTestimonials[0].rating || 5)].map(
                      (_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-yellow-400 fill-current"
                        />
                      )
                    )}
                  </div>

                  {/* Conteúdo */}
                  <p className={`italic mb-6 ${themeClasses.text.secondary}`}>
                    "{visibleTestimonials[0].content}"
                  </p>

                  {/* Autor */}
                  <div className="flex items-center">
                    <div className="flex-1">
                      <h4 className={`font-bold ${themeClasses.text.primary}`}>
                        {visibleTestimonials[0].name}
                      </h4>
                      <p className={`text-sm ${themeClasses.text.secondary}`}>
                        {visibleTestimonials[0].role}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Contador */}
          <div className="text-center mt-6">
            <span className={`text-sm ${themeClasses.text.secondary}`}>
              {t("carousel.counter", {
                current: currentSlide + 1,
                total: testimonials.length,
              })}
            </span>
          </div>
        </div>

        {/* CTA Final minimalista */}
        <div
          className={`p-8 rounded-xl text-center ${themeClasses.bg.card} border ${themeClasses.border} mt-8`}
        >
          <div className="max-w-2xl mx-auto">
            <h3
              className={`text-2xl font-bold mb-4 ${themeClasses.text.primary}`}
            >
              {t("cta.title")}
            </h3>

            <p className={`mb-6 ${themeClasses.text.secondary}`}>
              {t("cta.subtitle")}
            </p>

            <button
              type="button"
              onClick={() => (window.location.href = "/auth/login")}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${theme === "light" ? "bg-gray-900 text-white hover:bg-gray-800" : "bg-white text-gray-900 hover:bg-gray-100"}`}
            >
              {t("cta.button")}
            </button>

            {/* Vantagens */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {Array.isArray(features) &&
                features.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className={themeClasses.text.secondary}>{item}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TestimonialsSection;
