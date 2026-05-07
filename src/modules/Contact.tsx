"use client";
import { motion } from "framer-motion";

export const Contact = () => (
  <section id="contacto" className="py-24 bg-slate-50">
    <div className="container mx-auto px-6 max-w-4xl text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold text-slate-900 mb-4">Hablemos de tu idea</h2>
        <p className="text-slate-600 mb-12">Estamos listos para llevar tu proyecto al siguiente nivel.</p>
        
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">Nombre</label>
            <input type="text" className="p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Tu nombre" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">Email</label>
            <input type="email" className="p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="correo@ejemplo.com" />
          </div>
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-sm font-semibold text-slate-700">Mensaje</label>
            <textarea rows={4} className="p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="¿En qué podemos ayudarte?" />
          </div>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="md:col-span-2 bg-slate-950 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-slate-800 transition-colors"
          >
            Enviar Mensaje
          </motion.button>
        </form>
      </motion.div>
    </div>
  </section>
);