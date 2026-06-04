"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";
import { 
  Laptop, 
  Monitor, 
  Cpu, 
  Cloud, 
  Activity, 
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

type TranslationKey = keyof typeof translations['es'];

interface ServiceData {
  id: string;
  titleKey: TranslationKey;
  descKey: TranslationKey;
  icon: any;
  image: string;
  gradientClass: string;
  gridClass: string;
}

const SERVICES: ServiceData[] = [
  {
    id: "01",
    titleKey: "services.01.title",
    descKey: "services.01.desc",
    icon: Laptop,
    image: "/images/services/software_dev.png",
    gradientClass: "from-blue-500/10 to-transparent",
    gridClass: "col-span-1 md:col-span-2"
  },
  {
    id: "02",
    titleKey: "services.02.title",
    descKey: "services.02.desc",
    icon: Monitor,
    image: "/images/services/support_hardware.png",
    gradientClass: "from-red-500/10 to-transparent",
    gridClass: "col-span-1 md:col-span-2"
  },
  {
    id: "03",
    titleKey: "services.03.title",
    descKey: "services.03.desc",
    icon: Cpu,
    image: "/images/services/infra_servers.png",
    gradientClass: "from-emerald-500/10 to-transparent",
    gridClass: "col-span-1 md:col-span-2"
  },
  {
    id: "04",
    titleKey: "services.04.title",
    descKey: "services.04.desc",
    icon: Cloud,
    image: "/images/services/cloud_network.png",
    gradientClass: "from-purple-500/10 to-transparent",
    gridClass: "col-span-1 md:col-span-3"
  },
  {
    id: "05",
    titleKey: "services.05.title",
    descKey: "services.05.desc",
    icon: Activity,
    image: "/images/services/process_automation.png",
    gradientClass: "from-amber-500/10 to-transparent",
    gridClass: "col-span-1 md:col-span-3"
  }
];

export const Services = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  // Auto-play timer for mobile carousel (rotates every 4.5 seconds)
  useEffect(() => {
    const handleAutoPlay = () => {
      // Only auto-play on mobile screen widths
      if (typeof window !== 'undefined' && window.innerWidth >= 768) return;
      const next = (activeSlide + 1) % SERVICES.length;
      scrollTo(next);
    };

    const interval = setInterval(handleAutoPlay, 4500);
    return () => clearInterval(interval);
  }, [activeSlide]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    
    // Only track centering on mobile
    if (window.innerWidth >= 768) return;
    
    const center = container.scrollLeft + container.clientWidth / 2;
    
    let closestIndex = 0;
    let minDistance = Infinity;
    
    Array.from(container.children).forEach((child, index) => {
      const childEl = child as HTMLElement;
      const childCenter = childEl.offsetLeft + childEl.clientWidth / 2;
      const distance = Math.abs(center - childCenter);
      
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });
    
    setActiveSlide(closestIndex);
  };

  const scrollTo = (index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cardEl = container.children[index] as HTMLElement;
    
    if (cardEl) {
      container.scrollTo({
        left: cardEl.offsetLeft - (container.clientWidth - cardEl.clientWidth) / 2,
        behavior: 'smooth'
      });
      setActiveSlide(index);
    }
  };

  return (
    <section className="py-12 md:py-16 bg-transparent overflow-hidden relative">
      <div className="container mx-auto max-w-[83rem] px-6">
        
        {/* Section Header */}
        <div className="mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-1 text-left"
          >
            <span className="text-[10px] font-mono tracking-wider uppercase text-neutral-500">{t("services.tag")}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              {t("services.title")}
            </h2>
          </motion.div>
        </div>

        {/* Bento/Grid Layout (Hybrid: grid on desktop, horizontal scroll on mobile) */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className={cn(
            "flex md:grid gap-6 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none no-scrollbar [scroll-padding-inline:7.5vw]",
            "pb-6 md:pb-0 -mx-6 px-[7.5vw] md:mx-0 md:px-0 md:grid-cols-6 w-full"
          )}
        >
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              whileHover={{ y: -4 }}
              className={cn(
                "relative rounded-2xl border border-border bg-neutral-900/5 dark:bg-neutral-950/10 text-left",
                "flex flex-col justify-between p-6 cursor-pointer transition-all duration-300 overflow-hidden group",
                service.gridClass,
                "w-[85vw] md:w-auto shrink-0 md:shrink snap-center"
              )}
            >
              {/* Inner gradient highlight */}
              <div className={cn("absolute inset-0 bg-gradient-to-b opacity-[0.03] group-hover:opacity-[0.06] transition-opacity pointer-events-none", service.gradientClass)} />

              <div>
                {/* Header: Icon & ID */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded bg-neutral-900/80 border border-border text-neutral-400">
                    <service.icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-neutral-500 font-semibold tracking-wider">
                    {service.id}
                  </span>
                </div>

                {/* Info */}
                <div>
                  <h3 className="text-base font-bold text-foreground tracking-tight">
                    {t(service.titleKey)}
                  </h3>
                  <p className="text-muted-foreground text-[11px] leading-relaxed mt-2">
                    {t(service.descKey)}
                  </p>
                </div>

                {/* Mockup Image */}
                <div className="relative w-full aspect-[21/9] rounded-lg border border-border bg-neutral-900/10 dark:bg-neutral-950/20 overflow-hidden mt-4">
                  <Image
                    src={service.image}
                    alt={t(service.titleKey)}
                    fill
                    className="object-cover transition-all duration-500 grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
                </div>
              </div>

              {/* Footer CTA */}
              <div className="mt-4 flex items-center justify-between pt-2 border-t border-border/40">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="group rounded-md text-[10px] px-0 h-6 text-muted-foreground hover:text-foreground bg-transparent hover:bg-transparent justify-start"
                >
                  {t("services.btn.explore")}
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform ml-1" />
                </Button>
                <span className="text-[8px] font-mono text-neutral-500 uppercase tracking-widest">
                  SYS {service.id}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Control bar (Only visible on mobile) */}
        <div className="flex md:hidden items-center justify-center mt-6 relative z-20">
          {/* Dots */}
          <div className="flex gap-2">
            {SERVICES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollTo(idx)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  activeSlide === idx ? "w-6 bg-foreground" : "w-1.5 bg-neutral-300 dark:bg-neutral-800"
                )}
                aria-label={`Ir al servicio ${idx + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};