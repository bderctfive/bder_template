"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Mail, Send, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

export const Contact = () => {
  const { t } = useLanguage();

  return (
    <section className="relative py-12 md:py-16 bg-transparent overflow-hidden">
      {/* Background Decor: Softer glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neutral-200/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-neutral-200/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-5xl px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 flex flex-col items-start"
          >
            <span className="text-[10px] font-mono tracking-wider uppercase text-neutral-500 mb-1">
              {t("contact.tag")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">
              {t("contact.title")}
            </h2>
            <p className="text-muted-foreground text-xs leading-relaxed mb-8 max-w-sm">
              {t("contact.desc")}
            </p>

            <div className="space-y-4 w-full">
              <ContactInfo 
                icon={MapPin} 
                title={t("contact.info.loc")} 
                detail="Hermosillo, Sonora, México" 
              />
              <ContactInfo 
                icon={Mail} 
                title={t("contact.info.email")} 
                detail="contact@bctech.com.mx" 
              />
              <ContactInfo 
                icon={Phone} 
                title={t("contact.info.phone")} 
                detail="+52 (662) 000 0000" 
              />
            </div>
          </motion.div>

          {/* Right Side: Stylized Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-7 relative p-6 md:p-8 rounded-2xl bg-neutral-900/5 dark:bg-neutral-900/10 border border-border shadow-subtle backdrop-blur-md"
          >
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputGroup label={t("contact.form.name")} placeholder="Ej. Carlos Merino" type="text" />
                <InputGroup label={t("contact.form.email")} placeholder="nombre@empresa.com" type="email" />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider ml-0.5">{t("contact.form.category")}</label>
                <div className="relative">
                  <select className="w-full bg-neutral-50 dark:bg-neutral-950 border border-border rounded-md px-3.5 py-2.5 text-xs text-foreground placeholder:text-neutral-450 dark:placeholder:text-neutral-600 focus:outline-none focus:ring-1 focus:ring-ring transition-all appearance-none cursor-pointer">
                    <option>{t("hero.tag.software")}</option>
                    <option>{t("hero.tag.infra")}</option>
                    <option>{t("hero.tag.auto")}</option>
                    <option>{t("services.02.title")}</option>
                    <option>Otro / Other</option>
                  </select>
                  <div className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none text-neutral-500 text-xs">
                    ▼
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider ml-0.5">{t("contact.form.msg")}</label>
                <textarea 
                  rows={4} 
                  className="w-full bg-neutral-50 dark:bg-neutral-950 border border-border rounded-md px-3.5 py-2.5 text-xs text-foreground placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:ring-1 focus:ring-ring transition-all resize-none"
                  placeholder={t("contact.form.msg.placeholder")}
                />
              </div>

              <Button
                variant="default"
                className="w-full h-10 text-xs font-semibold rounded-md flex items-center justify-center gap-2"
              >
                {t("contact.form.submit")}
                <Send size={12} className="text-current" />
              </Button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

const ContactInfo = ({ icon: Icon, title, detail }: { icon: any, title: string, detail: string }) => (
  <div className="flex gap-4 group items-center p-3 rounded-xl border border-border/30 bg-neutral-900/5 hover:bg-neutral-900/10 hover:border-border/60 transition-all duration-300">
    <div className="w-10 h-10 rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-border/60 flex items-center justify-center group-hover:border-border transition-colors">
      <Icon className="text-neutral-450 dark:text-neutral-400 w-4 h-4" />
    </div>
    <div>
      <h4 className="text-[9px] font-mono text-neutral-500 uppercase tracking-wider">{title}</h4>
      <p className="text-foreground font-bold text-sm tracking-tight">{detail}</p>
    </div>
  </div>
);

const InputGroup = ({ label, placeholder, type }: { label: string, placeholder: string, type: string }) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider ml-0.5">{label}</label>
    <input 
      type={type} 
      className="w-full bg-neutral-50 dark:bg-neutral-950 border border-border rounded-md px-3.5 py-2.5 text-xs text-foreground placeholder:text-neutral-450 dark:placeholder:text-neutral-600 focus:outline-none focus:ring-1 focus:ring-ring transition-all"
      placeholder={placeholder}
    />
  </div>
);