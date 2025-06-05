import { create } from "zustand";

interface LanguageState {
  language: "ko" | "en";
  setLanguage: (language: "ko" | "en") => void;
}

type SupportedLanguage = (typeof supportedLanguages)[number];

const supportedLanguages = ["ko", "en"] as const;

const detectInitialLanguage = (): SupportedLanguage => {
  const storedLang = localStorage.getItem("language");
  if (storedLang && supportedLanguages.includes(storedLang as any)) {
    return storedLang as SupportedLanguage;
  }

  const browserLang = navigator.language.split("-")[0];
  const finalLang = supportedLanguages.includes(browserLang as any)
    ? (browserLang as SupportedLanguage)
    : "en";

  localStorage.setItem("language", finalLang);
  return finalLang;
};

const useLanguageStore = create<LanguageState>((set) => ({
  language: detectInitialLanguage(),
  setLanguage: (language) => {
    if (supportedLanguages.includes(language)) {
      localStorage.setItem("language", language);
      set({ language });
    } else {
      localStorage.setItem("language", "en");
      set({ language: "en" });
    }
  },
}));

export default useLanguageStore;
