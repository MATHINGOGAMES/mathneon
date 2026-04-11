// src/LanguageContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import { translations } from "./translations"; // ✅ المسار الصحيح

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem("math-lang") || "ar");

  useEffect(() => {
    localStorage.setItem("math-lang", lang);
    document.documentElement.dir = translations[lang].dir;
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLanguage = () => {
    const langs = Object.keys(translations);
    const currentIndex = langs.indexOf(lang);
    const nextLang = langs[(currentIndex + 1) % langs.length];
    setLang(nextLang);
  };

  return (
    <LanguageContext.Provider
      value={{ lang, toggleLanguage, t: translations[lang] }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
