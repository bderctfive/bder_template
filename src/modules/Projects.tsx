"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, ShieldQuestion, ArrowRight, ShieldCheck, Lock, Activity, Eye } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

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
}

const PROJECTS: ProjectData[] = [
  {
    id: "buyer-one",
    title: "Buyer One",
    tagKey: "projects.buyerone.tag",
    descKey: "projects.buyerone.desc",
    tech: ["Angular", "Flutter", "FastAPI"],
    color: "from-blue-500/10 to-transparent",
    gridClass: "md:col-span-2 h-[340px]",
    status: "public"
  },
  {
    id: "bder-rt",
    title: "BcTech Real-Time",
    tagKey: "projects.bder.tag",
    descKey: "projects.bder.desc",
    tech: ["Next.js", "WebRTC", "PostgreSQL"],
    color: "from-emerald-500/10 to-transparent",
    gridClass: "md:col-span-1 h-[340px]",
    status: "public"
  },
  {
    id: "ghost",
    title: "Project Ghost",
    tagKey: "projects.ghost.tag",
    descKey: "projects.ghost.desc",
    tech: ["Rust", "Vault", "WireGuard"],
    color: "from-purple-500/10 to-transparent",
    gridClass: "md:col-span-1 h-[340px]",
    status: "mystery"
  },
  {
    id: "neural",
    title: "Neural Core",
    tagKey: "projects.neural.tag",
    descKey: "projects.neural.desc",
    tech: ["Python", "TensorFlow", "FastAPI"],
    color: "from-amber-500/10 to-transparent",
    gridClass: "md:col-span-2 h-[340px]",
    status: "mystery"
  }
];

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const { t } = useLanguage();

  return (
    <section className="py-12 md:py-16 bg-transparent overflow-hidden relative">
      <div className="container mx-auto max-w-5xl px-6 mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-1 text-left"
        >
          <span className="text-[10px] font-mono tracking-wider uppercase text-neutral-500">{t("projects.tag")}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            {t("projects.title")}
          </h2>
        </motion.div>
      </div>

      {/* Bento Grid layout */}
      <div className="container mx-auto max-w-5xl px-6">
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
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            {/* Modal Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto md:overflow-hidden bg-neutral-900 border border-border rounded-xl shadow-lg z-20 grid grid-cols-1 md:grid-cols-12"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-950/60 border border-border/60 hover:bg-neutral-800 hover:text-foreground text-neutral-400 flex items-center justify-center transition-colors z-50"
                aria-label="Cerrar modal"
              >
                <X size={14} />
              </button>

              {/* Left Side Spec: Col-span 7 */}
              <div className="p-6 md:p-8 md:col-span-7 flex flex-col justify-between border-b md:border-b-0 md:border-r border-border min-h-[300px]">
                <div>
                  <span className="text-[10px] font-mono tracking-wider uppercase text-neutral-500">{t(selectedProject.tagKey)}</span>
                  <h3 className="text-xl font-bold text-foreground mt-1 mb-4 tracking-tight">{selectedProject.title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed mb-6">{t(selectedProject.descKey)}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.tech.map(tech => (
                      <span key={tech} className="px-2 py-0.5 rounded bg-neutral-950 border border-border text-neutral-400 text-[10px] font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedProject.status === 'public' ? (
                  <Button variant="default" className="w-full h-10 text-xs font-semibold rounded-md flex items-center justify-center gap-2">
                    {t("projects.modal.live")} <ExternalLink size={14} />
                  </Button>
                ) : (
                  <div className="w-full h-10 text-xs font-semibold text-neutral-500 rounded-md bg-neutral-950/50 border border-dashed border-border flex items-center justify-center gap-2 select-none">
                    {t("projects.modal.restricted")} <ShieldQuestion size={14} />
                  </div>
                )}
              </div>

              {/* Right Side Mockup Visual: Col-span 5 */}
              <div className="md:col-span-5 bg-neutral-950/50 p-6 md:p-8 flex items-center justify-center min-h-[250px] relative">
                {/* Simulated Grid backdrop inside modal visualizer */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.15] bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:10px_10px]" />
                
                <div className="w-full scale-110">
                  <MockupVisualizer projectId={selectedProject.id} isEnlarged />
                </div>
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
        "relative rounded-xl border border-border bg-neutral-900/5 dark:bg-neutral-950/10 cursor-pointer overflow-hidden group transition-all duration-300 hover:border-neutral-400 dark:hover:border-neutral-800 flex flex-col justify-between",
        project.gridClass
      )}
      whileHover={{ y: -2 }}
    >
      {/* Decorative inner gradient background */}
      <div className={cn("absolute inset-0 bg-gradient-to-b opacity-[0.03] group-hover:opacity-[0.06] transition-opacity pointer-events-none", project.color)} />
      
      {/* Top Section: Info text */}
      <div className="p-6 relative z-10 w-full md:max-w-[450px]">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[9px] font-mono tracking-wider uppercase text-neutral-500">
            {t(project.tagKey)}
          </span>
          {isMystery && (
            <span className="text-[8px] font-mono bg-red-500/10 dark:bg-red-500/5 text-red-500 px-1.5 py-0.5 rounded border border-red-500/10 uppercase tracking-widest">
              SECURE
            </span>
          )}
        </div>
        <h3 className="text-lg font-bold text-foreground tracking-tight mb-2 flex items-center gap-1.5">
          {project.title}
          <Eye size={12} className="opacity-0 group-hover:opacity-60 transition-opacity text-neutral-500" />
        </h3>
        <p className="text-muted-foreground text-[11px] leading-relaxed line-clamp-2">
          {t(project.descKey)}
        </p>
      </div>

      {/* Bottom Section: Mockup display */}
      <div className="flex-1 w-full relative overflow-hidden flex items-end justify-center px-6">
        <div className="w-full relative h-[160px] md:h-[180px] rounded-t-lg border-t border-x border-border/80 bg-neutral-950 overflow-hidden shadow-subtle group-hover:border-border transition-colors">
          <MockupVisualizer projectId={project.id} />
        </div>
      </div>
    </motion.div>
  );
};

