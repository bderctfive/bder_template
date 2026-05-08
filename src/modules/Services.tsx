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
    image: "/images/services/software.webp",
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

        <div className="flex flex-col md:flex-row h-auto md:h-[700px] gap-4">
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
                    "relative overflow-hidden cursor-pointer rounded-[3rem] border border-white/10 transition-all duration-500 ease-in-out flex flex-col",
                    isExpanded 
                      ? "flex-[5] bg-slate-900 min-h-[500px] md:min-h-full" 
                      : "flex-1 bg-slate-950/40 min-h-[80px] md:min-h-full hover:bg-slate-900/50"
                  )}
                >
                  {/* Glow effect */}
                  <div className={cn(
                    "absolute inset-0 opacity-0 transition-opacity duration-700 bg-gradient-to-br",
                    service.color,
                    isExpanded && "opacity-10"
                  )} />

                  <div className="relative h-full p-8 md:p-12 flex flex-col z-10">
                    {/* Top: Icon & ID */}
                    <div className="flex items-center justify-between mb-8">
                      <motion.div 
                        layout
                        className={cn(
                          "p-4 rounded-2xl bg-white/5 border border-white/10 transition-all duration-500",
                          isExpanded && `bg-gradient-to-br ${service.color} ${service.shadow} border-none shadow-xl scale-110`
                        )}
                      >
                        <service.icon className={cn(
                          "w-6 h-6 transition-colors duration-500",
                          isExpanded ? "text-white" : "text-slate-500"
                        )} />
                      </motion.div>
                      
                      <span className={cn(
                        "font-black text-2xl md:text-5xl transition-colors duration-500",
                        isExpanded ? "text-slate-700/50" : "text-slate-900"
                      )}>
                        {service.id}
                      </span>
                    </div>

                    {/* Middle: Centered Image */}
                    <div className="flex-1 flex items-center justify-center w-full">
                      <AnimatePresence mode="wait">
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="relative w-full aspect-video md:aspect-[16/10] max-h-[300px] overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl"
                          >
                            <Image
                              src={service.image}
                              alt={service.title}
                              fill
                              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Bottom: Title & Description */}
                    <div className={cn(
                      "mt-8 transition-all duration-500",
                      !isExpanded && "md:absolute md:bottom-12 md:left-1/2 md:-translate-x-1/2"
                    )}>
                      <motion.h3 
                        layout="position"
                        className={cn(
                          "font-black text-white transition-all duration-500 uppercase tracking-tighter",
                          isExpanded ? "text-3xl md:text-4xl mb-4" : "text-lg md:rotate-[-90deg] md:whitespace-nowrap"
                        )}
                      >
                        {service.title}
                      </motion.h3>
                      
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="max-w-xl"
                          >
                            <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-6">
                              {service.desc}
                            </p>
                            <button className="flex items-center gap-3 text-white text-sm font-black uppercase tracking-widest group bg-white/5 px-6 py-3 rounded-full border border-white/10 hover:bg-white/10 transition-all">
                              Explorar Solución
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform text-blue-400" />
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

      </div>
    </section>
  );
};