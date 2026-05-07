"use client";
import { motion } from "framer-motion";

export const Navbar = () => {
  const navItems = ["Inicio", "Servicios", "Proyectos", "Nosotros", "Contacto"];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex gap-6 px-8 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl"
    >
      {navItems.map((item) => (
        <a 
          key={item} 
          href={`#${item.toLowerCase()}`}
          className="text-sm font-medium text-white hover:text-blue-400 transition-colors"
        >
          {item}
        </a>
      ))}
    </motion.nav>
  );
};