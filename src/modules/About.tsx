"use client";

import React from 'react';
import { motion, Variants } from "framer-motion";
import { Code2, Cpu, Globe2, Rocket, Terminal } from "lucide-react";
import Image from 'next/image';
import { useLanguage } from "@/context/LanguageContext";

export const About = () => {
  const { t } = useLanguage();

  const marqueeVariants: Variants = {
    animate: {
      x: ["0%", "-50%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        },
      },
    }
  };

  return (
    <section className="relative py-12 md:py-16 bg-transparent overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-neutral-200/5 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />
      
      <div className="container mx-auto max-w-5xl px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-20">
          
          {/* Left Side: Workspace Image Panel */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex-1 w-full relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden border border-border bg-neutral-900 aspect-square group">
              <Image 
                src="/images/services/about_office.png" 
                alt="Engineering Workspace" 
                fill 
                className="object-cover opacity-40 group-hover:scale-[1.02] transition-transform duration-750 grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-4 md:bottom-6 md:left-6 md:right-6 md:p-5 glass rounded-xl border border-border/80 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-neutral-950 border border-border rounded-lg text-neutral-400">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-foreground font-bold text-sm leading-none">{t("nav.services")}</p>
                    <p className="text-neutral-500 text-[10px] mt-1 tracking-wider uppercase font-semibold font-mono">Backend & Infrastructure</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Philosophy Text */}
          <div className="flex-1 w-full text-left">
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[10px] font-mono tracking-wider uppercase text-neutral-500 mb-1.5 block">{t("about.tag")}</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-tight leading-[1.1]">
                {t("about.title")}
              </h2>
              <p className="text-muted-foreground text-xs leading-relaxed mb-8">
                {t("about.desc")}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  { icon: Code2, title: t("about.feat1.title"), desc: t("about.feat1.desc") },
                  { icon: Cpu, title: t("about.feat2.title"), desc: t("about.feat2.desc") },
                  { icon: Globe2, title: t("about.feat3.title"), desc: t("about.feat3.desc") },
                  { icon: Rocket, title: t("about.feat4.title"), desc: t("about.feat4.desc") }
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 group">
                    <item.icon className="w-5 h-5 text-neutral-400 shrink-0 group-hover:scale-105 transition-transform" />
                    <div>
                      <h4 className="text-foreground font-bold text-xs mb-1 tracking-tight">{item.title}</h4>
                      <p className="text-muted-foreground text-[10px] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Infinite Tech Stack Marquee */}
        <div className="relative mt-16 py-6 border-t border-b border-border/40 bg-neutral-900/5 overflow-hidden">
          <div className="flex overflow-hidden relative">
            <motion.div 
              className="flex gap-8 flex-nowrap"
              variants={marqueeVariants}
              animate="animate"
            >
              <div className="flex gap-8 shrink-0">
                <img src="https://skillicons.dev/icons?i=python,js,react,angular,fastapi,django,laravel,dart,flutter&theme=dark" alt="tech-1" className="h-8 md:h-10 max-w-none opacity-50 hover:opacity-80 transition-opacity duration-300" />
              </div>
              <div className="flex gap-8 shrink-0">
                <img src="https://skillicons.dev/icons?i=python,js,react,angular,fastapi,django,laravel,dart,flutter&theme=dark" alt="tech-1-dup" className="h-8 md:h-10 max-w-none opacity-50 hover:opacity-80 transition-opacity duration-300" />
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
};