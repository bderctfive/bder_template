"use client";

import React from 'react';
// 1. Importamos el tipo Variants
import { motion, Variants } from "framer-motion";
import { Code2, Cpu, Globe2, Rocket, Terminal } from "lucide-react";
import Image from 'next/image';

export const About = () => {
  // 2. Aplicamos el tipo Variants a nuestro objeto
  const marqueeVariants: Variants = {
    animate: {
      x: [0, -1035],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        },
      },
    },
    animateReverse: {
      x: [-1035, 0],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 25,
          ease: "linear",
        },
      },
    }
  };

  return (
    <section className="relative py-32 bg-slate-950 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-[120px] -translate-y-1/2" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
          {/* Lado Izquierdo: Imagen */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex-1 relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden border border-white/10 bg-slate-900 aspect-square group">
              <Image 
                src="/images/about/workspace.jpg" 
                alt="Engineering Workspace" 
                fill 
                className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 p-6 glass rounded-2xl border border-white/10 backdrop-blur-md">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-600 rounded-xl">
                    <Terminal className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg leading-none">Ingeniería de Sistemas</p>
                    <p className="text-slate-400 text-xs mt-1 tracking-widest uppercase font-semibold">Backend & Infrastructure</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Lado Derecho: Texto */}
          <div className="flex-1">
            <motion.div 
              initial={{ opacity: 0, x: 30 }} 
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-blue-500 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Nuestra Filosofía</span>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-[0.9]">
                Construimos el <span className="text-slate-700">núcleo</span> de tu infraestructura.
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                Basados en **Hermosillo, Sonora**, fusionamos la precisión de la ingeniería con la agilidad full-stack para diseñar arquitecturas modulares escalables.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { icon: Code2, title: "Clean Code", desc: "Código legible y mantenible." },
                  { icon: Cpu, title: "Hardware-Aware", desc: "Optimización de recursos TI." },
                  { icon: Globe2, title: "Escalabilidad", desc: "Sistemas preparados para crecer." },
                  { icon: Rocket, title: "Deployment", desc: "CI/CD y alta disponibilidad." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group">
                    <item.icon className="w-6 h-6 text-blue-500 shrink-0 group-hover:scale-110 transition-transform" />
                    <div>
                      <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
                      <p className="text-slate-500 text-xs">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Carrusel Infinito */}
        <div className="relative mt-24 py-12 bg-slate-1800/20">

         
            <div className="flex overflow-hidden">
              <motion.div 
                className="flex gap-4 flex-nowrap"
                variants={marqueeVariants}
                animate="animate"
              >
                {/* Usar una sola URL de skillicons con más iconos suele ser más eficiente */}
                <img src="https://skillicons.dev/icons?i=python,js,react,angular,fastapi,django,laravel,dart,flutter&theme=dark" alt="tech-1" className="h-12 md:h-16 max-w-none" />
                <img src="https://skillicons.dev/icons?i=python,js,react,angular,fastapi,django,laravel,dart,flutter&theme=dark" alt="tech-1-dup" className="h-12 md:h-16 max-w-none" />
                <img src="https://skillicons.dev/icons?i=python,js,react,angular,fastapi,django,laravel,dart,flutter&theme=dark" alt="tech-1-dup2" className="h-12 md:h-16 max-w-none" />
              </motion.div>
            </div>
          </div>

      </div>
    </section>
  );
};