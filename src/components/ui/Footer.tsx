"use client";

import React from 'react';
import { 
  FiGithub, 
  FiLinkedin, 
  FiTwitter, 
  FiInstagram, 
  FiMail, 
  FiMapPin, 
  FiArrowUp 
} from "react-icons/fi";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

type TranslationKey = keyof typeof translations['es'];

interface FooterLinkGroup {
  titleKey: TranslationKey;
  links: { nameKey: TranslationKey; href: string }[];
}

const FOOTER_LINKS: FooterLinkGroup[] = [
  {
    titleKey: "nav.services",
    links: [
      { nameKey: "hero.tag.software", href: "#servicios" },
      { nameKey: "services.02.title", href: "#servicios" },
      { nameKey: "hero.tag.infra", href: "#servicios" },
      { nameKey: "hero.tag.auto", href: "#servicios" },
    ]
  }
];

export const Footer = () => {
  const { t } = useLanguage();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-transparent pt-24 pb-12 overflow-hidden border-t border-border/50">
      {/* Decorative center border line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-neutral-500/10 to-transparent" />

      <div className="container mx-auto max-w-[83rem] px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <span className="font-sans font-bold text-sm tracking-tight text-foreground select-none">
                BCTech
              </span>
            </div>
       
            <div className="flex gap-2">
              <SocialIcon icon={FiLinkedin} href="#" />
              <SocialIcon icon={FiGithub} href="#" />
              <SocialIcon icon={FiTwitter} href="#" />
              <SocialIcon icon={FiInstagram} href="#" />
            </div>
          </div>

          {/* Links Column */}
          {FOOTER_LINKS.map((group) => (
            <div key={group.titleKey}>
              <h4 className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider mb-6">{t(group.titleKey)}</h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.nameKey}>
                    <a href={link.href} className="text-muted-foreground hover:text-foreground text-xs transition-colors duration-200">
                      {t(link.nameKey)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Column */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider mb-6">{t("nav.contact")}</h4>
            <div className="space-y-3.5 text-xs text-muted-foreground">
              <div className="flex items-center gap-3">
                <FiMapPin size={14} className="text-neutral-500" />
                <span>Hermosillo, Sonora, México</span>
              </div>
              <div className="flex items-center gap-3">
                <FiMail size={14} className="text-neutral-500" />
                <span>contact@bctech.com.mx</span>
              </div>
              
              <div className="pt-4 mt-4 border-t border-border/50">
                <button 
                  onClick={scrollToTop}
                  className="flex items-center gap-2 text-foreground text-[10px] font-mono font-bold uppercase tracking-wider hover:text-muted-foreground transition-colors group"
                >
                  {t("footer.top")}
                  <FiArrowUp size={12} className="group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4 text-neutral-550 text-[9px] font-mono font-bold uppercase tracking-wider">
          <p>© {new Date().getFullYear()} BCTech. {t("footer.rights")}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">{t("footer.privacy")}</a>
            <a href="#" className="hover:text-foreground transition-colors">{t("footer.terms")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon: Icon, href }: { icon: any, href: string }) => (
  <a 
    href={href} 
    target="_blank"
    rel="noopener noreferrer"
    className="w-8 h-8 rounded-md bg-neutral-900/10 border border-border/60 flex items-center justify-center text-neutral-400 hover:text-foreground hover:bg-neutral-900 hover:border-border transition-all duration-200 shadow-subtle"
  >
    <Icon size={14} />
  </a>
);