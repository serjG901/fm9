import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BasesStore } from "../interfaces";
import { name as appName } from "../../package.json";

export const useBasesStore = create<BasesStore>()(
  persist(
    (set, get) => {
      return {
        id: 1,
        bases: [],
        addBase: (newBaseName) => {
          set((state) => {
            const base = { name: newBaseName, id: state.id, db: null };
            return {
              bases: [...state.bases, base],
              id: state.id + 1,
            };
          });
        },
        updateBase: (base) => {
          set((state) => {
            const filtredBases = state.bases.filter((t) => t.id !== base.id);
            return {
              bases: [...filtredBases, base],
            };
          });
        },
        deleteBase: (base) => {
          set((state) => {
            const filtredBases = state.bases.filter((t) => t.id !== base.id);
            return { bases: filtredBases };
          });
        },
        currentBase: null,
        setCurrentBase: (base) => set({ currentBase: base }),
        getCurrentBase: () => get().currentBase,
      };
    },

    {
      name: `${appName}-bases`,
    }
  )
);
