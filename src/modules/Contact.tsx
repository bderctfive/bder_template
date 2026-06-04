"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Mail, Send, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { sendContactEmail } from "@/app/actions";

export const Contact = () => {
  const { t } = useLanguage();

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    category: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<{
    success: boolean | null;
    errorKey: string | null;
  }>({ success: null, errorKey: null });

  // Update default category translation if user hasn't typed anything
  React.useEffect(() => {
    setFormData(prev => ({
      ...prev,
      category: prev.category || t("hero.tag.software")
    }));
  }, [t]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ success: null, errorKey: null });

    try {
      const result = await sendContactEmail(formData);
      if (result.success) {
        setSubmitStatus({ success: true, errorKey: null });
        setFormData({
          name: "",
          email: "",
          category: t("hero.tag.software"),
          message: ""
        });
      } else {
        let errorKey = "contact.error.generic";
        if (result.error === "missing_name" || result.error === "missing_email" || result.error === "missing_category" || result.error === "missing_message") {
          errorKey = "contact.error.fields";
        } else if (result.error === "invalid_email") {
          errorKey = "contact.error.email";
        } else if (result.error === "missing_api_key" || result.error === "resend_error") {
          errorKey = "contact.error.api";
        }
        setSubmitStatus({ success: false, errorKey });
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus({ success: false, errorKey: "contact.error.generic" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-12 md:py-16 bg-transparent overflow-hidden">
      {/* Background Decor: Softer glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neutral-200/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-neutral-200/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-[83rem] px-6 relative z-10">
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
                detail="+52 660 210 2997" 
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
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputGroup 
                  label={t("contact.form.name")} 
                  placeholder="Ej. Carlos Merino" 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <InputGroup 
                  label={t("contact.form.email")} 
                  placeholder="nombre@empresa.com" 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider ml-0.5">{t("contact.form.category")}</label>
                <div className="relative">
                  <select 
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full bg-neutral-50 dark:bg-neutral-950 border border-border rounded-md px-3.5 py-2.5 text-xs text-foreground placeholder:text-neutral-450 dark:placeholder:text-neutral-600 focus:outline-none focus:ring-1 focus:ring-ring transition-all appearance-none cursor-pointer"
                  >
                    <option value={t("hero.tag.software")}>{t("hero.tag.software")}</option>
                    <option value={t("hero.tag.infra")}>{t("hero.tag.infra")}</option>
                    <option value={t("hero.tag.auto")}>{t("hero.tag.auto")}</option>
                    <option value={t("services.02.title")}>{t("services.02.title")}</option>
                    <option value="Otro / Other">Otro / Other</option>
                  </select>
                  <div className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none text-neutral-500 text-xs">
                    ▼
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider ml-0.5">{t("contact.form.msg")}</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4} 
                  className="w-full bg-neutral-50 dark:bg-neutral-950 border border-border rounded-md px-3.5 py-2.5 text-xs text-foreground placeholder:text-neutral-450 dark:placeholder:text-neutral-600 focus:outline-none focus:ring-1 focus:ring-ring transition-all resize-none"
                  placeholder={t("contact.form.msg.placeholder")}
                />
              </div>

              {submitStatus.success !== null && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3.5 rounded-xl border text-[11px] font-mono tracking-tight leading-relaxed flex items-start gap-2.5 backdrop-blur-sm transition-all duration-300 ${
                    submitStatus.success 
                      ? "bg-emerald-500/5 dark:bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400" 
                      : "bg-amber-500/5 dark:bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400"
                  }`}
                >
                  {submitStatus.success ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 animate-pulse shrink-0" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 animate-pulse shrink-0" />
                  )}
                  <span>
                    {submitStatus.success 
                      ? t("contact.success") 
                      : t(submitStatus.errorKey as any)}
                  </span>
                </motion.div>
              )}

              <Button
                variant="default"
                type="submit"
                loading={isSubmitting}
                className="w-full h-10 text-xs font-semibold rounded-md flex items-center justify-center gap-2"
              >
                {isSubmitting ? t("contact.form.submitting") : (
                  <>
                    {t("contact.form.submit")}
                    <Send size={12} className="text-current" />
                  </>
                )}
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

const InputGroup = ({ 
  label, 
  placeholder, 
  type, 
  name, 
  value, 
  onChange 
}: { 
  label: string; 
  placeholder: string; 
  type: string; 
  name: string; 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
}) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider ml-0.5">{label}</label>
    <input 
      type={type} 
      name={name}
      value={value}
      onChange={onChange}
      required
      className="w-full bg-neutral-50 dark:bg-neutral-950 border border-border rounded-md px-3.5 py-2.5 text-xs text-foreground placeholder:text-neutral-450 dark:placeholder:text-neutral-600 focus:outline-none focus:ring-1 focus:ring-ring transition-all"
      placeholder={placeholder}
    />
  </div>
);