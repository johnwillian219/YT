import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useTheme } from "../../app/bootstrap/theme-provider";
import { useTranslation } from "../../shared/hooks/use-translation.hook";
import Container from "../components/Container";

// Componentes
import TestimonialsHeader from "./components/testimonial/TestimonialsHeader";
import TestimonialCard from "./components/testimonial/TestimonialCard";
import CarouselControls from "./components/testimonial/CarouselControls";
import CTASection from "./components/testimonial/CTASection";
import TestimonialsBackground from "./components/testimonial/TestimonialsBackground";

const TestimonialsSection = () => {
  const { theme = "cyberpunk" } = useTheme();
  const { t } = useTranslation("testimonials");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Carrega testimonials
  const testimonials = useMemo(() => {
    const loaded = t("testimonials", { returnObjects: true });
    return Array.isArray(loaded) && loaded.length > 0 ? loaded : [];
  }, [t]);

  // Responsividade com debounce
  useEffect(() => {
    let timeoutId;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowWidth(window.innerWidth);
      }, 100);
    };

    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Funções de navegação
  const slideTo = useCallback(
    (index) => {
      if (isAnimating || testimonials.length === 0) return;

      setIsAnimating(true);
      setCurrentSlide(index);

      setTimeout(() => setIsAnimating(false), 300);
    },
    [isAnimating, testimonials.length],
  );

  const nextSlide = useCallback(() => {
    slideTo(currentSlide === testimonials.length - 1 ? 0 : currentSlide + 1);
  }, [currentSlide, testimonials.length, slideTo]);

  const prevSlide = useCallback(() => {
    slideTo(currentSlide === 0 ? testimonials.length - 1 : currentSlide - 1);
  }, [currentSlide, testimonials.length, slideTo]);

  // Auto-slide para desktop
  useEffect(() => {
    if (windowWidth < 768) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide, windowWidth, nextSlide]);

  // Calcula testimonials visíveis
  const visibleTestimonials = useMemo(() => {
    if (!Array.isArray(testimonials) || testimonials.length === 0) {
      return [];
    }

    if (windowWidth < 768) {
      return [testimonials[currentSlide]];
    }

    const slides = [];
    for (let i = -1; i <= 1; i++) {
      const index =
        (currentSlide + i + testimonials.length) % testimonials.length;
      slides.push({
        ...testimonials[index],
        position: i === 0 ? "center" : i === -1 ? "left" : "right",
      });
    }
    return slides;
  }, [testimonials, currentSlide, windowWidth]);

  return (
    <section
      id="testimonials"
      className="relative py-16 md:py-24 overflow-hidden"
    >
      <TestimonialsBackground theme={theme} />

      <Container className="relative">
        {/* Header */}
        <TestimonialsHeader theme={theme} t={t} />

        {/* Carrossel */}
        <div className="mb-16">
          {/* Controles */}
          <CarouselControls
            theme={theme}
            onPrev={prevSlide}
            onNext={nextSlide}
            currentSlide={currentSlide}
            totalSlides={testimonials.length}
            onGoToSlide={slideTo}
            t={t}
          />

          {/* Cards - Mobile (scroll horizontal) */}
          <div className="lg:hidden overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4 px-4 pb-4">
            <div className="flex gap-4" style={{ minWidth: "min-content" }}>
              {testimonials.map((testimonial, index) => (
                <div
                  key={`${testimonial.name}-${index}`}
                  className="min-w-[85vw] max-w-[85vw] snap-center"
                >
                  <TestimonialCard testimonial={testimonial} theme={theme} />
                </div>
              ))}
            </div>
          </div>

          {/* Cards - Desktop (grid 3 colunas) */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {visibleTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={`${testimonial.name}-${index}-${testimonial.position}`}
                testimonial={testimonial}
                position={testimonial.position}
                theme={theme}
              />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto">
          <CTASection theme={theme} t={t} />
        </div>
      </Container>

      {/* Estilos de animação */}
      <style jsx global>{`
        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slideUp {
          animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;
