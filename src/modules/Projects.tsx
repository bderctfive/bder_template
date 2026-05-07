"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, ShieldQuestion, ArrowRight, Code2 } from 'lucide-react';
import { cn } from "@/lib/utils";

const PROJECTS = [
  {
    title: "Buyer One",
    tag: "Sistemas ERP",
    desc: "Plataforma de compra-venta al mayoreo de alto rendimiento. Optimiza la cadena de suministro con una arquitectura robusta.",
    tech: ["Angular", "Flutter", "FastAPI"],
    color: "blue",
    status: "public"
  },
  {
    title: "BDER Real-Time",
    tag: "Video & Geolocation",
    desc: "Servicio de streaming en tiempo real enfocado en la verificación de domicilios y lugares mediante video en vivo.",
    tech: ["Next.js", "WebRTC", "PostgreSQL"],
    color: "emerald",
    status: "public"
  },
  {
    title: "Project Ghost",
    tag: "Clasificado",
    desc: "Desarrollo de infraestructura de seguridad avanzada para gestión de datos sensibles. Información restringida.",
    tech: ["???", "???", "???"],
    color: "purple",
    status: "mystery"
  },
  {
    title: "Neural Core",
    tag: "Experimental",
    desc: "Algoritmo de optimización de procesos mediante inteligencia artificial aplicada a logística industrial.",
    tech: ["Python", "TensorFlow", "FastAPI"],
    color: "amber",
    status: "mystery"
  }
];

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

  return (
    <section className="py-32 bg-slate-950 overflow-hidden relative">
      <div className="container mx-auto px-6 mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-2xl"
        >
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-[0.9]">
            Casos de <br /><span className="text-slate-800">Estudio.</span>
          </h2>
        </motion.div>
      </div>

      {/* Carrusel Infinito */}
      <div className="flex overflow-hidden group">
        <motion.div 
          className="flex gap-8 px-4"
          animate={{ x: [0, -1000] }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "linear",
            pauseOnHover: true 
          }}
        >
          {[...PROJECTS, ...PROJECTS].map((project, i) => (
            <ProjectCard 
              key={i} 
              project={project} 
              onClick={() => setSelectedProject(project)} 
            />
          ))}
        </motion.div>
      </div>

      {/* Modal / Dialog */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl"
            />
            <motion.div 
              layoutId={selectedProject.title}
              className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="p-10">
                <span className="text-blue-400 font-mono text-xs tracking-widest uppercase">{selectedProject.tag}</span>
                <h3 className="text-4xl font-bold text-white mt-2 mb-6 tracking-tight">{selectedProject.title}</h3>
                <p className="text-slate-400 text-lg leading-relaxed mb-8">{selectedProject.desc}</p>
                
                <div className="flex flex-wrap gap-3 mb-8">
                  {selectedProject.tech.map(t => (
                    <span key={t} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-medium">
                      {t}
                    </span>
                  ))}
                </div>

                {selectedProject.status === 'public' ? (
                  <button className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all">
                    Ver Proyecto en Vivo <ExternalLink size={18} />
                  </button>
                ) : (
                  <div className="w-full py-4 bg-white/5 text-slate-500 rounded-2xl font-bold flex items-center justify-center gap-2 border border-dashed border-white/10">
                    Acceso Restringido <ShieldQuestion size={18} />
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

const ProjectCard = ({ project, onClick }: { project: typeof PROJECTS[0], onClick: () => void }) => {
  const isMystery = project.status === 'mystery';

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      onClick={onClick}
      className="relative w-[350px] md:w-[450px] flex-shrink-0 cursor-pointer group"
    >
      <div className={cn(
        "relative aspect-[16/10] rounded-[2rem] overflow-hidden border border-white/10 bg-slate-900 transition-all duration-500",
        isMystery && "grayscale blur-[2px] group-hover:blur-0 group-hover:grayscale-0"
      )}>
        {/* Simulación de Imagen/Preview */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-20",
          project.color === 'blue' ? "from-blue-600 to-cyan-500" : 
          project.color === 'emerald' ? "from-emerald-600 to-teal-500" :
          "from-purple-600 to-pink-500"
        )} />
        
        <div className="absolute inset-0 flex items-center justify-center">
          {isMystery ? (
            <ShieldQuestion size={60} className="text-white/10 group-hover:text-white/40 transition-colors duration-500" />
          ) : (
            <Code2 size={60} className="text-white/10 group-hover:text-white/40 transition-colors duration-500" />
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-blue-400/80 mb-2 block">
            {project.tag}
          </span>
          <h3 className="text-2xl font-bold text-white tracking-tight">{project.title}</h3>
          <div className="mt-4 flex items-center gap-2 text-white/40 text-xs font-semibold group-hover:text-white transition-colors">
            DETALLES DEL PROYECTO <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};