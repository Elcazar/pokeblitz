// context/LanguageContext.jsx
// Provides the current language and a toggle function to the entire app.
// Default language is detected from the browser, falling back to English.

import { createContext, useContext, useState } from 'react';

const SUPPORTED_LANGS = ['en', 'es'];

function detectLanguage() {
  const browserLang = navigator.language?.slice(0, 2);
  return SUPPORTED_LANGS.includes(browserLang) ? browserLang : 'en';
}

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(detectLanguage);

  function toggleLang() {
    setLang((prev) => (prev === 'en' ? 'es' : 'en'));
  }

  function setLanguage(newLang) {
    if (!SUPPORTED_LANGS.includes(newLang)) {
      console.warn(`Unsupported language: "${newLang}". Supported: ${SUPPORTED_LANGS.join(', ')}`);
      return;
    }
    setLang(newLang);
  }

  return (
    <LanguageContext.Provider value={{ lang, setLanguage, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider');
  return ctx;
}