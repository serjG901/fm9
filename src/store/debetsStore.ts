import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SourcesStore } from "../interfaces";

export const useDebetsStore = create<SourcesStore>()(
  persist(
    (set, get) => ({
      id: 1,
      sources: [],
      addSource: (newSource) => {
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
      getSourcesName: () => get().sources.map((s) => s.name),
      getSources: () => get().sources,
    }),
    {
      name: "fm9-debets",
    }
  )
);
