"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { 
  Laptop, 
  Monitor, 
  Cpu, 
  Cloud, 
  Activity, 
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  Sparkles
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

interface ServiceDetails {
  overview: string;
  deliverables: string[];
  methodologies: string[];
  metric: string;
  category: string;
}

const SERVICE_DETAILS: Record<string, { es: ServiceDetails; en: ServiceDetails }> = {
  "01": {
    es: {
      overview: "Desarrollo a medida de ecosistemas digitales completos. Diseñamos desde aplicaciones móviles hasta plataformas web empresariales adaptadas al flujo de trabajo específico de tu negocio, garantizando alto rendimiento y estabilidad.",
      deliverables: [
        "APIs REST / GraphQL documentadas con Swagger/Postman",
        "Aplicaciones web progresivas (PWA) de carga instantánea con Next.js",
        "Apps móviles híbridas y nativas para iOS y Android con Flutter",
        "Panel de administración intuitivo para gestión de contenidos y analíticas"
      ],
      methodologies: ["Next.js", "React", "Node.js", "Python", "Flutter", "Metodología Scrum", "Estándares ISO/IEC"],
      metric: "+200% velocidad en carga / 100% código limpio",
      category: "software"
    },
    en: {
      overview: "Custom development of complete digital ecosystems. We design everything from mobile applications to enterprise web platforms tailored to your business's specific workflow, guaranteeing high performance and stability.",
      deliverables: [
        "Documented REST / GraphQL APIs with Swagger/Postman",
        "Instant-loading Progressive Web Apps (PWA) built with Next.js",
        "Hybrid and native mobile apps for iOS and Android using Flutter",
        "Intuitive admin dashboard for content management and analytics"
      ],
      methodologies: ["Next.js", "React", "Node.js", "Python", "Flutter", "Scrum Methodology", "ISO/IEC Standards"],
      metric: "+200% load speed / 100% clean code",
      category: "software"
    }
  },
  "02": {
    es: {
      overview: "Suministro, reparación y mantenimiento preventivo de infraestructura física. Te ayudamos a seleccionar los mejores servidores, estaciones de trabajo y periféricos, además de extender su ciclo de vida útil.",
      deliverables: [
        "Cotización y venta de equipo empresarial a precios altamente competitivos",
        "Diagnóstico completo y reparación de hardware con refacciones originales",
        "Pólizas de soporte preventivo y correctivo mensual para empresas",
        "Limpieza física especializada y optimización del sistema de ventilación"
      ],
      methodologies: ["Refacciones de Grado Industrial", "Estándares de Seguridad de Hardware", "Diagnóstico Avanzado con Osciloscopio", "Gestión de Activos de TI (ITAM)"],
      metric: "Diagnóstico en <24 horas / Pólizas SLA flexibles",
      category: "support"
    },
    en: {
      overview: "Supply, repair, and preventive maintenance of physical infrastructure. We help you choose the best servers, workstations, and peripherals, as well as extend their useful lifecycle.",
      deliverables: [
        "Competitive pricing and sales of enterprise-grade equipment",
        "Full hardware diagnostics and repairs with original replacement parts",
        "Monthly preventive and corrective support policies for companies",
        "Specialized physical cleaning and cooling system optimization"
      ],
      methodologies: ["Industrial-Grade Components", "Hardware Safety Standards", "Advanced Diagnostics (Oscilloscope)", "IT Asset Management (ITAM)"],
      metric: "Diagnosis in <24 hours / Flexible SLA policies",
      category: "support"
    }
  },
  "03": {
    es: {
      overview: "Implementación de redes y servidores altamente disponibles. Diseñamos e implementamos topologías de red cableadas e inalámbricas, armarios de telecomunicaciones (racks), sistemas de almacenamiento (NAS/SAN) y redundancia de datos.",
      deliverables: [
        "Cableado estructurado certificado y topología de red de alto desempeño",
        "Servidores locales configurados en clúster con balanceo de carga",
        "Sistemas de videovigilancia IP y control de acceso inteligente",
        "Sistemas de respaldo de energía ininterrumpible (UPS) y plantas de luz"
      ],
      methodologies: ["Cisco", "Ubiquiti", "Synology", "Active Directory", "Seguridad Física", "Estándares de Redes TIA-568"],
      metric: "Disponibilidad del 99.9% / Soporte de Emergencia 24/7",
      category: "infra"
    },
    en: {
      overview: "Implementation of highly available networks and servers. We design and deploy wired and wireless network topologies, telecom racks, storage systems (NAS/SAN), and data redundancy.",
      deliverables: [
        "Certified structured cabling and high-performance network topology",
        "On-premise servers configured in load-balanced clusters",
        "IP video surveillance and smart access control",
        "Uninterruptible Power Supply (UPS) systems and generators"
      ],
      methodologies: ["Cisco", "Ubiquiti", "Synology", "Active Directory", "Physical Security", "TIA-568 Networking Standards"],
      metric: "99.9% Uptime SLA / 24/7 Emergency Support",
      category: "infra"
    }
  },
  "04": {
    es: {
      overview: "Migración integral y optimización de cargas de trabajo a la nube. Te ayudamos a eliminar la dependencia de servidores físicos costosos, implementando soluciones autogestionables en AWS, Azure o GCP que crecen contigo.",
      deliverables: [
        "Arquitectura de nube nativa de alta disponibilidad y tolerancia a fallos",
        "Contenerización de microservicios e Infraestructura como Código (IaC)",
        "Reducción drástica de costos mediante políticas de auto-escalado inteligente",
        "Políticas estrictas de firewalls, VPNs de acceso y encriptado en tránsito y reposo"
      ],
      methodologies: ["AWS (EC2, S3, RDS)", "Azure", "Docker", "Terraform", "CI/CD Pipelines", "Seguridad en la Nube"],
      metric: "-40% en costos de facturación / Respaldos diarios automáticos",
      category: "infra"
    },
    en: {
      overview: "Comprehensive cloud migration and workload optimization. We help you eliminate dependency on expensive on-premise servers, implementing self-managed solutions on AWS, Azure, or GCP that grow with you.",
      deliverables: [
        "Highly available and fault-tolerant cloud-native architecture",
        "Microservices containerization and Infrastructure as Code (IaC)",
        "Drastic cost reduction via intelligent auto-scaling policies",
        "Strict firewall policies, secure access VPNs, and encryption in transit/rest"
      ],
      methodologies: ["AWS (EC2, S3, RDS)", "Azure", "Docker", "Terraform", "CI/CD pipelines", "Cloud Security Best Practices"],
      metric: "-40% billing costs reduction / Daily automated backups",
      category: "infra"
    }
  },
  "05": {
    es: {
      overview: "Eliminación de tareas repetitivas a través de software inteligente. Conectamos tus sistemas empresariales con flujos automatizados de datos, sensores IoT y notificaciones en tiempo real para optimizar la toma de decisiones.",
      deliverables: [
        "Automatización de reportes administrativos y conciliaciones de datos",
        "Sensores IoT industriales y telemetría de variables críticas de producción",
        "Integraciones API personalizadas entre CRM, ERP y software de terceros",
        "Central de alertas automatizadas vía Slack, WhatsApp o correo electrónico"
      ],
      methodologies: ["Python", "Scripting Avanzado", "MQTT", "API Integrations", "Webhooks", "Optimización de Procesos"],
      metric: "Reducción del 95% en errores operativos / Ahorro de horas hombre",
      category: "auto"
    },
    en: {
      overview: "Elimination of repetitive tasks through intelligent software. We connect your business systems with automated data flows, IoT sensors, and real-time notifications to optimize decision-making.",
      deliverables: [
        "Automation of administrative reporting and data reconciliations",
        "Industrial IoT sensors and telemetry of critical production variables",
        "Custom API integrations between CRMs, ERPs, and third-party software",
        "Automated alerting systems via Slack, WhatsApp, or email"
      ],
      methodologies: ["Python", "Advanced Scripting", "MQTT", "API Integrations", "Webhooks", "Process Optimization"],
      metric: "95% reduction in operational errors / Significant man-hours saved",
      category: "auto"
    }
  }
};