/* --- Mockup Panels Component --- */
const MockupVisualizer = ({ projectId, isEnlarged = false }: { projectId: string; isEnlarged?: boolean }) => {
  switch (projectId) {
    case "buyer-one":
      return (
        <div className="p-4 space-y-3 font-sans w-full h-full flex flex-col justify-start">
          <div className="flex justify-between items-center border-b border-border/50 pb-2">
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">ERP Sales Panel</span>
            <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/5 px-1.5 py-0.2 rounded">+14.2%</span>
          </div>
          <div className="space-y-2">
            <div className="h-2 w-10/12 bg-neutral-900 rounded" />
            <div className="h-2 w-7/12 bg-neutral-900 rounded" />
          </div>
          {/* Simple simulated graphic */}
          <div className="flex items-end gap-1.5 h-16 pt-2 w-full justify-between select-none">
            <div className="w-full bg-neutral-900 rounded-t h-4" />
            <div className="w-full bg-neutral-900 rounded-t h-8" />
            <div className="w-full bg-neutral-900 rounded-t h-6" />
            <div className="w-full bg-neutral-900 rounded-t h-12" />
            <div className="w-full bg-blue-500/60 rounded-t h-14" />
            <div className="w-full bg-blue-500 rounded-t h-[72px]" />
          </div>
        </div>
      );

    case "bder-rt":
      return (
        <div className="p-4 font-mono text-[9px] text-neutral-500 space-y-2.5 w-full h-full flex flex-col justify-between">
          <div className="flex justify-between items-center text-neutral-400">
            <span className="flex items-center gap-1.5 font-bold text-red-500">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              LIVE FEED
            </span>
            <span>42 fps</span>
          </div>
          {/* Simulated stream mockup box */}
          <div className="flex-1 min-h-[70px] bg-neutral-900/60 border border-border/40 rounded flex items-center justify-center relative overflow-hidden">
            <Activity className="w-6 h-6 text-neutral-700 animate-pulse" />
            <div className="absolute bottom-1 right-1.5 text-[8px] text-neutral-600">
              29°05'56"N 110°57'15"W
            </div>
          </div>
          <div className="flex justify-between text-[8px]">
            <span>LATENCY: <span className="text-emerald-400">42ms</span></span>
            <span>BW: <span className="text-blue-400">4.8 MB/s</span></span>
          </div>
        </div>
      );

    case "ghost":
      return (
        <div className="p-4 font-mono text-[9px] text-neutral-500 space-y-2 w-full h-full flex flex-col justify-start">
          <div className="flex items-center justify-between border-b border-border/50 pb-2">
            <span className="uppercase text-neutral-400 font-bold flex items-center gap-1">
              <Lock size={10} className="text-purple-400" /> Secure Tunnel
            </span>
            <span className="text-neutral-600 text-[8px]">mx-tunnel-0</span>
          </div>
          <div className="space-y-1 pt-1">
            <div className="text-purple-400"># wg-quick up wg0</div>
            <div>[+] Initializing handshake...</div>
            <div className="text-emerald-400">[+] Tunnel status: ESTABLISHED</div>
            <div className="text-neutral-600 select-none">Key: AE09...31BF9902X</div>
          </div>
        </div>
      );

    case "neural":
      return (
        <div className="p-4 space-y-3 font-sans w-full h-full flex flex-col justify-between">
          <div className="flex justify-between items-center border-b border-border/50 pb-2">
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">AI Optimizer</span>
            <span className="text-[9px] font-mono text-purple-400 bg-purple-500/5 px-1.5 py-0.2 rounded font-bold">ACTIVE</span>
          </div>
          {/* Simulated node connection flow map */}
          <div className="flex justify-around items-center h-20 relative pt-2">
            <div className="w-8 h-8 rounded-full border border-border bg-neutral-950 flex items-center justify-center text-neutral-400 font-mono text-[8px] z-10">IN</div>
            
            {/* SVG Connecting pathways */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" xmlns="http://www.w3.org/2000/svg">
              <line x1="20%" y1="50%" x2="50%" y2="25%" stroke="var(--color-border)" strokeWidth="1" />
              <line x1="20%" y1="50%" x2="50%" y2="75%" stroke="var(--color-border)" strokeWidth="1" />
              <line x1="50%" y1="25%" x2="80%" y2="50%" stroke="var(--color-border)" strokeWidth="1" />
              <line x1="50%" y1="75%" x2="80%" y2="50%" stroke="var(--color-border)" strokeWidth="1" />
            </svg>

            <div className="space-y-4 z-10 flex flex-col justify-center">
              <div className="w-6 h-6 rounded-full border border-border bg-neutral-950 flex items-center justify-center text-blue-400 font-mono text-[8px]">N1</div>
              <div className="w-6 h-6 rounded-full border border-border bg-neutral-950 flex items-center justify-center text-purple-400 font-mono text-[8px]">N2</div>
            </div>

            <div className="w-8 h-8 rounded-full border border-border bg-neutral-950 flex items-center justify-center text-neutral-400 font-mono text-[8px] z-10">OUT</div>
          </div>
        </div>
      );

    default:
      return null;
  }
};