"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, ShieldQuestion, ArrowRight, ShieldCheck, Lock, Activity, Eye, ChevronLeft, ChevronRight, Megaphone, BarChart3, MapPin, LayoutDashboard, ZoomIn, Video, Database, History } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import Image from 'next/image';

type TranslationKey = keyof typeof translations['es'];

interface ProjectData {
  id: string;
  title: string;
  tagKey: TranslationKey;
  descKey: TranslationKey;
  tech: string[];
  color: string;
  gridClass: string;
  status: string;
  link?: string;
}

const PROJECTS: ProjectData[] = [
  {
    id: "bder-rt",
    title: "BDer Live",
    tagKey: "projects.bder.tag",
    descKey: "projects.bder.desc",
    tech: ["Next.js", "WebRTC", "PostgreSQL"],
    color: "from-emerald-500/10 to-transparent",
    gridClass: "md:col-span-2 h-[360px]",
    status: "public",
    link: "https://bder.live"
  },
  {
    id: "ghost",
    title: "Project Ghost",
    tagKey: "projects.ghost.tag",
    descKey: "projects.ghost.desc",
    tech: ["Rust", "Vault", "WireGuard"],
    color: "from-purple-500/10 to-transparent",
    gridClass: "md:col-span-1 h-[360px]",
    status: "mystery"
  },
  {
    id: "neural",
    title: "Neural Core",
    tagKey: "projects.neural.tag",
    descKey: "projects.neural.desc",
    tech: ["Python", "TensorFlow", "FastAPI"],
    color: "from-amber-500/10 to-transparent",
    gridClass: "md:col-span-1 h-[360px]",
    status: "mystery"
  },
  {
    id: "buyer-one",
    title: "Buyer 1",
    tagKey: "projects.buyerone.tag",
    descKey: "projects.buyerone.desc",
    tech: ["Angular", "Flutter", "FastAPI"],
    color: "from-blue-500/10 to-transparent",
    gridClass: "md:col-span-2 h-[360px]",
    status: "public",
    link: "https://buyer1.shop"
  }
];

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  const { t } = useLanguage();

  return (
    <section className="py-12 md:py-16 bg-transparent overflow-hidden relative">
      <div className="container mx-auto max-w-[83rem] px-6 mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-1 text-left"
        >
          <span className="text-xs md:text-sm font-mono tracking-wider uppercase text-neutral-500">{t("projects.tag")}</span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
            {t("projects.title")}
          </h2>
        </motion.div>
      </div>

      {/* Bento Grid layout */}
      <div className="container mx-auto max-w-[83rem] px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROJECTS.map((project) => (
            <BentoCard 
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
              t={t}
            />
          ))}
        </div>
      </div>

      {/* Details Split Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />
            
            {/* Modal Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl z-20 grid grid-cols-1 md:grid-cols-12 text-left"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-100/80 dark:bg-neutral-950/60 border border-neutral-200 dark:border-border/60 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-foreground flex items-center justify-center transition-colors z-50 cursor-pointer"
                aria-label={t("projects.modal.aria.close" as TranslationKey)}
              >
                <X size={14} />
              </button>

              {/* Left Side Spec: Col-span 6 */}
              <div className="p-6 md:p-8 md:col-span-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-neutral-200 dark:border-neutral-800 min-h-[300px]">
                <div className="space-y-5">
                  <div>
                    <span className="text-[10px] font-mono tracking-wider uppercase text-neutral-500">{t(selectedProject.tagKey)}</span>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mt-1 mb-2 tracking-tight">{selectedProject.title}</h3>
                    {/* Tech tags directly under the title */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {selectedProject.tech.map(tech => (
                        <span key={tech} className="px-2 py-0.5 rounded bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800/80 text-neutral-600 dark:text-neutral-400 text-[9px] font-mono">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-neutral-600 dark:text-neutral-300 text-xs md:text-sm leading-relaxed">{t(selectedProject.descKey)}</p>
                  
                  {selectedProject.id === 'buyer-one' && (
                    <div className="space-y-3.5 border-t border-neutral-200 dark:border-neutral-800/80 pt-4">
                      <h4 className="text-[10px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-mono">
                        {t("projects.buyerone.features.title")}
                      </h4>
                      <div className="grid grid-cols-1 gap-2.5">
                        {[
                          { num: 1, icon: Megaphone },
                          { num: 2, icon: BarChart3 },
                          { num: 3, icon: MapPin },
                          { num: 4, icon: LayoutDashboard }
                        ].map(({ num, icon: Icon }) => (
                          <div 
                            key={num} 
                            className="flex gap-3 items-start p-2.5 bg-neutral-50/50 dark:bg-neutral-950/40 border border-neutral-200/60 dark:border-neutral-800/30 rounded-xl hover:border-blue-500/30 dark:hover:border-blue-500/20 hover:bg-blue-500/[0.01] dark:hover:bg-blue-500/[0.02] transition-all duration-300 group/item"
                          >
                            <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 mt-0.5 group-hover/item:scale-105 group-hover/item:bg-blue-500/20 transition-all duration-300">
                              <Icon size={13} />
                            </div>
                            <div className="space-y-0.5">
                              <span className="text-xs font-semibold text-neutral-850 dark:text-neutral-200 block transition-colors group-hover/item:text-neutral-950 dark:group-hover/item:text-white">
                                {t(`projects.buyerone.features.${num}.title` as TranslationKey)}
                              </span>
                              <span className="text-[10px] md:text-[11px] text-neutral-550 dark:text-neutral-400 leading-relaxed block">
                                {t(`projects.buyerone.features.${num}.desc` as TranslationKey)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedProject.id === 'bder-rt' && (
                    <div className="space-y-3.5 border-t border-neutral-200 dark:border-neutral-800/80 pt-4">
                      <h4 className="text-[10px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-mono">
                        {t("projects.bder.features.title" as TranslationKey)}
                      </h4>
                      <div className="grid grid-cols-1 gap-2.5">
                        {[
                          { num: 1, icon: Video },
                          { num: 2, icon: ShieldCheck },
                          { num: 3, icon: MapPin },
                          { num: 4, icon: History }
                        ].map(({ num, icon: Icon }) => (
                          <div 
                            key={num} 
                            className="flex gap-3 items-start p-2.5 bg-neutral-50/50 dark:bg-neutral-950/40 border border-neutral-200/60 dark:border-neutral-800/30 rounded-xl hover:border-emerald-500/30 dark:hover:border-emerald-500/20 hover:bg-emerald-500/[0.01] dark:hover:bg-emerald-500/[0.02] transition-all duration-300 group/item"
                          >
                            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shrink-0 mt-0.5 group-hover/item:scale-105 group-hover/item:bg-emerald-500/20 transition-all duration-300">
                              <Icon size={13} />
                            </div>
                            <div className="space-y-0.5">
                              <span className="text-xs font-semibold text-neutral-850 dark:text-neutral-200 block transition-colors group-hover/item:text-neutral-950 dark:group-hover/item:text-white">
                                {t(`projects.bder.features.${num}.title` as TranslationKey)}
                              </span>
                              <span className="text-[10px] md:text-[11px] text-neutral-550 dark:text-neutral-400 leading-relaxed block">
                                {t(`projects.bder.features.${num}.desc` as TranslationKey)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  {selectedProject.status === 'public' && selectedProject.link ? (
                    <a 
                      href={selectedProject.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-full block"
                    >
                      <Button variant="default" className="w-full h-10 text-xs font-semibold rounded-md flex items-center justify-center gap-2 cursor-pointer">
                        {t("projects.modal.live")} <ExternalLink size={14} />
                      </Button>
                    </a>
                  ) : selectedProject.status === 'public' ? (
                    <Button variant="default" className="w-full h-10 text-xs font-semibold rounded-md flex items-center justify-center gap-2 cursor-pointer">
                      {t("projects.modal.live")} <ExternalLink size={14} />
                    </Button>
                  ) : (
                    <div className="w-full h-10 text-xs font-semibold text-neutral-500 rounded-md bg-neutral-50/50 dark:bg-neutral-950/50 border border-dashed border-neutral-200 dark:border-neutral-800 flex items-center justify-center gap-2 select-none">
                      {t("projects.modal.restricted")} <ShieldQuestion size={14} />
                    </div>
                  )}
                </div>
              </div>

              {/* Right Side Mockup Visual: Col-span 6 */}
              <div className="md:col-span-6 bg-neutral-50/30 dark:bg-neutral-950/50 p-6 md:p-8 flex items-center justify-center min-h-[300px] relative">
                {/* Simulated Grid backdrop inside modal visualizer */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.15] bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:10px_10px]" />
                
                <div className="w-full">
                  <MockupVisualizer 
                    projectId={selectedProject.id} 
                    isEnlarged 
                    onZoomClick={(imgs, idx) => {
                      setLightboxImage(imgs[idx]);
                      setLightboxImages(imgs);
                      setLightboxIndex(idx);
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Viewport Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-md">
            {/* Backdrop */}
            <div className="absolute inset-0 cursor-zoom-out" onClick={() => setLightboxImage(null)} />
            
            {/* Lightbox Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-5xl w-full max-h-[85vh] md:max-h-[90vh] aspect-[16/10] rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-2xl z-20 flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Scrollable Image Area */}
              <div className="relative w-full flex-1 bg-neutral-950 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-850 scrollbar-track-transparent flex items-center justify-center">
                <div className="relative w-full h-full min-h-[450px] md:min-h-[550px]">
                  <Image
                    src={lightboxImage}
                    alt={`${selectedProject?.title || ''} - ${t("projects.modal.lightbox.index" as TranslationKey)} ${lightboxIndex + 1}`}
                    fill
                    className="object-contain p-2 md:p-4"
                    priority
                  />
                </div>
              </div>
              
              {/* Close Button */}
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/70 border border-neutral-800 text-neutral-300 hover:text-white flex items-center justify-center transition-colors z-50 shadow-lg cursor-pointer"
                aria-label={t("projects.modal.aria.closeLightbox" as TranslationKey)}
              >
                <X size={18} />
              </button>
              
              {/* Navigation Arrows */}
              {lightboxImages.length > 1 && (
                <>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      const prevIdx = (lightboxIndex === 0) ? lightboxImages.length - 1 : lightboxIndex - 1;
                      setLightboxIndex(prevIdx);
                      setLightboxImage(lightboxImages[prevIdx]);
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/70 border border-neutral-800 hover:bg-neutral-900 text-white flex items-center justify-center transition-all hover:scale-105 z-10 cursor-pointer shadow-lg"
                    aria-label={t("projects.modal.aria.prev" as TranslationKey)}
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      const nextIdx = (lightboxIndex === lightboxImages.length - 1) ? 0 : lightboxIndex + 1;
                      setLightboxIndex(nextIdx);
                      setLightboxImage(lightboxImages[nextIdx]);
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/70 border border-neutral-850 hover:bg-neutral-955 text-white flex items-center justify-center transition-all hover:scale-105 z-10 cursor-pointer shadow-lg"
                    aria-label={t("projects.modal.aria.next" as TranslationKey)}
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              {/* Active Caption */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 bg-black/60 backdrop-blur-md py-2 px-5 rounded-full border border-neutral-800/60 z-30 select-none">
                <span className="text-[10px] md:text-xs text-neutral-300 font-mono">
                  {lightboxImages.length > 1 
                    ? `${t("projects.modal.lightbox.index" as TranslationKey)} ${lightboxIndex + 1} ${t("projects.modal.lightbox.of" as TranslationKey)} ${lightboxImages.length} ${t("projects.modal.lightbox.closeInfo" as TranslationKey)}` 
                    : t("projects.modal.lightbox.single" as TranslationKey)}
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

interface BentoCardProps {
  project: ProjectData;
  onClick: () => void;
  t: (key: TranslationKey) => string;
}

const BentoCard = ({ project, onClick, t }: BentoCardProps) => {
  const isMystery = project.status === 'mystery';

  return (
    <motion.div 
      onClick={onClick}
      className={cn(
        "relative rounded-2xl border border-border bg-neutral-900/5 dark:bg-neutral-950/10 cursor-pointer overflow-hidden group transition-all duration-500 flex flex-col justify-between",
        project.gridClass,
        // Dynamic brand glow highlights on hover (matching Services)
        project.id === "buyer-one" && "hover:border-blue-500/40 dark:hover:border-blue-500/20 hover:shadow-[0_0_30px_rgba(59,130,246,0.06)]",
        project.id === "bder-rt" && "hover:border-emerald-500/40 dark:hover:border-emerald-500/20 hover:shadow-[0_0_30px_rgba(16,185,129,0.06)]",
        project.id === "ghost" && "hover:border-purple-500/40 dark:hover:border-purple-500/20 hover:shadow-[0_0_30px_rgba(168,85,247,0.06)]",
        project.id === "neural" && "hover:border-amber-500/40 dark:hover:border-amber-500/20 hover:shadow-[0_0_30px_rgba(245,158,11,0.06)]"
      )}
      whileHover={{ y: -4 }}
    >
      {/* Decorative inner gradient background */}
      <div className={cn("absolute inset-0 bg-gradient-to-b opacity-[0.02] group-hover:opacity-[0.08] transition-opacity pointer-events-none duration-550", project.color)} />
      
      {/* Top Section: Info text */}
      <div className="p-6 md:p-7 relative z-10 w-full md:max-w-[520px]">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-mono tracking-wider uppercase text-neutral-500">
            {t(project.tagKey)}
          </span>
          {isMystery && (
            <span className="text-[9px] font-mono bg-red-500/10 dark:bg-red-500/5 text-red-500 px-2 py-0.5 rounded border border-red-500/10 uppercase tracking-widest font-semibold">
              {t("projects.status.secure" as TranslationKey)}
            </span>
          )}
        </div>
        <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-3 flex items-center gap-2">
          {project.title}
          <Eye size={16} className="opacity-0 group-hover:opacity-60 transition-opacity text-neutral-500" />
        </h3>
        <p className="text-muted-foreground text-xs md:text-sm leading-relaxed line-clamp-2">
          {t(project.descKey)}
        </p>
      </div>

      {/* Bottom Section: Mockup display */}
      <div className="flex-1 w-full relative overflow-hidden flex items-end justify-center px-6 md:px-7">
        <div className="w-full relative h-[160px] md:h-[180px] rounded-t-lg border-t border-x border-border/80 bg-neutral-950 overflow-hidden shadow-subtle group-hover:border-neutral-850 transition-colors">
          <MockupVisualizer projectId={project.id} />
        </div>
      </div>
    </motion.div>
  );
};

/* --- Mockup Panels Component --- */
const MockupVisualizer = ({ 
  projectId, 
  isEnlarged = false,
  onZoomClick
}: { 
  projectId: string; 
  isEnlarged?: boolean;
  onZoomClick?: (images: string[], index: number) => void;
}) => {
  const [activeImg, setActiveImg] = useState(0);
  const { t } = useLanguage();

  const projectImages: Record<string, string[]> = {
    "buyer-one": [
      "/images/projects/buyer_one_1.png",
      "/images/projects/buyer_one_2.png",
      "/images/projects/buyer_one_3.png"
    ],
    "bder-rt": [
      "/images/projects/bder-live.png",
      "/images/projects/02 client.png",
      "/images/projects/05 rew.png",
      "/images/projects/08 move.png",
      "/images/projects/09 sout.png",
      "/images/projects/10 funds.png"
    ]
  };

  const images = projectImages[projectId] || [];

  if (projectId === "buyer-one" || projectId === "bder-rt") {
    if (isEnlarged && images.length > 0) {
      return (
        <div className="relative w-full h-full min-h-[300px] flex flex-col justify-between group/carousel animate-fade-in">
          {/* Main Image with Zoom click */}
          <div 
            onClick={() => onZoomClick && onZoomClick(images, activeImg)}
            className="relative w-full flex-1 aspect-[16/10] rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-250 dark:border-neutral-800 cursor-zoom-in group/image shadow-md"
          >
            <Image
              src={images[activeImg]}
              alt={`${projectId === 'buyer-one' ? 'Buyer 1' : 'BDer Live'} - ${t("projects.modal.lightbox.index" as TranslationKey)} ${activeImg + 1}`}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover/image:scale-[1.02]"
            />
            {/* Zoom hover indicator overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/image:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-semibold">
              <ZoomIn size={16} className="text-white animate-pulse" />
              <span>{t("projects.modal.zoom" as TranslationKey)}</span>
            </div>
          </div>
          
          {/* Prev/Next Buttons (only if multiple images exist) */}
          {images.length > 1 && (
            <>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImg(prev => (prev === 0 ? images.length - 1 : prev - 1));
                }}
                className="absolute left-2 top-[40%] -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 border border-neutral-855 hover:bg-neutral-955 text-white flex items-center justify-center transition-opacity opacity-0 group-hover/carousel:opacity-100 z-10 cursor-pointer shadow-md"
                aria-label={t("projects.modal.aria.prev" as TranslationKey)}
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImg(prev => (prev === images.length - 1 ? 0 : prev + 1));
                }}
                className="absolute right-2 top-[40%] -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 border border-neutral-855 hover:bg-neutral-955 text-white flex items-center justify-center transition-opacity opacity-0 group-hover/carousel:opacity-100 z-10 cursor-pointer shadow-md"
                aria-label={t("projects.modal.aria.next" as TranslationKey)}
              >
                <ChevronRight size={16} />
              </button>
            </>
          )}

          {/* Thumbnail Navigation (only if multiple images exist) */}
          {images.length > 1 && (
            <div className="flex justify-center gap-2 mt-3.5 relative z-10 overflow-x-auto py-1 scrollbar-none max-w-full">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImg(idx);
                  }}
                  className={cn(
                    "relative w-12 h-8 rounded-md overflow-hidden border transition-all duration-300 shrink-0 cursor-pointer",
                    activeImg === idx 
                      ? (projectId === 'buyer-one' ? "border-blue-500 ring-1 ring-blue-500/30 scale-105" : "border-emerald-500 ring-1 ring-emerald-500/30 scale-105")
                      : "border-neutral-200 dark:border-neutral-800 opacity-60 hover:opacity-100"
                  )}
                  aria-label={`${t("projects.modal.lightbox.index" as TranslationKey)} ${idx + 1}`}
                >
                  <Image
                    src={img}
                    alt={`Miniatura ${idx + 1}`}
                    fill
                    className="object-cover object-top"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      );
    }
    return (
      <div className="relative w-full h-full min-h-[160px]">
        {images.length > 0 && (
          <Image
            src={images[0]}
            alt={`${projectId} Preview`}
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
        )}
      </div>
    );
  }

  switch (projectId) {
    case "ghost":
      return (
        <div className="p-4 md:p-5 font-mono text-[10px] md:text-xs text-neutral-400 space-y-2.5 w-full h-full flex flex-col justify-start text-left">
          <div className="flex items-center justify-between border-b border-border/50 pb-2">
            <span className="uppercase text-neutral-300 font-bold flex items-center gap-1.5">
              <Lock size={12} className="text-purple-400" /> Secure Tunnel
            </span>
            <span className="text-neutral-500 text-[9px] md:text-[10px]">mx-tunnel-0</span>
          </div>
          <div className="space-y-1.5 pt-1.5 text-[9px] md:text-[11px]">
            <div className="text-purple-400 font-semibold"># wg-quick up wg0</div>
            <div>[+] Initializing handshake...</div>
            <div className="text-emerald-400 font-semibold">[+] Tunnel status: ESTABLISHED</div>
            <div className="text-neutral-500 select-none">Key: AE09...31BF9902X</div>
          </div>
        </div>
      );

    case "neural":
      return (
        <div className="p-4 md:p-5 space-y-4 font-sans w-full h-full flex flex-col justify-between text-left">
          <div className="flex justify-between items-center border-b border-border/50 pb-2">
            <span className="text-[11px] md:text-xs font-mono text-neutral-400 uppercase tracking-wider">AI Optimizer</span>
            <span className="text-[10px] md:text-[11px] font-mono text-purple-400 bg-purple-500/5 px-2 py-0.5 rounded font-bold">ACTIVE</span>
          </div>
          {/* Simulated node connection flow map */}
          <div className="flex justify-around items-center h-24 md:h-28 relative pt-2">
            <div className="w-10 h-10 rounded-full border border-border bg-neutral-950 flex items-center justify-center text-neutral-400 font-mono text-[10px] z-10">IN</div>
            
            {/* SVG Connecting pathways */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" xmlns="http://www.w3.org/2000/svg">
              <line x1="20%" y1="50%" x2="50%" y2="25%" stroke="var(--color-border)" strokeWidth="1" />
              <line x1="20%" y1="50%" x2="50%" y2="75%" stroke="var(--color-border)" strokeWidth="1" />
              <line x1="50%" y1="25%" x2="80%" y2="50%" stroke="var(--color-border)" strokeWidth="1" />
              <line x1="50%" y1="75%" x2="80%" y2="50%" stroke="var(--color-border)" strokeWidth="1" />
            </svg>

            <div className="space-y-4 z-10 flex flex-col justify-center">
              <div className="w-8 h-8 rounded-full border border-border bg-neutral-950 flex items-center justify-center text-blue-400 font-mono text-[9px]">N1</div>
              <div className="w-8 h-8 rounded-full border border-border bg-neutral-950 flex items-center justify-center text-purple-400 font-mono text-[9px]">N2</div>
            </div>

            <div className="w-10 h-10 rounded-full border border-border bg-neutral-950 flex items-center justify-center text-neutral-400 font-mono text-[10px] z-10">OUT</div>
          </div>
        </div>
      );

    default:
      return null;
  }
};