export const Services = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
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
            <span className="text-xs md:text-sm font-mono tracking-wider uppercase text-neutral-500">{t("services.tag")}</span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
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
              onClick={() => setSelectedService(service)}
              className={cn(
                "relative rounded-2xl border border-border bg-neutral-900/5 dark:bg-neutral-950/10 text-left",
                "flex flex-col justify-between p-6 cursor-pointer transition-all duration-500 overflow-hidden group",
                service.gridClass,
                "w-[85vw] md:w-auto shrink-0 md:shrink snap-center",
                // Dynamic border and shadow on hover on desktop
                service.id === "01" && "hover:border-blue-500/40 dark:hover:border-blue-500/20 hover:shadow-[0_0_30px_rgba(59,130,246,0.06)]",
                service.id === "02" && "hover:border-red-500/40 dark:hover:border-red-500/20 hover:shadow-[0_0_30px_rgba(239,68,68,0.06)]",
                service.id === "03" && "hover:border-emerald-500/40 dark:hover:border-emerald-500/20 hover:shadow-[0_0_30px_rgba(16,185,129,0.06)]",
                service.id === "04" && "hover:border-purple-500/40 dark:hover:border-purple-500/20 hover:shadow-[0_0_30px_rgba(168,85,247,0.06)]",
                service.id === "05" && "hover:border-amber-500/40 dark:hover:border-amber-500/20 hover:shadow-[0_0_30px_rgba(245,158,11,0.06)]",
                // Mobile active animation & highlight
                (isMobile && activeSlide === idx)
                  ? cn(
                      "scale-[1.01] opacity-100",
                      service.id === "01" && "border-blue-500/40 dark:border-blue-500/30 bg-neutral-900/10 dark:bg-neutral-900/20 shadow-[0_0_30px_rgba(59,130,246,0.05)]",
                      service.id === "02" && "border-red-500/40 dark:border-red-500/30 bg-neutral-900/10 dark:bg-neutral-900/20 shadow-[0_0_30px_rgba(239,68,68,0.05)]",
                      service.id === "03" && "border-emerald-500/40 dark:border-emerald-500/30 bg-neutral-900/10 dark:bg-neutral-900/20 shadow-[0_0_30px_rgba(16,185,129,0.05)]",
                      service.id === "04" && "border-purple-500/40 dark:border-purple-500/30 bg-neutral-900/10 dark:bg-neutral-900/20 shadow-[0_0_30px_rgba(168,85,247,0.05)]",
                      service.id === "05" && "border-amber-500/40 dark:border-amber-500/30 bg-neutral-900/10 dark:bg-neutral-900/20 shadow-[0_0_30px_rgba(245,158,11,0.05)]"
                    )
                  : "opacity-75 scale-98 md:opacity-100 md:scale-100"
              )}
            >
              {/* Inner gradient highlight */}
              <div className={cn("absolute inset-0 bg-gradient-to-b opacity-[0.02] group-hover:opacity-[0.08] transition-opacity pointer-events-none duration-550", service.gradientClass)} />

              <div>
                {/* Header: Icon & ID */}
                <div className="flex items-center justify-between mb-4">
                  <div className={cn(
                    "p-2 rounded bg-neutral-900/80 border border-border text-neutral-400 transition-all duration-300",
                    // Apply hover colors dynamically based on service category
                    service.id === "01" && "group-hover:text-blue-400 group-hover:bg-blue-500/10 group-hover:border-blue-500/30",
                    service.id === "02" && "group-hover:text-red-400 group-hover:bg-red-500/10 group-hover:border-red-500/30",
                    service.id === "03" && "group-hover:text-emerald-400 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30",
                    service.id === "04" && "group-hover:text-purple-400 group-hover:bg-purple-500/10 group-hover:border-purple-500/30",
                    service.id === "05" && "group-hover:text-amber-400 group-hover:bg-amber-500/10 group-hover:border-amber-500/30",
                    // Apply color statically on mobile if it is the active slide
                    (isMobile && activeSlide === idx) && [
                      service.id === "01" && "text-blue-400 bg-blue-500/10 border-blue-500/30",
                      service.id === "02" && "text-red-400 bg-red-500/10 border-red-500/30",
                      service.id === "03" && "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
                      service.id === "04" && "text-purple-400 bg-purple-500/10 border-purple-500/30",
                      service.id === "05" && "text-amber-400 bg-amber-500/10 border-amber-500/30",
                    ]
                  )}>
                    <service.icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono text-neutral-500 font-semibold tracking-wider">
                    {service.id}
                  </span>
                </div>

                {/* Info */}
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground tracking-tight">
                    {t(service.titleKey)}
                  </h3>
                  <p className="text-muted-foreground text-xs md:text-sm leading-relaxed mt-2">
                    {t(service.descKey)}
                  </p>
                </div>

                {/* Mockup Image */}
                <div className="relative w-full aspect-[21/9] rounded-lg border border-border bg-neutral-900/10 dark:bg-neutral-950/20 overflow-hidden mt-4">
                  <Image
                    src={service.image}
                    alt={t(service.titleKey)}
                    fill
                    className="object-cover transition-all duration-700 opacity-100 md:opacity-70 md:grayscale md:group-hover:grayscale-0 md:group-hover:opacity-100 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
                </div>
              </div>

              {/* Footer CTA */}
              <div className="mt-4 flex items-center justify-between pt-2 border-t border-border/40">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="group rounded-md text-xs px-0 h-6 text-muted-foreground hover:text-foreground bg-transparent hover:bg-transparent justify-start"
                >
                  {t("services.btn.explore")}
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform ml-1" />
                </Button>
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

      {/* Details Modal */}
      <AnimatePresence>
        {selectedService && (() => {
          const details = SERVICE_DETAILS[selectedService.id]?.[language] || SERVICE_DETAILS[selectedService.id]?.['es'];
          return (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedService(null)}
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              />
              
              {/* Modal Box */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.98, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: 15 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl z-20 grid grid-cols-1 md:grid-cols-12 text-left"
              >
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-100/80 dark:bg-neutral-955/60 border border-neutral-200 dark:border-border/60 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-foreground flex items-center justify-center transition-colors z-50 cursor-pointer"
                  aria-label={t("services.modal.aria.close" as TranslationKey)}
                >
                  <X size={14} />
                </button>

                {/* Left Side Spec: Col-span 7 */}
                <div className="p-6 md:p-8 md:col-span-7 flex flex-col justify-between border-b md:border-b-0 md:border-r border-neutral-200 dark:border-neutral-800 min-h-[300px]">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1.5 rounded bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400">
                        <selectedService.icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[10px] font-mono tracking-wider uppercase text-neutral-500">
                        {t("services.tag")}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mt-1 mb-4 tracking-tight">
                      {t(selectedService.titleKey)}
                    </h3>
                    
                    <p className="text-neutral-650 dark:text-neutral-300 text-xs md:text-sm leading-relaxed mb-6">
                      {details?.overview}
                    </p>
                    
                    {/* Deliverables */}
                    <div className="space-y-2 mb-6">
                      <h4 className="text-[10px] font-mono uppercase tracking-wider text-neutral-550 dark:text-neutral-500 mb-1">
                        {t("services.modal.deliverables" as TranslationKey)}
                      </h4>
                      {details?.deliverables.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-neutral-650 dark:text-neutral-400">
                          <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {details?.methodologies.map(tech => (
                      <span key={tech} className="px-2 py-0.5 rounded bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 text-[9px] font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Side Visual & Action: Col-span 5 */}
                <div className="md:col-span-5 bg-neutral-55/30 dark:bg-neutral-950/40 p-6 md:p-8 flex flex-col justify-between min-h-[250px] relative">
                  <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:10px_10px]" />
                  
                  {/* Service Image Preview */}
                  <div className="relative w-full aspect-[16/10] rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                    <Image
                      src={selectedService.image}
                      alt={t(selectedService.titleKey)}
                      fill
                      className="object-cover opacity-90"
                    />
                  </div>

                  {/* SLA / Value Metric Box */}
                  <div className="mt-4 p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-950/80 flex flex-col gap-1">
                    <span className="text-[8px] font-mono uppercase tracking-widest text-neutral-550 dark:text-neutral-500 flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                      {t("services.modal.value" as TranslationKey)}
                    </span>
                    <p className="text-[10px] md:text-xs text-neutral-700 dark:text-neutral-300 leading-snug font-medium">
                      {details?.metric}
                    </p>
                  </div>

                  {/* CTA Button */}
                  <Button 
                    variant="default" 
                    className="w-full h-10 text-xs font-semibold rounded-md flex items-center justify-center gap-2 mt-4 cursor-pointer"
                    onClick={() => {
                      // 1. Dispatch custom event to select category in contact form
                      window.dispatchEvent(new CustomEvent('select-category', { detail: details?.category }));
                      // 2. Close modal
                      setSelectedService(null);
                      // 3. Smooth scroll to contact section
                      setTimeout(() => {
                        const contactSec = document.getElementById('contacto');
                        if (contactSec) {
                          contactSec.scrollIntoView({ behavior: 'smooth' });
                        }
                      }, 100);
                    }}
                  >
                    {t("services.modal.cta" as TranslationKey)}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
};