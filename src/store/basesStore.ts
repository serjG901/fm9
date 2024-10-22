import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  Base,
  BasesStore,
  PaymentsStore,
  SettingsStore,
  SourcesStore,
} from "../interfaces";
import { name as appName } from "../../package.json";
import { defaultDB } from "./defaultState";

export const useBasesStore = create<BasesStore>()(
  persist(
    (set, get) => {
      return {
        id: 1,
        bases: [],
        getBases: () => get().bases,
        addBase: (newBaseName) => {
          if (!newBaseName || get().bases.find((b) => b.name === newBaseName)) {
            return;
          }
          set((state) => {
            const base: Base = {
              name: newBaseName,
              id: state.id,
              db: defaultDB as {
                [x: string]: PaymentsStore | SourcesStore | SettingsStore;
              },
            };
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
