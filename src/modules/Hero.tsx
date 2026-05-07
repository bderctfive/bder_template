"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Laptop, Server, Zap, LucideIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface SlideData {
  tag: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  image: string;
  color: string;
}

const SLIDES: SlideData[] = [
  {
    tag: "Software & Apps",
    title: "Sistemas Escalables para tu Éxito",
    desc: "Desarrollamos aplicaciones web y móviles de alto rendimiento, diseñadas para crecer junto con tu negocio.",
    icon: Laptop,
    image: "/images/hero/software.jpg",
    color: "blue"
  },
  {
    tag: "Infraestructura & TI",
    title: "Potencia el Hardware de tu Empresa",
    desc: "Configuración de servidores y redes locales robustas. Garantizamos que tu base tecnológica sea sólida.",
    icon: Server,
    image: "/images/hero/hardware.jpg",
    color: "emerald"
  },
  {
    tag: "Automatización",
    title: "Optimización de Procesos Críticos",
    desc: "Reducimos costos mediante la integración inteligente de hardware y software de última generación.",
    icon: Zap,
    image: "/images/hero/automation.jpg",
    color: "purple"
  }
];

const SlideContent = ({ slide, isActive }: { slide: SlideData; isActive?: boolean }) => (
  <div className="relative w-full h-full flex items-center justify-center">
    {/* Background & Overlay */}
    <motion.div 
      initial={{ scale: 1.1 }}
      animate={isActive ? { scale: 1 } : { scale: 1.1 }}
      transition={{ duration: 8, ease: "easeOut" }}
      className="absolute inset-0 z-0"
    >
      <Image
        src={slide.image}
        alt={slide.title}
        fill
        className="object-cover brightness-[0.25]"
        priority
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_90%)]" />
    </motion.div>

    {/* Text Content */}
    <div className="container relative z-20 mx-auto px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
        >
          <slide.icon className={`w-4 h-4 text-${slide.color}-400`} />
          <span className="text-xs font-medium tracking-widest uppercase text-slate-300">{slide.tag}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 leading-[0.95]"
        >
          {slide.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed balance"
        >
          {slide.desc}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button size="lg" className="group bg-blue-600 hover:bg-blue-500 text-white rounded-full px-8 h-14 text-base font-semibold transition-all">
            Empezar ahora
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="ghost" size="lg" className="text-white hover:bg-white/10 rounded-full px-8 h-14 text-base font-medium">
            Nuestros servicios
          </Button>
        </motion.div>
      </div>
    </div>
  </div>
);

const HeroSection = () => {
  return (
    <section className="relative w-full h-screen min-h-[700px] bg-slate-950 overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        pagination={{ clickable: true, el: '.custom-pagination' }}
        loop={true}
        className="h-full w-full"
      >
        {SLIDES.map((slide, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => <SlideContent slide={slide} isActive={isActive} />}
          </SwiperSlide>
        ))}
        
        <div className="custom-pagination absolute bottom-12 left-0 right-0 z-30 flex justify-center gap-2" />
      </Swiper>

      <style jsx global>{`
        .custom-pagination .swiper-pagination-bullet {
          width: 32px;
          height: 4px;
          background: rgba(255,255,255,0.15);
          border-radius: 2px;
          opacity: 1;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .custom-pagination .swiper-pagination-bullet-active {
          background: #3b82f6;
          width: 54px;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;