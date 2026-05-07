"use client";
import { motion } from "framer-motion";

export const Services = () => (
  <section id="servicios" className="min-h-screen py-20 bg-slate-50 flex flex-col items-center">
    <motion.div 
      whileInView={{ opacity: 1, y: 0 }} 
      initial={{ opacity: 0, y: 50 }}
      viewport={{ once: true }}
      className="container mx-auto px-6"
    >
      <h2 className="text-4xl font-bold mb-12 text-center">Nuestros Servicios</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-8 bg-white rounded-2xl shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-blue-100 rounded-lg mb-4" />
            <h3 className="text-xl font-bold mb-2">Servicio Especializado {i}</h3>
            <p className="text-slate-600">Descripción detallada del servicio modular que ayuda a escalar tu negocio.</p>
          </div>
        ))}
      </div>
    </motion.div>
  </section>
);