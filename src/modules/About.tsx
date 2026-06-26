"use client";

import React from 'react';
import { motion, Variants, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Code2, Cpu, Globe2, Rocket, Terminal } from "lucide-react";
import Image from 'next/image';
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "next-themes";
import { translations } from "@/lib/translations";

type TranslationKey = keyof typeof translations['es'];

const BASE_TECH_ICONS = ["python", "js", "react", "angular", "fastapi", "django", "laravel", "dart", "flutter"];
const TECH_ICONS = [...BASE_TECH_ICONS, ...BASE_TECH_ICONS, ...BASE_TECH_ICONS, ...BASE_TECH_ICONS];

export const About = () => {
  const { t } = useLanguage();
  const { theme, resolvedTheme } = useTheme();
  const iconTheme = (theme === 'dark' || resolvedTheme === 'dark') ? 'dark' : 'light';

  // Mouse positions for 3D Parallax Tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Map mouse positions to rotations (with smooth spring physics)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { damping: 20, stiffness: 150 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { damping: 20, stiffness: 150 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;
    
    mouseX.set(relativeX);
    mouseY.set(relativeY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Entrance animations variants
  const imageVariants: Variants = {
    hidden: { opacity: 0, x: -40, scale: 0.96 },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 18,
        delay: 0.1
      }
    }
  };

  const textContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const textItemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 14
      }
    }
  };

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
      {/* Dynamic Ambient Background Gradients */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.04)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.06)_0%,transparent_70%)] rounded-full blur-[80px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] md:w-[500px] h-[350px] md:h-[500px] bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.03)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05)_0%,transparent_70%)] rounded-full blur-[80px] pointer-events-none z-0" />

      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-neutral-200/5 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />
      
      <div className="container mx-auto max-w-[83rem] px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-20">
          
          {/* Left Side: Workspace Image Panel with 3D Tilt and Backlight Glow */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={imageVariants}
            className="flex-1 w-full relative group/panel"
            style={{ perspective: 1000 }}
          >
            {/* Ambient Background Glows that activate on panel hover */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-amber-400/10 via-rose-500/10 to-orange-400/5 dark:from-cyan-500/10 dark:via-indigo-500/15 dark:to-purple-500/10 rounded-3xl blur-2xl opacity-0 group-hover/panel:opacity-100 transition-all duration-700 pointer-events-none scale-95 group-hover/panel:scale-105 z-0" />
            <div className="absolute -inset-8 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.12),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1),transparent_70%)] opacity-0 group-hover/panel:opacity-100 transition-opacity duration-1000 pointer-events-none z-0" />

            <motion.div 
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative z-10 rounded-2xl overflow-hidden border border-border bg-neutral-900/50 aspect-square group/image shadow-2xl transition-all duration-300 hover:border-neutral-500/30 dark:hover:border-neutral-700/50"
            >
              <Image 
                src="/images/services/about_office.png" 
                alt="Engineering Workspace" 
                fill 
                className="object-cover opacity-85 dark:opacity-80 lg:opacity-35 lg:dark:opacity-40 lg:group-hover/panel:opacity-85 lg:dark:group-hover/panel:opacity-80 lg:group-hover/panel:grayscale-0 grayscale-0 lg:grayscale transition-all duration-700 ease-out group-hover/image:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              
              {/* Bottom gradient fade for text readability - only at the bottom 35% */}
              <div className="absolute bottom-0 left-0 right-0 h-[35%] bg-gradient-to-t from-background/90 via-background/40 to-transparent pointer-events-none" />
              
              {/* Inner ambient light leak overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/0 via-transparent to-rose-500/0 dark:from-cyan-500/0 dark:to-purple-500/0 opacity-0 group-hover/panel:opacity-30 transition-opacity duration-700 mix-blend-overlay pointer-events-none" />

              <div 
                style={{ transform: "translateZ(30px)" }}
                className="absolute bottom-4 left-4 right-4 p-4 md:bottom-6 md:left-6 md:right-6 md:p-5 glass rounded-xl border border-border/80 backdrop-blur-md transition-all duration-300 group-hover/panel:border-neutral-400/30 dark:group-hover/panel:border-neutral-600/30 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-neutral-950 border border-border rounded-lg text-neutral-400">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-foreground font-bold text-sm leading-none">{t("nav.services")}</p>
                    <p className="text-neutral-500 text-[10px] mt-1 tracking-wider uppercase font-semibold font-mono">
                      {t("about.workspace.desc" as TranslationKey)}
                    </p>
                  </div>

 
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side: Philosophy Text with Staggered Entrance */}
          <div className="flex-1 w-full text-left">
            <motion.div 
              initial="hidden" 
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={textContainerVariants}
            >
              <motion.span variants={textItemVariants} className="text-[10px] font-mono tracking-wider uppercase text-neutral-500 mb-1.5 block">{t("about.tag")}</motion.span>
              <motion.h2 variants={textItemVariants} className="text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-tight leading-[1.1]">
                {t("about.title")}
              </motion.h2>
              <motion.p variants={textItemVariants} className="text-muted-foreground text-xs leading-relaxed mb-8">
                {t("about.desc")}
              </motion.p>

              <motion.div variants={textItemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  { icon: Code2, title: t("about.feat1.title"), desc: t("about.feat1.desc") },
                  { icon: Cpu, title: t("about.feat2.title"), desc: t("about.feat2.desc") },
                  { icon: Globe2, title: t("about.feat3.title"), desc: t("about.feat3.desc") },
                  { icon: Rocket, title: t("about.feat4.title"), desc: t("about.feat4.desc") }
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 group">
                    <item.icon className="w-5 h-5 text-neutral-400 shrink-0 group-hover:scale-105 group-hover:text-foreground transition-all duration-300" />
                    <div>
                      <h4 className="text-foreground font-bold text-xs mb-1 tracking-tight group-hover:text-primary transition-colors">{item.title}</h4>
                      <p className="text-muted-foreground text-[10px] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Infinite Tech Stack Marquee */}
        <div className="relative mt-16 py-6 border-t border-b border-border/40 bg-neutral-900/5 overflow-hidden">
          {/* Gradient Fades for Premium Look */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div className="flex overflow-hidden relative">
            <motion.div 
              className="flex gap-[16px] md:gap-[24px] flex-nowrap"
              variants={marqueeVariants}
              animate="animate"
            >
              <div className="flex gap-[16px] md:gap-[24px] shrink-0">
                {TECH_ICONS.map((tech, idx) => (
                  <img 
                    key={`tech-1-${idx}`} 
                    src={`https://skillicons.dev/icons?i=${tech}&theme=${iconTheme}`} 
                    alt={tech} 
                    className="h-[36px] md:h-[44px] w-[36px] md:w-[44px] max-w-none opacity-50 hover:opacity-85 transition-all duration-300 hover:scale-105" 
                  />
                ))}
              </div>
              <div className="flex gap-[16px] md:gap-[24px] shrink-0">
                {TECH_ICONS.map((tech, idx) => (
                  <img 
                    key={`tech-2-${idx}`} 
                    src={`https://skillicons.dev/icons?i=${tech}&theme=${iconTheme}`} 
                    alt={tech} 
                    className="h-[36px] md:h-[44px] w-[36px] md:w-[44px] max-w-none opacity-50 hover:opacity-85 transition-all duration-300 hover:scale-105" 
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
};