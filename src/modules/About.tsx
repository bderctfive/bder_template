"use client";
import { motion } from "framer-motion";

export const About = () => (
  <section id="nosotros" className="py-24 bg-white overflow-hidden">
    <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="flex-1"
      >
        <div className="relative w-full aspect-square bg-slate-100 rounded-3xl flex items-center justify-center">
          <span className="text-8xl">🚀</span>
          {/* Círculo decorativo */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" />
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex-1"
      >
        <h2 className="text-4xl font-bold text-slate-900 mb-6">Impulsando la Innovación Modular</h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          Somos un equipo de desarrolladores apasionados por crear estructuras limpias y escalables. 
          Nuestra filosofía se basa en el "Clean Code" y en la entrega de experiencias de usuario 
          que no solo funcionen, sino que cautiven.
        </p>
        <ul className="space-y-3">
          {["Arquitectura Escalable", "Enfoque en Rendimiento", "Diseño Moderno"].map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              {item}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  </section>
);