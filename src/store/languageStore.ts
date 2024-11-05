import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LanguageStore } from "../interfaces";
import { name as appName } from "../../package.json";
import { languageSet } from "./languageSet";

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set, get) => {
      return {
        currentLanguage: "en",
        languages: Object.keys(languageSet),
        setCurrentLanguage: (lang) => set({ currentLanguage: lang }),
        textes: () => languageSet[`${get().currentLanguage}`],
      };
    },
    {
      name: `${appName}-languages`,
    }
  )
);
