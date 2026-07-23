"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "@/data/translations";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState("en");

  useEffect(() => {
    const savedLocale = localStorage.getItem("locale");
    if (savedLocale && ["en", "fr", "ar"].includes(savedLocale)) {
      setLocale(savedLocale);
    } else {
      const browserLang = navigator.language.split("-")[0];
      if (["en", "fr", "ar"].includes(browserLang)) {
        setLocale(browserLang);
      }
    }
  }, []);

  const changeLanguage = (newLocale) => {
    if (["en", "fr", "ar"].includes(newLocale)) {
      setLocale(newLocale);
      localStorage.setItem("locale", newLocale);
      // For RTL support in Arabic
      if (newLocale === "ar") {
        document.documentElement.dir = "rtl";
        document.documentElement.lang = "ar";
      } else {
        document.documentElement.dir = "ltr";
        document.documentElement.lang = newLocale;
      }
    }
  };

  const t = (key) => {
    return translations[locale]?.[key] || translations["en"]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ locale, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
