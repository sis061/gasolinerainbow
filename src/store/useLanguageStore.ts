import { create } from "zustand";

interface LanguageState {
  language: string;
  setLanguage: (language: string) => void;
}

const supportedLanguages = ["ko", "en"];

const useLanguageStore = create<LanguageState>((set) => ({
  language:
    localStorage.getItem("language") ||
    (supportedLanguages.includes(navigator.language.split("-")[0])
      ? navigator.language.split("-")[0]
      : "en"),
  setLanguage: (language: string) => {
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
