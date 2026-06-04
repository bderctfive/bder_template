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
    category: "software", // Default static code
    message: "",
    website: "" // Honeypot spam protection
  });
  const [touched, setTouched] = React.useState({
    name: false,
    email: false,
    message: false
  });
  const [errors, setErrors] = React.useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<{
    success: boolean | null;
    errorKey: string | null;
  }>({ success: null, errorKey: null });

  const validateField = React.useCallback((fieldName: string, value: string) => {
    let error = "";
    if (fieldName === "name") {
      const trimmed = value.trim();
      if (!trimmed) {
        error = "contact.error.fields";
      } else if (trimmed.length < 2) {
        error = "contact.error.name.too_short";
      } else if (!/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s.\-']+$/.test(trimmed) || !/[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]/.test(trimmed)) {
        error = "contact.error.name";
      }
    } else if (fieldName === "email") {
      const trimmed = value.trim();
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!trimmed) {
        error = "contact.error.fields";
      } else if (!emailRegex.test(trimmed)) {
        error = "contact.error.email";
      }
    } else if (fieldName === "message") {
      const trimmed = value.trim();
      if (!trimmed) {
        error = "contact.error.fields";
      } else if (trimmed.length < 10) {
        error = "contact.error.message.too_short";
      } else if (!/[a-zA-Z0-9áéíóúüñÁÉÍÓÚÜÑ]/.test(trimmed)) {
        error = "contact.error.message";
      }
    }
    return error;
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    let processedValue = value;
    if (name === "name") {
      // Limpia en tiempo real cualquier carácter que no sea letra, espacio, punto, guion o apóstrofe
      processedValue = value.replace(/[^a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s.\-']/g, "");
    }

    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));

    if (name in touched && touched[name as keyof typeof touched]) {
      const error = validateField(name, processedValue);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const nameError = validateField("name", formData.name);
    const emailError = validateField("email", formData.email);
    const messageError = validateField("message", formData.message);

    if (nameError || emailError || messageError) {
      setTouched({ name: true, email: true, message: true });
      setErrors({ name: nameError, email: emailError, message: messageError });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ success: null, errorKey: null });

    try {
      const result = await sendContactEmail(formData);
      if (result.success) {
        setSubmitStatus({ success: true, errorKey: null });
        setFormData({
          name: "",
          email: "",
          category: "software",
          message: "",
          website: ""
        });
        setTouched({ name: false, email: false, message: false });
        setErrors({ name: "", email: "", message: "" });
      } else {
        let errorKey = "contact.error.generic";
        if (result.error === "missing_name" || result.error === "missing_email" || result.error === "missing_category" || result.error === "missing_message") {
          errorKey = "contact.error.fields";
        } else if (result.error === "invalid_name" || result.error === "name_length_invalid") {
          errorKey = "contact.error.name";
        } else if (result.error === "invalid_email") {
          errorKey = "contact.error.email";
        } else if (result.error === "invalid_message" || result.error === "message_length_invalid") {
          errorKey = "contact.error.message";
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
              {/* Honeypot spam protection field (hidden from screen-readers and visual users) */}
              <div className="absolute opacity-0 pointer-events-none w-0 h-0 overflow-hidden" aria-hidden="true">
                <label htmlFor="website-field">Leave this field empty if you are human</label>
                <input
                  id="website-field"
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputGroup 
                  label={t("contact.form.name")} 
                  placeholder="Ej. Carlos Merino" 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  maxLength={100}
                  autoComplete="name"
                  pattern="^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s.\-']+$"
                  error={touched.name && errors.name ? t(errors.name as any) : ""}
                />
                <InputGroup 
                  label={t("contact.form.email")} 
                  placeholder="nombre@empresa.com" 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  maxLength={100}
                  autoComplete="email"
                  error={touched.email && errors.email ? t(errors.email as any) : ""}
                />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider ml-0.5">{t("contact.form.category")}</label>
                <div className="relative">
                  <select 
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full bg-neutral-50 dark:bg-neutral-950 border border-border rounded-md px-3.5 py-2.5 text-base md:text-xs text-foreground placeholder:text-neutral-450 dark:placeholder:text-neutral-600 focus:outline-none focus:ring-1 focus:ring-ring transition-all appearance-none cursor-pointer"
                  >
                    <option value="software">{t("hero.tag.software")}</option>
                    <option value="infra">{t("hero.tag.infra")}</option>
                    <option value="auto">{t("hero.tag.auto")}</option>
                    <option value="support">{t("services.02.title")}</option>
                    <option value="other">Otro / Other</option>
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
                  onBlur={handleBlur}
                  required
                  maxLength={2000}
                  rows={4} 
                  className={`w-full bg-neutral-50 dark:bg-neutral-950 border rounded-md px-3.5 py-2.5 text-base md:text-xs text-foreground placeholder:text-neutral-450 dark:placeholder:text-neutral-600 focus:outline-none focus:ring-1 transition-all resize-none ${
                    touched.message && errors.message
                      ? "border-amber-500 focus:ring-amber-500 focus:border-amber-500 dark:border-amber-500/50"
                      : "border-border focus:ring-ring"
                  }`}
                  placeholder={t("contact.form.msg.placeholder")}
                />
                {touched.message && errors.message && (
                  <span className="block text-[10px] font-mono text-amber-600 dark:text-amber-400 mt-1 ml-0.5 animate-in fade-in slide-in-from-top-1 duration-200">
                    {t(errors.message as any)}
                  </span>
                )}
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
  onChange,
  onBlur,
  maxLength,
  autoComplete,
  pattern,
  error
}: { 
  label: string; 
  placeholder: string; 
  type: string; 
  name: string; 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  maxLength?: number;
  autoComplete?: string;
  pattern?: string;
  error?: string;
}) => (
  <div className="space-y-1.5 w-full">
    <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider ml-0.5">{label}</label>
    <input 
      type={type} 
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      required
      maxLength={maxLength}
      autoComplete={autoComplete}
      pattern={pattern}
      className={`w-full bg-neutral-50 dark:bg-neutral-950 border rounded-md px-3.5 py-2.5 text-base md:text-xs text-foreground placeholder:text-neutral-450 dark:placeholder:text-neutral-600 focus:outline-none focus:ring-1 transition-all ${
        error 
          ? "border-amber-500 focus:ring-amber-500 focus:border-amber-500 dark:border-amber-500/50" 
          : "border-border focus:ring-ring"
      }`}
      placeholder={placeholder}
    />
    {error && (
      <span className="block text-[10px] font-mono text-amber-600 dark:text-amber-400 mt-1 ml-0.5 animate-in fade-in slide-in-from-top-1 duration-200">
        {error}
      </span>
    )}
  </div>
);