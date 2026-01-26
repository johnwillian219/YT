import React from "react";
import { useTheme } from "../../app/bootstrap/theme-provider";
import { useTranslation } from "../../shared/hooks/use-translation.hook";
import Container from "../components/Container";

// Componentes
import FooterBackground from "./components/footer/FooterBackground";
import FooterHeader from "./components/footer/FooterHeader";
import FooterLinksGrid from "./components/footer/FooterLinksGrid";
import FooterNewsletter from "./components/footer/FooterNewsletter";
import FooterSocial from "./components/footer/FooterSocial";
import FooterCopyright from "./components/footer/FooterCopyright";

const LandingFooter = () => {
  const { theme = "light" } = useTheme();
  const { t } = useTranslation("footer");

  return (
    <footer className="relative pt-20 pb-12 overflow-hidden">
      <FooterBackground theme={theme} />

      <Container className="relative">
        {/* Seção 1: Logo + Links lado a lado */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          {/* Logo e descrição - 5 colunas */}
          <div className="lg:col-span-5">
            <FooterHeader theme={theme} t={t} />
          </div>

          {/* Links do footer - 7 colunas */}
          <div className="lg:col-span-7">
            <FooterLinksGrid theme={theme} t={t} />
          </div>
        </div>

        {/* Seção 2: Newsletter e Redes Sociais lado a lado */}
        <div className="mb-16">
          <div
            className={`p-8 rounded-2xl ${
              theme === "light"
                ? "bg-white border border-gray-200 shadow-lg"
                : theme === "cyberpunk"
                  ? "bg-gray-900/40 border border-cyan-500/20"
                  : "bg-gray-800/30 border border-gray-700"
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              {/* Newsletter - Lado esquerdo */}
              <div className="lg:border-r lg:pr-10 border-gray-300/50">
                <FooterNewsletter theme={theme} t={t} />
              </div>

              {/* Redes Sociais - Lado direito */}
              <div className="lg:pl-10">
                <FooterSocial theme={theme} t={t} />
              </div>
            </div>
          </div>
        </div>

        {/* Seção 3: Copyright */}
        <FooterCopyright theme={theme} t={t} />
      </Container>
    </footer>
  );
};

export default LandingFooter;
