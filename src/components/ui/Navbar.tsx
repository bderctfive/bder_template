"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "next-themes";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const isHoveredRef = useRef(false);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { language, setLanguage, t } = useLanguage();
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Scrolled threshold
      setIsScrolled(currentScrollY > 20);

      // If hovered, don't trigger hiding, and clear any pending hide timers
      if (isHoveredRef.current) {
        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current);
          hideTimeoutRef.current = null;
        }
        setIsVisible(true);
        lastScrollY = currentScrollY;
        return;
      }

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        if (!hideTimeoutRef.current) {
          hideTimeoutRef.current = setTimeout(() => {
            setIsVisible(false);
            hideTimeoutRef.current = null;
          }, 450); // 450ms delay before hiding
        }
      } else {
        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current);
          hideTimeoutRef.current = null;
        }
        setIsVisible(true);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  const navItems = [
    { name: t("nav.home"), href: "#inicio" },
    { name: t("nav.services"), href: "#servicios" },
    { name: t("nav.projects"), href: "#proyectos" },
    { name: t("nav.about"), href: "#nosotros" },
    { name: t("nav.contact"), href: "#contacto" },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const showNavbar = isVisible || isMobileMenuOpen || isHovered;

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] flex justify-center p-6 pointer-events-none">
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ 
          y: showNavbar ? 0 : -100, 
          opacity: showNavbar ? 1 : 0 
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onMouseEnter={() => {
          setIsHovered(true);
          isHoveredRef.current = true;
          if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = null;
          }
          setIsVisible(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          isHoveredRef.current = false;
        }}
        className={cn(
          "pointer-events-auto relative flex items-center justify-between w-full max-w-[83rem] px-6 py-3 rounded-full transition-all duration-300 border",
          isScrolled 
            ? "bg-background/80 backdrop-blur-md border-border shadow-subtle" 
            : "bg-transparent border-transparent"
        )}
      >
        {/* Brand Logo */}
        <div className="flex items-center">
          <a href="#inicio" className="font-sans font-bold text-sm tracking-tight text-foreground select-none">
            BCTech
          </a>
        </div>

        {/* Desktop Navigation & Controls */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-1">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {hoveredIndex === index && (
                  <motion.span
                    layoutId="nav-hover"
                    className="absolute inset-0 z-0 rounded-full bg-neutral-100 dark:bg-neutral-800"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </a>
            ))}
          </div>

          {/* Controls: Theme & Language */}
          {mounted && (
            <div className="flex items-center gap-1.5 border-l border-border pl-4">
              {/* Language Switcher */}
              <button
                onClick={toggleLanguage}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-mono font-bold border border-border/60 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-muted-foreground hover:text-foreground transition-all duration-200"
                aria-label="Cambiar idioma"
              >
                {language.toUpperCase()}
              </button>

              {/* Theme Switcher */}
              <button
                onClick={toggleTheme}
                className="w-8 h-8 rounded-full flex items-center justify-center border border-border/60 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-muted-foreground hover:text-foreground transition-all duration-200"
                aria-label="Cambiar tema"
              >
                {resolvedTheme === 'dark' ? <Sun size={13} /> : <Moon size={13} />}
              </button>
            </div>
          )}
        </div>

        {/* Mobile controls & toggle */}
        <div className="flex items-center md:hidden">
          <button 
            className="p-2 text-foreground hover:text-muted-foreground transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu de navegación"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-24 left-6 right-6 p-4 rounded-2xl bg-background/95 backdrop-blur-md border border-border md:hidden pointer-events-auto shadow-lg"
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-foreground transition-all"
                >
                  {item.name}
                </a>
              ))}

              {/* Language & Theme Controls inside mobile menu */}
              {mounted && (
                <div className="flex items-center justify-between border-t border-border/60 mt-3 pt-4 px-4">
                  <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider">Ajustes</span>
                  <div className="flex items-center gap-2">
                    {/* Language Toggle */}
                    <button
                      onClick={toggleLanguage}
                      className="w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-mono font-bold border border-border/60 text-muted-foreground hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200"
                    >
                      {language.toUpperCase()}
                    </button>
                    {/* Theme Toggle */}
                    <button
                      onClick={toggleTheme}
                      className="w-9 h-9 rounded-full flex items-center justify-center border border-border/60 text-muted-foreground hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200"
                    >
                      {resolvedTheme === 'dark' ? <Sun size={13} /> : <Moon size={13} />}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};