// frontend/src/shared/hooks/use-language-transition.js
import { useEffect, useState } from "react";
import { useI18n } from "../../app/bootstrap/i18n-provider";

export function useLanguageTransition() {
  const { isTransitioning } = useI18n();
  const [isVisible, setIsVisible] = useState(true);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (isTransitioning) {
      setShouldAnimate(true);
      // Pequeno delay antes de iniciar fade out
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(true);
      // Remove a classe de animação após a transição
      const timer = setTimeout(() => {
        setShouldAnimate(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  return {
    isTransitioning,
    transitionClasses:
      shouldAnimate ?
        `transition-all duration-500 ${isVisible ? "opacity-100" : "opacity-30"}`
      : "opacity-100",
  };
}
