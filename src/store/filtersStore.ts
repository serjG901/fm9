import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FiltersStore } from "../interfaces";
import { name as appName } from "../../package.json";

export const useFiltersStore = create<FiltersStore>()(
  persist(
    (set, get) => {
      return {
        search: "",
        setSearch: (search) => set({ search }),
        filterTags: [],
        setFilterTags: (filterTags) => {
          set({ filterTags });
        },
        isSearchBySource: false,
        setIsSearchBySource: (value) => {
          set({ isSearchBySource: value || !get().isSearchBySource });
        },
      };
    },
    {
      name: `${appName}-filters`,
    }
  )
);
