import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Source, SourcesStore } from "../../interfaces";
import { name as appName } from "../../../package.json";
import { sortDescByAmountAndPriority } from "../../helpers/sortDescByAmountAndPriority";

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
          if (
            !source.name ||
            get().sources.find(
              (s) => s.name === source.name && s.id !== source.id
            )
          ) {
            return;
          }
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
          (
            sortDescByAmountAndPriority(
              get().sources,
              "amount",
              "alwaysOnTop"
            ) as Source[]
          ).map((s) => s.name),
        getSources: () => get().sources,
        checkSourceCurrency: (sourceName: string) =>
          get().sources.find((s) => s.name === sourceName)?.currency,
      }),
      {
        name: `${appName}-${name}`,
      }
    )
  );
