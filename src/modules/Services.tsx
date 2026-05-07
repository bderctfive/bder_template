"use client";

import React, { useState } from 'react';
import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
import { 
  Laptop, 
  ShieldCheck, 
  Cpu, 
  Cloud, 
  Activity, 
  ArrowRight 
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from 'next/image';

const SERVICES = [
  {
    id: "01",
    title: "Software & Apps",
    desc: "Desarrollo de ecosistemas digitales escalables con tecnologías de vanguardia como Next.js y Python.",
    icon: Laptop,
    image: "/images/services/software.jpg", // Asegúrate de tener estas rutas
    color: "from-blue-500 to-cyan-400",
    shadow: "shadow-blue-500/20"
  },
  {
    id: "02",
    title: "Ciberseguridad",
    desc: "Protección avanzada de datos y auditorías de vulnerabilidades para mantener tu empresa segura.",
    icon: ShieldCheck,
    image: "/images/services/security.jpg",
    color: "from-red-500 to-orange-400",
    shadow: "shadow-red-500/20"
  },
  {
    id: "03",
    title: "Infraestructura & TI",
    desc: "Optimización de servidores y soporte técnico especializado para una operatividad 24/7.",
    icon: Cpu,
    image: "/images/services/infra.jpg",
    color: "from-emerald-500 to-teal-400",
    shadow: "shadow-emerald-500/20"
  },
  {
    id: "04",
    title: "Cloud Solutions",
    desc: "Migración y gestión de servicios en la nube (AWS/Azure) para máxima disponibilidad global.",
    icon: Cloud,
    image: "/images/services/cloud.jpg",
    color: "from-purple-500 to-pink-400",
    shadow: "shadow-purple-500/20"
  },
  {
    id: "05",
    title: "Automatización",
    desc: "Integración de procesos inteligentes para reducir costos operativos y errores humanos.",
    icon: Activity,
    image: "/images/services/automation.jpg",
    color: "from-amber-500 to-yellow-400",
    shadow: "shadow-amber-500/20"
  }
];

export const Services = () => {
  // Siempre empieza en el primer servicio (ID "01")
  const [expandedId, setExpandedId] = useState<string | null>("01");

  return (
    <section className="py-24 bg-slate-950 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-left">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase"
          >
            Soluciones <br /> <span className="text-slate-800">Modulares.</span>
          </motion.h2>
        </div>

        {/* Layout Adaptable: Columna en móvil, Fila en escritorio */}
        <div className="flex flex-col md:flex-row h-auto md:h-[650px] gap-4">
          <LayoutGroup>
            {SERVICES.map((service) => {
              const isExpanded = expandedId === service.id;
              
              return (
                <motion.div
                  key={service.id}
                  layout
                  onMouseEnter={() => setExpandedId(service.id)}
                  onClick={() => setExpandedId(service.id)}
                  className={cn(
                    "relative overflow-hidden cursor-pointer rounded-[2.5rem] border border-white/10 transition-all duration-500 ease-in-out",
                    isExpanded 
                      ? "flex-[4] bg-slate-900 min-h-[400px] md:min-h-full" 
                      : "flex-1 bg-slate-950/50 min-h-[100px] md:min-h-full"
                  )}
                >
                  {/* Background Glow sutil */}
                  <div className={cn(
                    "absolute inset-0 opacity-0 transition-opacity duration-700 bg-gradient-to-br",
                    service.color,
                    isExpanded && "opacity-5"
                  )} />

                  <div className="relative h-full p-6 md:p-10 flex flex-col justify-between z-10">
                    {/* Header: Icon & ID */}
                    <div className="flex items-center justify-between">
                      <motion.div 
                        layout
                        className={cn(
                          "p-4 rounded-2xl bg-white/5 border border-white/10 transition-all duration-500",
                          isExpanded && `bg-gradient-to-br ${service.color} ${service.shadow} border-none shadow-lg`
                        )}
                      >
                        <service.icon className={cn(
                          "w-6 h-6 transition-colors duration-500",
                          isExpanded ? "text-white" : "text-slate-500"
                        )} />
                      </motion.div>
                      <span className={cn(
                        "font-black text-2xl md:text-4xl transition-colors duration-500",
                        isExpanded ? "text-slate-700" : "text-slate-900"
                      )}>
                        {service.id}
                      </span>
                    </div>

                    {/* Middle: Imagen Referencial (Solo visible si está expandido) */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          className="relative w-full h-40 md:h-64 my-6 overflow-hidden rounded-3xl border border-white/5"
                        >
                          <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                          />
                          {/* Overlay para integrar la imagen al diseño oscuro */}
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Footer: Title & Desc */}
                    <div className="overflow-hidden">
                      <motion.h3 
                        layout="position"
                        className={cn(
                          "font-bold text-white mb-4 transition-all duration-500",
                          isExpanded ? "text-2xl md:text-3xl" : "text-lg md:rotate-[-90deg] md:whitespace-nowrap md:absolute md:bottom-12 md:left-1/2 md:-translate-x-1/2"
                        )}
                      >
                        {service.title}
                      </motion.h3>
                      
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.4 }}
                            className="max-w-md"
                          >
                            <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-6">
                              {service.desc}
                            </p>
                            <button className="flex items-center gap-2 text-white text-sm font-bold group">
                              Consultar detalles
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </LayoutGroup>
        </div>

        {/* Footer Info Móvil/Escritorio */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/5 pt-8">
          <p className="text-slate-600 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase">
            Nuestros pilares tecnológicos
          </p>
          <div className="hidden md:flex gap-4 text-slate-700 text-[10px] font-bold uppercase tracking-widest">
            <span>Engineering</span>
            <span>•</span>
            <span>Security</span>
            <span>•</span>
            <span>Infrastructure</span>
            <span>•</span>
            <span>Automation</span>
          </div>
        </div>
      </div>
    </section>
  );
};