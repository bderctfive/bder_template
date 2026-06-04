"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Laptop, Server, Zap, LucideIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

type TranslationKey = keyof typeof translations['es'];

interface SlideData {
  tagKey: TranslationKey;
  titleKey: TranslationKey;
  descKey: TranslationKey;
  icon: LucideIcon;
  badgeColor: string;
}

const SLIDES: SlideData[] = [
  {
    tagKey: "hero.tag.software",
    titleKey: "hero.title.software",
    descKey: "hero.desc.software",
    icon: Laptop,
    badgeColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  },
  {
    tagKey: "hero.tag.infra",
    titleKey: "hero.title.infra",
    descKey: "hero.desc.infra",
    icon: Server,
    badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    tagKey: "hero.tag.auto",
    titleKey: "hero.title.auto",
    descKey: "hero.desc.auto",
    icon: Zap,
    badgeColor: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  }
];

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { t } = useLanguage();

  // Auto transition tabs every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[activeTab];

  return (
    <section className="relative w-full min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden bg-background">
      {/* Light glow overlay to mimic premium SaaS header */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-neutral-200/5 to-transparent blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-[83rem] px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading and Actions */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            
            {/* Tab/Slide indicator badges */}
            {/* Tab/Slide indicator badges */}
            <div className="flex gap-2 mb-6 w-full overflow-x-auto no-scrollbar flex-nowrap pb-1 md:pb-0 select-none">
              {SLIDES.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase transition-all duration-300 border shrink-0 ${
                    activeTab === idx
                      ? "bg-neutral-100 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-800 text-foreground"
                      : "bg-transparent border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {`0${idx + 1}. ${t(idx === 0 ? "hero.software" : idx === 1 ? "hero.systems" : "hero.process")}`}
                </button>
              ))}
            </div>

            {/* Content Transition container */}
            <div className="min-h-[180px] sm:min-h-[160px] md:min-h-[220px] w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  {/* Category icon badge */}
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[11px] font-mono uppercase ${slide.badgeColor} mb-4`}>
                    <slide.icon className="w-3.5 h-3.5" />
                    <span>{t(slide.tagKey)}</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.05] balance mb-4">
                    {t(slide.titleKey)}
                  </h1>

                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed balance max-w-lg mb-6 md:mb-8">
                    {t(slide.descKey)}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button 
                variant="default" 
                size="default" 
                className="group h-10 px-5 text-xs font-semibold rounded-md w-full sm:w-auto justify-center"
                onClick={() => {
                  const el = document.getElementById("contacto");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {t("hero.btn.start")}
                <ArrowRight className="ml-2 w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="default" 
                className="h-10 px-5 text-xs font-medium rounded-md w-full sm:w-auto justify-center"
                onClick={() => {
                  const el = document.getElementById("servicios");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {t("hero.btn.services")}
              </Button>
            </div>
          </div>

          {/* Right Column: Code/Dashboard Mockup */}
          <div className="lg:col-span-6 w-full flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-[4/3] rounded-xl border border-neutral-800 bg-neutral-950 shadow-subtle overflow-hidden flex flex-col text-neutral-300">
              
              {/* Window Header bar */}
              <div className="h-10 border-b border-neutral-800 flex items-center justify-between px-4 bg-neutral-900/50 select-none">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
                </div>
                <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                  bctech_system_console
                </div>
                <div className="w-10" />
              </div>

              {/* Window Content container */}
              <div className="flex-1 relative overflow-hidden bg-black/40">
                <AnimatePresence mode="wait">
                  {activeTab === 0 && (
                    <motion.div
                      key="software-code"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 font-mono text-[10.5px] leading-relaxed text-neutral-400 p-5 space-y-2 overflow-y-auto"
                    >
                      <div className="text-neutral-500">{t("hero.console.software.comment")}</div>
                      <div>
                        <span className="text-neutral-500">1</span>&nbsp;&nbsp;
                        <span className="text-blue-400">const</span> app = <span className="text-emerald-400">createGateway</span>()
                      </div>
                      <div>
                        <span className="text-neutral-500">2</span>&nbsp;&nbsp;
                        app.<span className="text-purple-400">post</span>(<span className="text-amber-400">"/deploy"</span>, (req, res) =&gt; &#123;
                      </div>
                      <div className="pl-4">
                        <span className="text-neutral-500">3</span>&nbsp;&nbsp;
                        scaleUp(&#123; <span className="text-neutral-300">replicas: req.body.replicas</span> &#125;)
                      </div>
                      <div className="pl-4">
                        <span className="text-neutral-500">4</span>&nbsp;&nbsp;
                        res.<span className="text-purple-400">status</span>(<span className="text-neutral-300">200</span>).<span className="text-purple-400">json</span>(&#123; <span className="text-neutral-300">ok: true</span> &#125;)
                      </div>
                      <div>
                        <span className="text-neutral-500">5</span>&nbsp;&nbsp;
                        &#125;)
                      </div>
                      <div className="pt-2 border-t border-neutral-900 mt-4">
                        <div className="text-neutral-500 font-bold mb-1">STDOUT:</div>
                        <div className="text-emerald-500">{t("hero.console.software.log1")}</div>
                        <div className="text-neutral-300">{t("hero.console.software.log2")}</div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 1 && (
                    <motion.div
                      key="infra-stats"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 p-5 space-y-4"
                    >
                      <div className="flex justify-between items-center text-[10px] text-neutral-400 border-b border-neutral-900 pb-2">
                        <span className="font-mono">{t("hero.console.infra.title")}</span>
                        <span className="text-emerald-500 font-medium flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          ONLINE
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                        <div className="bg-neutral-950 border border-neutral-800/60 p-2 sm:p-2.5 rounded-md text-center">
                          <div className="text-[8px] sm:text-[9px] text-neutral-500 uppercase tracking-wider">{t("hero.console.infra.cpu")}</div>
                          <div className="text-[10px] sm:text-xs font-mono font-bold mt-1">
                            <span className="text-neutral-200">14.2%</span>
                          </div>
                        </div>
                        <div className="bg-neutral-950 border border-neutral-800/60 p-2 sm:p-2.5 rounded-md text-center">
                          <div className="text-[8px] sm:text-[9px] text-neutral-500 uppercase tracking-wider">{t("hero.console.infra.mem")}</div>
                          <div className="text-[10px] sm:text-xs font-mono font-bold mt-1">
                            <span className="text-neutral-200">4.1 GB</span>
                          </div>
                        </div>
                        <div className="bg-neutral-950 border border-neutral-800/60 p-2 sm:p-2.5 rounded-md text-center">
                          <div className="text-[8px] sm:text-[9px] text-neutral-500 uppercase tracking-wider">{t("hero.console.infra.net")}</div>
                          <div className="text-[10px] sm:text-xs font-mono font-bold mt-1">
                            <span className="text-neutral-200">820 Mbps</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1.5 text-[10px] font-mono text-neutral-400 pt-2">
                        <div className="flex justify-between"><span>ping-us-west.bctech.com.mx</span><span className="text-emerald-400">12ms</span></div>
                        <div className="flex justify-between"><span>ping-mx-hmo.bctech.com.mx</span><span className="text-emerald-400">4ms</span></div>
                        <div className="flex justify-between"><span>ping-eu-central.bctech.com.mx</span><span className="text-amber-400">74ms</span></div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 2 && (
                    <motion.div
                      key="auto-pipeline"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 p-5 space-y-4 flex flex-col justify-center"
                    >
                      <div className="text-[10px] font-mono text-neutral-400 border-b border-neutral-900 pb-2 text-center">
                        {t("hero.console.auto.title")}
                      </div>
                      <div className="flex flex-col items-center gap-1 pt-1">
                        <div className="bg-neutral-950 border border-neutral-800/60 px-3 py-1.5 rounded-md text-[10px] font-mono flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full shrink-0" />
                          <span className="text-neutral-200">{t("hero.console.auto.trigger")}</span>
                        </div>
                        <div className="h-3 w-px bg-neutral-800" />
                        <div className="bg-neutral-950 border border-neutral-800/60 px-3 py-1.5 rounded-md text-[10px] font-mono flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0" />
                          <span className="text-neutral-200">{t("hero.console.auto.scan")}</span>
                        </div>
                        <div className="h-3 w-px bg-neutral-800" />
                        <div className="bg-neutral-950 border border-neutral-800/60 px-3 py-1.5 rounded-md text-[10px] font-mono flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-purple-500 rounded-full shrink-0" />
                          <span className="text-neutral-200">{t("hero.console.auto.notify")}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Sub-grid lines overlay */}
              <div className="absolute inset-0 border border-neutral-800 rounded-xl pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;