//frontend/src/public/landing/LandingHeader.jsx
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  ChevronRight,
  Sparkles,
  Zap,
  Search,
  BarChart3,
  Edit3,
  Palette,
  Bot,
  TrendingUp,
  LayoutDashboard,
  Calendar,
  FileText,
  Users,
  HelpCircle,
  BookOpen,
  LogIn,
  UserPlus,
  DollarSign,
} from "lucide-react";
import Container from "../components/Container";
import ThemeToggle from "../components/ThemeToggle";
import { useTheme } from "../../app/bootstrap/theme-provider";
import { useTranslation } from "../../shared/hooks/use-translation.hook";
import LanguageSwitcher from "../../shared/ui/language-switcher/LanguageSwitcher";

// SVG do Google como alternativa
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

const LandingHeader = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme = "cyberpunk" } = useTheme();
  const { t } = useTranslation("landingheader");

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

  // Configurações de tema
  const themeStyles = useMemo(() => {
    const base = {
      light: {
        bg: {
          header: scrolled ? "bg-white/95 backdrop-blur-lg" : "bg-transparent",
          card: "bg-white",
          mobile: "bg-white",
        },
        text: {
          primary: "text-gray-900",
          secondary: "text-gray-600",
          hover: "hover:text-blue-600",
          accent: "text-blue-600",
        },
        border: {
          primary: "border-gray-200",
        },
        shadow: "shadow-lg",
      },
      dark: {
        bg: {
          header:
            scrolled ? "bg-gray-900/95 backdrop-blur-lg" : "bg-transparent",
          card: "bg-gray-900",
          mobile: "bg-gray-900",
        },
        text: {
          primary: "text-white",
          secondary: "text-gray-300",
          hover: "hover:text-purple-400",
          accent: "text-purple-400",
        },
        border: {
          primary: "border-gray-800",
        },
        shadow: "shadow-2xl",
      },
      cyberpunk: {
        bg: {
          header:
            scrolled ? "bg-gray-900/95 backdrop-blur-lg" : "bg-transparent",
          card: "bg-gray-900/95 backdrop-blur-xl",
          mobile: "bg-gray-900/95 backdrop-blur-xl",
        },
        text: {
          primary: "text-white",
          secondary: "text-gray-300",
          hover: "hover:text-purple-400",
          accent: "text-purple-400",
        },
        border: {
          primary: "border-gray-800/50",
        },
        shadow: "shadow-2xl shadow-purple-500/10",
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
            color: "text-blue-500",
            description: t("features.descriptions.keywordResearch"),
          },
          {
            name: t("features.items.competitorAnalysis"),
            Icon: Users,
            color: "text-purple-500",
            description: t("features.descriptions.competitorAnalysis"),
          },
          {
            name: t("features.items.titleOptimization"),
            Icon: Edit3,
            color: "text-pink-500",
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
            color: "text-green-500",
            description: t("features.descriptions.thumbnailGenerator"),
          },
          {
            name: t("features.items.automatedScripts"),
            Icon: Bot,
            color: "text-cyan-500",
            description: t("features.descriptions.automatedScripts"),
          },
          {
            name: t("features.items.trendAnalysis"),
            Icon: TrendingUp,
            color: "text-orange-500",
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
            color: "text-yellow-500",
            description: t("features.descriptions.realtimeDashboard"),
          },
          {
            name: t("features.items.contentCalendar"),
            Icon: Calendar,
            color: "text-red-500",
            description: t("features.descriptions.contentCalendar"),
          },
          {
            name: t("features.items.detailedReports"),
            Icon: FileText,
            color: "text-indigo-500",
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
        Icon: Sparkles,
        onClick: null,
      },
      {
        label: t("navigation.pricing"),
        Icon: DollarSign,
        onClick: () => scrollToSection("pricing"),
      },
      {
        label: t("navigation.blog"),
        Icon: BookOpen,
        href: "/blog",
        onClick: null,
      },
      {
        label: t("navigation.help"),
        Icon: HelpCircle,
        href: "/help",
        onClick: null,
      },
    ],
    [t, scrollToSection],
  );

  // Classes do header
  const headerClasses = useMemo(
    () =>
      scrolled ?
        `${themeStyles.bg.header} border-b ${themeStyles.border.primary} py-3 transition-all duration-300 ${themeStyles.shadow}`
      : "bg-transparent py-5 transition-all duration-300",
    [scrolled, themeStyles],
  );

  // Funções auxiliares
  const getButtonGradient = useCallback(() => {
    if (theme === "cyberpunk")
      return "from-purple-600 via-pink-600 to-blue-600";
    if (theme === "dark") return "from-purple-600 to-pink-600";
    return "from-blue-600 to-purple-600";
  }, [theme]);

  const getHoverBg = useCallback(
    () => (theme === "light" ? "hover:bg-gray-100" : "hover:bg-gray-800/50"),
    [theme],
  );

  // Estado para dropdown
  const [isFeaturesDropdownOpen, setIsFeaturesDropdownOpen] = useState(false);

  // Componente Logo
  const Logo = useMemo(
    () => (
      <div
        className="flex items-center space-x-3 group cursor-pointer"
        onClick={() => scrollToSection("home")}
      >
        <div className="relative">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform ${
              theme === "cyberpunk" ?
                "bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 shadow-purple-500/30"
              : theme === "dark" ?
                "bg-gradient-to-br from-purple-600 to-blue-600"
              : "bg-gradient-to-br from-blue-500 to-purple-500"
            }`}
          >
            <Zap className="w-5 h-5 text-white" fill="white" />
          </div>
        </div>
        <div>
          <h1
            className={`text-2xl font-bold bg-gradient-to-r ${
              theme === "cyberpunk" ? "from-white via-purple-100 to-blue-100"
              : theme === "dark" ? "from-white to-gray-200"
              : "from-blue-600 to-purple-600"
            } bg-clip-text text-transparent`}
          >
            Ninja
            <span
              className={
                theme === "light" ? "text-purple-600" : "text-purple-400"
              }
            >
              Tube
            </span>
          </h1>
          <p
            className={`text-xs -mt-1 font-medium hidden md:block ${
              theme === "light" ? "text-gray-500" : "text-gray-400"
            }`}
          >
            {t("logo.slogan")}
          </p>
        </div>
      </div>
    ),
    [theme, scrollToSection, t],
  );

  // Componente Dropdown Desktop
  const DesktopDropdown = () => (
    <div
      className={`absolute top-full left-0 mt-2 w-[800px] rounded-2xl ${themeStyles.shadow} border ${
        isFeaturesDropdownOpen ?
          "visible opacity-100 translate-y-0"
        : "invisible opacity-0 translate-y-2"
      } transition-all duration-300 p-6 ${themeStyles.bg.card} ${themeStyles.border.primary}`}
      onMouseEnter={() => setIsFeaturesDropdownOpen(true)}
      onMouseLeave={() => setIsFeaturesDropdownOpen(false)}
    >
      <div className="grid grid-cols-3 gap-8">
        {features.map((category, idx) => (
          <div key={idx}>
            <h3
              className={`text-sm font-semibold uppercase tracking-wider mb-4 ${
                theme === "light" ? "text-gray-500" : "text-gray-400"
              }`}
            >
              {category.category}
            </h3>
            <div className="space-y-3">
              {category.items.map((item, itemIdx) => (
                <a
                  key={itemIdx}
                  href="#"
                  className={`flex items-center space-x-3 p-3 rounded-xl transition-all group/item ${
                    theme === "light" ? "hover:bg-gray-50" : (
                      "hover:bg-gray-800/50"
                    )
                  }`}
                  onClick={() => setIsFeaturesDropdownOpen(false)}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      theme === "light" ? "bg-gray-100" : "bg-gray-800/50"
                    } ${item.color}`}
                  >
                    <item.Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div
                      className={`font-medium transition-colors ${
                        theme === "light" ?
                          "text-gray-900 group-hover/item:text-blue-600"
                        : "text-white group-hover/item:text-purple-300"
                      }`}
                    >
                      {item.name}
                    </div>
                    <div
                      className={`text-xs mt-1 ${
                        theme === "light" ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      {item.description}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div
        className={`mt-6 pt-6 border-t ${
          theme === "light" ? "border-gray-200" : "border-gray-800"
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h4 className={themeStyles.text.primary}>{t("dropdown.title")}</h4>
            <p
              className={`text-sm ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}
            >
              {t("dropdown.description")}
            </p>
          </div>
          <button
            className={`px-6 py-3 text-white font-semibold rounded-xl transition-all hover:scale-105 bg-gradient-to-r ${getButtonGradient()}`}
            onClick={() => {
              setIsFeaturesDropdownOpen(false);
              scrollToSection("pricing");
            }}
          >
            {t("dropdown.button")}
          </button>
        </div>
      </div>
    </div>
  );

  // Componente Mobile Menu
  const MobileMenu = () => {
    const [mobileExpandedResources, setMobileExpandedResources] =
      useState(false);

    return (
      <div
        className={`lg:hidden fixed inset-x-0 top-16 bottom-0 z-50 overflow-y-auto ${
          themeStyles.bg.mobile
        } ${themeStyles.border.primary} animate-slideIn`}
      >
        <div className="p-6">
          <div className="space-y-2 mb-8">
            {navLinks.map((link, idx) => (
              <div
                key={idx}
                className={`rounded-xl overflow-hidden ${themeStyles.border.primary}`}
              >
                {link.hasDropdown ?
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setMobileExpandedResources(!mobileExpandedResources);
                      }}
                      className={`flex items-center justify-between w-full text-left font-medium p-4 ${getHoverBg()} transition-all ${themeStyles.text.primary}`}
                    >
                      <div className="flex items-center space-x-3">
                        <link.Icon className="w-5 h-5" />
                        <span className="font-semibold">{link.label}</span>
                      </div>
                      <ChevronRight
                        className={`w-5 h-5 transition-transform ${
                          mobileExpandedResources ? "rotate-90" : ""
                        }`}
                      />
                    </button>

                    {mobileExpandedResources && (
                      <div className="px-4 pb-4 space-y-2">
                        {features.map((category, catIdx) => (
                          <div key={catIdx} className="mb-4">
                            <h4
                              className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
                                themeStyles.text.secondary
                              }`}
                            >
                              {category.category}
                            </h4>
                            <div className="space-y-2">
                              {category.items.map((item, itemIdx) => (
                                <a
                                  key={itemIdx}
                                  href="#"
                                  className={`flex items-center space-x-3 p-2.5 rounded-lg transition-all ${getHoverBg()} ${themeStyles.text.secondary} ${themeStyles.text.hover}`}
                                  onClick={() => {
                                    setMobileExpandedResources(false);
                                    setIsMenuOpen(false);
                                  }}
                                >
                                  <div
                                    className={`p-1.5 rounded ${item.color}`}
                                  >
                                    <item.Icon className="w-4 h-4" />
                                  </div>
                                  <span>{item.name}</span>
                                </a>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                : <button
                    onClick={() => {
                      if (link.onClick) link.onClick();
                      else if (link.href) window.location.href = link.href;
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center space-x-3 w-full text-left p-4 ${getHoverBg()} transition-all ${themeStyles.text.primary}`}
                  >
                    <link.Icon className="w-5 h-5" />
                    <span className="font-semibold">{link.label}</span>
                  </button>
                }
              </div>
            ))}
          </div>

          <div className="space-y-4 mb-8">
            <button
              onClick={goToLogin}
              className={`w-full flex items-center justify-center space-x-3 px-6 py-4 font-bold rounded-xl transition-all ${
                theme === "light" ?
                  "bg-white border border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50"
                : "bg-gray-800 border border-gray-700 text-gray-300 hover:border-gray-600 hover:bg-gray-800/70"
              }`}
            >
              <div className="flex items-center justify-center w-6 h-6">
                <GoogleIcon />
              </div>
              <span>{t("mobile.googleSignIn")}</span>
            </button>

            <button
              onClick={() => {
                setIsMenuOpen(false);
                scrollToSection("pricing");
              }}
              className={`w-full flex items-center justify-center space-x-3 px-6 py-4 font-bold rounded-xl transition-all bg-gradient-to-r ${getButtonGradient()} text-white hover:shadow-lg`}
            >
              <UserPlus className="w-5 h-5" />
              <span>{t("mobile.emailSignUp")}</span>
            </button>

            <div className="text-center pt-4">
              <span className={`text-sm ${themeStyles.text.secondary}`}>
                {t("mobile.haveAccount")}{" "}
              </span>
              <button
                onClick={goToLogin}
                className={`text-sm font-semibold ${themeStyles.text.accent} hover:underline`}
              >
                <span className="flex items-center space-x-1">
                  <LogIn className="w-4 h-4" />
                  <span>{t("mobile.login")}</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerClasses}`}
    >
      <Container>
        <div className="flex items-center justify-between">
          {Logo}

          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link, idx) => (
              <div
                key={idx}
                className="relative group"
                onMouseEnter={() =>
                  link.hasDropdown && setIsFeaturesDropdownOpen(true)
                }
                onMouseLeave={() =>
                  link.hasDropdown && setIsFeaturesDropdownOpen(false)
                }
              >
                <button
                  onClick={() => {
                    if (link.onClick) link.onClick();
                    else if (link.href) window.location.href = link.href;
                  }}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-all duration-200 font-medium ${
                    themeStyles.text.secondary
                  } ${themeStyles.text.hover} ${
                    theme === "light" ? "hover:bg-gray-100" : (
                      "hover:bg-gray-800/50"
                    )
                  }`}
                >
                  {link.Icon && <link.Icon className="w-4 h-4" />}
                  <span>{link.label}</span>
                  {link.hasDropdown && (
                    <ChevronRight className="w-4 h-4 transform group-hover:rotate-90 transition-transform" />
                  )}
                </button>
                {link.hasDropdown && <DesktopDropdown />}
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-3">
            <LanguageSwitcher />
            <ThemeToggle />

            <button
              onClick={goToLogin}
              className={`flex items-center space-x-2 px-5 py-2.5 font-medium rounded-lg transition-all border ${
                theme === "light" ? "border-gray-300" : "border-gray-700"
              } ${themeStyles.text.secondary} ${themeStyles.text.hover} ${getHoverBg()}`}
            >
              <UserPlus className="w-4 h-4" />
              <span>{t("buttons.login")}</span>
            </button>

            <button
              onClick={() => scrollToSection("pricing")}
              className={`group relative flex items-center space-x-3 px-6 py-3 font-bold rounded-xl overflow-hidden transition-all bg-gradient-to-r ${getButtonGradient()} text-white hover:shadow-xl`}
            >
              <div className="relative z-10 flex items-center space-x-3">
                <div className="bg-white p-1 rounded-lg">
                  <GoogleIcon />
                </div>
                <span>{t("buttons.startFree")}</span>
              </div>
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity ${
                  theme === "cyberpunk" ?
                    "bg-gradient-to-r from-purple-700 via-pink-700 to-blue-700"
                  : theme === "dark" ?
                    "bg-gradient-to-r from-purple-700 to-pink-700"
                  : "bg-gradient-to-r from-blue-700 to-purple-700"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center space-x-2 lg:hidden">
            <LanguageSwitcher />
            <ThemeToggle />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
              className={`p-2.5 rounded-lg transition-colors ${
                theme === "light" ?
                  "bg-gray-100 text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                : "bg-gray-800/50 text-gray-300 hover:text-white hover:bg-gray-800"
              }`}
              aria-label={isMenuOpen ? t("aria.closeMenu") : t("aria.openMenu")}
            >
              {isMenuOpen ?
                <X className="w-6 h-6" />
              : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && <MobileMenu />}
      </Container>
    </header>
  );
};

export default LandingHeader;
