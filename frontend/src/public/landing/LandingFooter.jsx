import React from "react";
import {
  Youtube,
  Instagram,
  Facebook,
  Mail,
  MapPin,
  Heart,
  Zap,
  ArrowRight,
  Shield,
  Users,
  TrendingUp,
} from "lucide-react";
import WhatsAppIcon from "../../assets/images/icons/WhatsAppIcon";
import { useTheme } from "../../app/bootstrap/theme-provider";
import { useTranslation } from "../../shared/hooks/use-translation.hook";
import Container from "../components/Container";

const LandingFooter = () => {
  const { theme } = useTheme();
  const { t } = useTranslation("footer");
  const isLight = theme === "light";

  // Obtém dados das seções do footer
  const sections = t("sections", { returnObjects: true }) || {};

  const footerLinks = {
    product: {
      title: sections.product?.title || "Produto",
      links: sections.product?.links || [],
    },
    company: {
      title: sections.company?.title || "Empresa",
      links: sections.company?.links || [],
    },
    support: {
      title: sections.support?.title || "Suporte",
      links: sections.support?.links || [],
    },
    legal: {
      title: sections.legal?.title || "Legal",
      links: sections.legal?.links || [],
    },
  };

  // Obtém dados das redes sociais
  const socialLabels = t("social", { returnObjects: true }) || {};

  const socials = [
    {
      icon: <Youtube className="w-4 h-4" />,
      href: "#",
      label: socialLabels.youtube || "YouTube",
      color: "hover:bg-red-500/10 hover:text-red-500",
    },
    {
      icon: <Instagram className="w-4 h-4" />,
      href: "#",
      label: socialLabels.instagram || "Instagram",
      color: "hover:bg-pink-500/10 hover:text-pink-500",
    },
    {
      icon: <Facebook className="w-4 h-4" />,
      href: "#",
      label: socialLabels.facebook || "Facebook",
      color: "hover:bg-blue-600/10 hover:text-blue-600",
    },
    {
      icon: <WhatsAppIcon className="w-4 h-4" />,
      href: "#",
      label: socialLabels.whatsapp || "WhatsApp",
      color: "hover:bg-green-500/10 hover:text-green-500",
    },
  ];

  // Obtém dados do copyright
  const copyright = t("copyright", { returnObjects: true }) || {};

  // Prepara o texto do copyright com substituição do ano
  const copyrightText =
    copyright.text?.replace("{year}", new Date().getFullYear().toString()) ||
    `© ${new Date().getFullYear()} NinjaTube • All rights reserved`;

  return (
    <footer
      className={`relative ${isLight ? "bg-gray-50" : "bg-gray-900/30"} pt-16 pb-8`}
    >
      {/* Gradiente sutil no topo */}
      <div
        className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent`}
      />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          {/* Logo e Descrição */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div
                className={`p-2 rounded-xl mr-3 bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg`}
              >
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <span
                  className={`text-2xl font-bold ${isLight ? "text-gray-900" : "text-white"}`}
                >
                  <span className="text-white">Ninja</span>
                  <span className="text-blue-500">Tube</span>
                </span>
                <div
                  className={`text-xs ${isLight ? "text-gray-500" : "text-gray-400"} mt-1`}
                >
                  {t("brand.tagline")}
                </div>
              </div>
            </div>

            <p
              className={`max-w-sm mb-8 ${isLight ? "text-gray-600" : "text-gray-400"}`}
            >
              {t("brand.description")}
            </p>

            {/* Newsletter */}
            <div className="mb-8">
              <h4
                className={`font-semibold mb-3 ${isLight ? "text-gray-900" : "text-white"}`}
              >
                {t("newsletter.title")}
              </h4>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder={t("newsletter.placeholder")}
                  className={`flex-1 px-4 py-2.5 rounded-lg text-sm ${
                    isLight ?
                      "bg-white border border-gray-200 text-gray-900 placeholder-gray-500"
                    : "bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
                />
                <button
                  className={`px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium text-sm flex items-center justify-center hover:shadow-lg hover:shadow-blue-500/25 transition-all`}
                >
                  {t("newsletter.button")}
                  <ArrowRight className="w-3.5 h-3.5 ml-2" />
                </button>
              </div>
              <p
                className={`text-xs mt-2 ${isLight ? "text-gray-500" : "text-gray-400"}`}
              >
                {t("newsletter.note")}
              </p>
            </div>
          </div>

          {/* Links organizados */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {Object.entries(footerLinks).map(([key, section]) => (
                <div key={key}>
                  <h4
                    className={`font-bold text-sm mb-4 ${isLight ? "text-gray-900" : "text-white"}`}
                  >
                    {section.title}
                  </h4>
                  <ul className="space-y-3">
                    {Array.isArray(section.links) &&
                      section.links.map((link, index) => (
                        <li key={index}>
                          <a
                            href={link.href || "#"}
                            className={`group flex items-center text-sm transition-all ${
                              isLight ?
                                "text-gray-600 hover:text-blue-600"
                              : "text-gray-400 hover:text-blue-400"
                            }`}
                          >
                            {/* Ícones podem ser adicionados se necessário */}
                            {link.icon && (
                              <span
                                className={`mr-2 opacity-60 group-hover:opacity-100 transition-opacity`}
                              >
                                {link.icon}
                              </span>
                            )}
                            <span className="group-hover:translate-x-1 transition-transform">
                              {link.name}
                            </span>
                          </a>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`pt-8 border-t ${isLight ? "border-gray-200" : "border-gray-800/50"}`}
        >
          {/* Grid com 3 colunas - Centraliza o meio */}
          <div className="grid grid-cols-1 md:grid-cols-3 items-center">
            {/* Coluna esquerda - Opcional */}
            <div className="hidden md:block"></div>

            {/* Coluna central - Redes sociais */}
            <div className="flex items-center justify-center gap-3 md:gap-4">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`p-2 md:p-2.5 rounded-lg transition-all ${social.color} ${
                    isLight ?
                      "bg-gray-100 text-gray-600"
                    : "bg-gray-800/50 text-gray-400"
                  }`}
                  aria-label={social.label}
                  title={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Coluna direita - Opcional */}
            <div className="hidden md:block"></div>
          </div>

          {/* Copyright e Afiliados */}
          <div className="mt-8 text-center">
            <div
              className={`text-sm ${isLight ? "text-gray-500" : "text-gray-500"} mb-3`}
            >
              <span className="flex items-center justify-center flex-wrap gap-2">
                {copyrightText}
                <Heart className="w-3.5 h-3.5 text-red-500 mx-1" />
                {copyright.notAffiliated && (
                  <>
                    <span className="hidden sm:inline">•</span>
                    <span className="text-xs opacity-75">
                      {copyright.notAffiliated}
                    </span>
                  </>
                )}
              </span>
            </div>

            <div
              className={`text-xs ${isLight ? "text-gray-400" : "text-gray-500"}`}
            >
              <span className="inline-flex items-center">
                <Shield className="w-3 h-3 mr-1" />
                {copyright.secure || "Site seguro • Protegido com SSL"}
              </span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default LandingFooter;
