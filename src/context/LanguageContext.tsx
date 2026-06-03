"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, type Language } from '../lib/translations';

type TranslationKey = keyof typeof translations['es'];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('es');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load language preference from localStorage
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang === 'es' || savedLang === 'en') {
      setLanguageState(savedLang);
    } else {
      // Check system language
      const systemLang = navigator.language.split('-')[0];
      if (systemLang === 'en') {
        setLanguageState('en');
      }
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: TranslationKey): string => {
    const dictionary = translations[language] || translations['es'];
    return dictionary[key] || translations['es'][key] || String(key);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {/* Prevent flash of untranslated content by delaying rendering of children until mounted on client */}
      {mounted ? children : <div className="invisible">{children}</div>}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
