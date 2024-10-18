import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SourcesStore } from "../../interfaces";
import { name as appName } from "../../../package.json";

export const createSourcesStore = (name: string) =>
  create<SourcesStore>()(
    persist(
      (set, get) => ({
        getState: () => get(),
        setState: (state) => {
          set(state);
        },
        id: 1,
        sources: [],
        addSource: (newSource) => {
          if (
            !newSource.name ||
            get().sources.find((s) => s.name === newSource.name)
          ) {
            return;
          }
          set((state) => {
            const source = { ...newSource, id: state.id };
            return { sources: [...state.sources, source], id: state.id + 1 };
          });
        },

        updateSource: (source) => {
          set((state) => {
            const filtredSources = state.sources.filter(
              (s) => s.id !== source.id
            );
            return { sources: [...filtredSources, source] };
          });
        },
        deleteSource: (source) => {
          set((state) => {
            const filtredSources = state.sources.filter(
              (s) => s.id !== source.id
            );
            return { sources: filtredSources };
          });
        },
        getSourcesName: () =>
          get()
            .sources.sort((a, b) => +b.amount - +a.amount)
            .map((s) => s.name),
        getSources: () => get().sources,
      }),
      {
        name: `${appName}-${name}`,
      }
    )
  );
