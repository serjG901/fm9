import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BasesStore } from "../interfaces";
import { name as appName } from "../../package.json";

export const useBasesStore = create<BasesStore>()(
  persist(
    (set) => {
      return {
        id: 1,
        bases: [],
        addBase: (newBase) => {
          set((state) => {
            const base = { ...newBase, id: state.id };
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
      };
    },

    {
      name: `${appName}-bases`,
    }
  )
);
