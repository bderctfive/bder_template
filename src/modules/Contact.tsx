"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Mail, MessageSquare, Send, MapPin, Phone, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Contact = () => {
  return (
    <section className="relative py-32 bg-slate-950 overflow-hidden">
      {/* Background Decor: Luces sutiles */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Lado Izquierdo: Info de Contacto */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-blue-500 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
              Contacto Directo
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-[0.9]">
              ¿TIENES UN <br /> <span className="text-slate-700">DESAFÍO?</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-12 max-w-md">
              Estamos listos para materializar tu visión con ingeniería de primer nivel. Escríbenos o visítanos en nuestro centro operativo.
            </p>

            <div className="space-y-8">
              <ContactInfo 
                icon={MapPin} 
                title="Ubicación" 
                detail="Hermosillo, Sonora, México" 
              />
              <ContactInfo 
                icon={Mail} 
                title="Email" 
                detail="hola@tuproyecto.com" 
              />
              <ContactInfo 
                icon={Phone} 
                title="WhatsApp" 
                detail="+52 (662) 000 0000" 
              />
            </div>
          </motion.div>

          {/* Lado Derecho: Formulario Estilizado */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative p-8 md:p-12 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-xl"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup label="Nombre completo" placeholder="Ej. Carlos Merino" type="text" />
                <InputGroup label="Email Corporativo" placeholder="nombre@empresa.com" type="email" />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Proyecto</label>
                <select className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 text-white focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer">
                  <option>Software & Apps</option>
                  <option>Infraestructura & TI</option>
                  <option>Automatización</option>
                  <option>Ciberseguridad</option>
                  <option>Otro</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Mensaje</label>
                <textarea 
                  rows={4} 
                  className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 text-white placeholder:text-slate-700 focus:border-blue-500 outline-none transition-all resize-none"
                  placeholder="Cuéntanos brevemente tu idea..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-blue-600/20 transition-all"
              >
                Enviar Solicitud
                
              </motion.button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

const ContactInfo = ({ icon: Icon, title, detail }: { icon: any, title: string, detail: string }) => (
  <div className="flex gap-6 group">
    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-blue-600/20 group-hover:border-blue-500/50 transition-all duration-500">
      <Icon className="text-blue-500 w-6 h-6" />
    </div>
    <div>
      <h4 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{title}</h4>
      <p className="text-white font-bold text-lg">{detail}</p>
    </div>
  </div>
);

const InputGroup = ({ label, placeholder, type }: { label: string, placeholder: string, type: string }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">{label}</label>
    <input 
      type={type} 
      className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 text-white placeholder:text-slate-700 focus:border-blue-500 outline-none transition-all"
      placeholder={placeholder}
    />
  </div>
);