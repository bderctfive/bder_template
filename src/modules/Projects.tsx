"use client";
import { motion } from "framer-motion";

export const Projects = () => {
  const projects = [
    { title: "E-Commerce Alpha", desc: "Plataforma de ventas con pagos integrados.", tag: "Next.js" },
    { title: "Dashboard Inmobiliario", desc: "Sistema de gestión de activos en tiempo real.", tag: "FastAPI" },
    { title: "App de Logística", desc: "Optimización de rutas con inteligencia artificial.", tag: "Python" }
  ];

  return (
    <section id="proyectos" className="py-24 bg-slate-900 text-white">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold">Proyectos Recientes</h2>
          <p className="text-slate-400 mt-2">Soluciones digitales a medida para problemas complejos.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-2xl bg-slate-800 p-1 border border-slate-700"
            >
              <div className="aspect-video bg-slate-700 rounded-xl mb-4 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-4">
                <span className="text-xs font-mono text-blue-400">{project.tag}</span>
                <h3 className="text-xl font-bold mt-1">{project.title}</h3>
                <p className="text-slate-400 text-sm mt-2">{project.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};