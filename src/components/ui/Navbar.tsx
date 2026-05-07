"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils"; // Asegúrate de tener esta utilidad de shadcn o usa strings normales

const NAV_ITEMS = [
  { name: "Inicio", href: "#inicio" },
  { name: "Servicios", href: "#servicios" },
  { name: "Proyectos", href: "#proyectos" },
  { name: "Nosotros", href: "#nosotros" },
  { name: "Contacto", href: "#contacto" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] flex justify-center p-6 pointer-events-none">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={cn(
          "pointer-events-auto relative flex items-center px-4 py-2 rounded-full transition-all duration-300 border",
          isScrolled 
            ? "bg-slate-950/80 backdrop-blur-xl border-white/10 shadow-2xl" 
            : "bg-white/5 backdrop-blur-md border-white/5"
        )}
      >
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item, index) => (
            <a
              key={item.name}
              href={item.href}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative px-5 py-2 text-sm font-medium text-slate-200 transition-colors hover:text-white"
            >
              {hoveredIndex === index && (
                <motion.span
                  layoutId="nav-hover"
                  className="absolute inset-0 z-0 rounded-full bg-white/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
              <span className="relative z-10">{item.name}</span>
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-24 left-6 right-6 p-4 rounded-3xl bg-slate-950/95 backdrop-blur-2xl border border-white/10 md:hidden pointer-events-auto"
          >
            <div className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-6 py-4 rounded-2xl text-lg font-medium text-slate-300 hover:bg-white/5 hover:text-white transition-all"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};