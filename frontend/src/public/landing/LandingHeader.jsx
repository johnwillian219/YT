// frontend/src/public/landing/LandingHeader.jsx (atualizado)
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Container from "../components/Container";
import { useTheme } from "../../app/bootstrap/theme-provider";
import { useTranslation } from "../../shared/hooks/use-translation.hook";
import { useI18n } from "../../app/bootstrap/i18n-provider";

// Componentes
import HeaderLogo from "./components/header/HeaderLogo";
import ThemeToggle from "./components/header/ThemeToggle";
import LanguageSwitcher from "./components/header/LanguageSwitcher";
import DesktopNav from "./components/header/DesktopNav";
import HeaderButtons from "./components/header/HeaderButtons";
import MobileMenu from "./components/header/MobileMenu";

// Ícones para as features
import {
  Search,
  Users,
  Edit3,
  Palette,
  Bot,
  TrendingUp,
  LayoutDashboard,
  Calendar,
  FileText,
} from "lucide-react";

const LandingHeader = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isFeaturesDropdownOpen, setIsFeaturesDropdownOpen] = useState(false);

  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation("landingheader");
  const { locale, setLocale, isLoading: i18nLoading } = useI18n();

  // Efeito de scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fechar menu quando clicar fora
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMenuOpen && !e.target.closest("header")) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen]);

  // Função para rolar suavemente
  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMenuOpen(false);
  }, []);

  // Função para navegar para login
  const goToLogin = useCallback(() => {
    navigate("/auth/login");
    setIsMenuOpen(false);
  }, [navigate]);

  // Configurações de tema para o header
  const getHeaderStyles = useMemo(() => {
    const base = {
      light: {
        bg: scrolled
          ? "bg-white/95 backdrop-blur-lg shadow-lg"
          : "bg-transparent",
        border: "border-gray-200",
        mobileButton:
          "bg-white hover:bg-blue-50 text-gray-700 hover:text-blue-600 border border-gray-300 hover:border-blue-400 hover:shadow-md",
      },
      dark: {
        bg: scrolled
          ? "bg-gray-900/95 backdrop-blur-lg shadow-2xl"
          : "bg-transparent",
        border: "border-gray-800",
        mobileButton:
          "bg-gray-800/50 hover:bg-purple-500/20 text-gray-300 hover:text-white border border-gray-700 hover:border-gray-600",
      },
      cyberpunk: {
        bg: scrolled
          ? "bg-gray-900/95 backdrop-blur-xl shadow-2xl shadow-cyan-500/10"
          : "bg-transparent",
        border: "border-cyan-500/30",
        mobileButton:
          "bg-gray-900/20 hover:bg-cyan-500/20 text-cyan-300 hover:text-cyan-200 border border-cyan-500/30 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(0,240,255,0.2)]",
      },
    };
    return base[theme] || base.cyberpunk;
  }, [theme, scrolled]);

  // Dados das features
  const features = useMemo(
    () => [
      {
        category: t("features.categories.seo"),
        items: [
          {
            name: t("features.items.keywordResearch"),
            Icon: Search,
            description: t("features.descriptions.keywordResearch"),
          },
          {
            name: t("features.items.competitorAnalysis"),
            Icon: Users,
            description: t("features.descriptions.competitorAnalysis"),
          },
          {
            name: t("features.items.titleOptimization"),
            Icon: Edit3,
            description: t("features.descriptions.titleOptimization"),
          },
        ],
      },
      {
        category: t("features.categories.ai"),
        items: [
          {
            name: t("features.items.thumbnailGenerator"),
            Icon: Palette,
            description: t("features.descriptions.thumbnailGenerator"),
          },
          {
            name: t("features.items.automatedScripts"),
            Icon: Bot,
            description: t("features.descriptions.automatedScripts"),
          },
          {
            name: t("features.items.trendAnalysis"),
            Icon: TrendingUp,
            description: t("features.descriptions.trendAnalysis"),
          },
        ],
      },
      {
        category: t("features.categories.management"),
        items: [
          {
            name: t("features.items.realtimeDashboard"),
            Icon: LayoutDashboard,
            description: t("features.descriptions.realtimeDashboard"),
          },
          {
            name: t("features.items.contentCalendar"),
            Icon: Calendar,
            description: t("features.descriptions.contentCalendar"),
          },
          {
            name: t("features.items.detailedReports"),
            Icon: FileText,
            description: t("features.descriptions.detailedReports"),
          },
        ],
      },
    ],
    [t],
  );

  // Links de navegação
  const navLinks = useMemo(
    () => [
      {
        label: t("navigation.features"),
        hasDropdown: true,
        Icon: (props) => (
          <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
          </svg>
        ),
      },
      {
        label: t("navigation.pricing"),
        Icon: (props) => (
          <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ),
        onClick: () => scrollToSection("pricing"),
      },
      {
        label: t("navigation.blog"),
        Icon: (props) => (
          <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            />
          </svg>
        ),
        href: "/blog",
      },
      {
        label: t("navigation.help"),
        Icon: (props) => (
          <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ),
        href: "/help",
      },
    ],
    [t, scrollToSection],
  );

  const headerStyles = getHeaderStyles;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${headerStyles.border} ${headerStyles.bg} ${scrolled ? "py-3" : "py-5"}`}
    >
      <Container>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <HeaderLogo theme={theme} scrollToSection={scrollToSection} t={t} />

          {/* Navegação Desktop */}
          <DesktopNav
            theme={theme}
            t={t}
            navLinks={navLinks}
            features={features}
            isFeaturesDropdownOpen={isFeaturesDropdownOpen}
            setIsFeaturesDropdownOpen={setIsFeaturesDropdownOpen}
            scrollToSection={scrollToSection}
          />

          {/* Botões Desktop */}
          <div className="hidden lg:flex items-center space-x-3">
            <LanguageSwitcher
              locale={locale}
              setLocale={setLocale}
              isLoading={i18nLoading}
              theme={theme}
              size="desktop"
            />
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <HeaderButtons
              theme={theme}
              goToLogin={goToLogin}
              scrollToSection={scrollToSection}
              t={t}
            />
          </div>

          {/* Controles Mobile - TODOS COM MESMA ALTURA */}
          <div className="flex items-center space-x-2 lg:hidden">
            <LanguageSwitcher
              locale={locale}
              setLocale={setLocale}
              isLoading={i18nLoading}
              theme={theme}
              size="mobile"
            />
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
              className={`p-2.5 rounded-lg transition-all duration-200 ${headerStyles.mobileButton} h-11 w-11 flex items-center justify-center`}
              aria-label={isMenuOpen ? t("aria.closeMenu") : t("aria.openMenu")}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        <MobileMenu
          theme={theme}
          t={t}
          navLinks={navLinks}
          features={features}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          goToLogin={goToLogin}
          scrollToSection={scrollToSection}
        />
      </Container>
    </header>
  );
};

export default LandingHeader;
