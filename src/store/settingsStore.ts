import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SettingsStore } from "../interfaces";
import { name as appName } from "../../package.json";

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set, get) => {
      return {
        getState: () => get(),
        setState: (state) => {
          set(state);
        },
        hue: "240",
        setHue: (hue) => set({ hue }),
      };
    },
    {
      name: `${appName}-settings`,
    }
  )
);
