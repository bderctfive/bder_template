"use client";

import React from 'react';
import { motion } from "framer-motion";
// Importamos todo desde Fi (Feather Icons) para mantener la consistencia visual
import { 
  FiGithub, 
  FiLinkedin, 
  FiTwitter, 
  FiInstagram, 
  FiMail, 
  FiMapPin, 
  FiArrowUp 
} from "react-icons/fi";

const FOOTER_LINKS = [
  // {
  //   title: "Navegación",
  //   links: [
  //     { name: "Inicio", href: "#inicio" },
  //     { name: "Servicios", href: "#servicios" },
  //     { name: "Proyectos", href: "#proyectos" },
  //     { name: "Sobre Nosotros", href: "#nosotros" },
  //   ]
  // },
  {
    title: "Servicios",
    links: [
      { name: "Software & Apps", href: "#servicios" },
      { name: "Ciberseguridad", href: "#servicios" },
      { name: "Infraestructura", href: "#servicios" },
      { name: "Automatización", href: "#servicios" },
    ]
  }
];

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-slate-950 pt-24 pb-12 overflow-hidden border-t border-white/5">
      {/* Glow decorativo sutil */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Columna 1: Brand & Bio */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black text-white italic">B</div>
              <span className="text-xl font-black text-white tracking-tighter uppercase">Bder Template</span>
            </div>
       
            <div className="flex gap-4">
              <SocialIcon icon={FiLinkedin} href="#" />
              <SocialIcon icon={FiGithub} href="#" />
              <SocialIcon icon={FiTwitter} href="#" />
              <SocialIcon icon={FiInstagram} href="#" />
            </div>
          </div>

          {/* Columnas de Links */}
          {FOOTER_LINKS.map((group) => (
            <div key={group.title}>
              <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">{group.title}</h4>
              <ul className="space-y-4">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-slate-500 hover:text-blue-400 text-sm transition-colors duration-300">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Columna 4: Contacto Rápido */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Contacto</h4>
            <div className="space-y-4 text-sm text-slate-500">
              <div className="flex items-center gap-3 font-medium">
                <FiMapPin size={16} className="text-blue-500" />
                <span>Hermosillo, Sonora, México</span>
              </div>
              <div className="flex items-center gap-3 font-medium">
                <FiMail size={16} className="text-blue-500" />
                <span>contacto@bder.com</span>
              </div>
              <div className="mt-6 pt-6 border-t border-white/5">
                <button 
                  onClick={scrollToTop}
                  className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest hover:text-blue-400 transition-colors group"
                >
                  Volver arriba 
                  <FiArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em]">
          <p>© {new Date().getFullYear()} Bder Template. Todos los derechos reservados.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Componente auxiliar para los iconos sociales
const SocialIcon = ({ icon: Icon, href }: { icon: any, href: string }) => (
  <a 
    href={href} 
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 hover:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-blue-600/20"
  >
    <Icon size={18} />
  </a>
);