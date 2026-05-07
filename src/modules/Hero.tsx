"use client";
import { motion } from "framer-motion";

export const Hero = () => (
  <section id="inicio" className="h-screen flex flex-col items-center justify-center bg-slate-950 text-white text-center px-4">
    <motion.h1 
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-6xl md:text-8xl font-black bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent"
    >
      BDER TEMPLATE
    </motion.h1>
    <motion.p 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="mt-6 text-slate-400 max-w-2xl text-lg"
    >
      Una base sólida y modular construida con Next.js, Tailwind v4 y Framer Motion para proyectos de alto rendimiento.
    </motion.p>
  </section>
);