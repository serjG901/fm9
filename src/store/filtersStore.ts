import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FiltersStore } from "../interfaces";
import { name as appName } from "../../package.json";

export const useFiltersStore = create<FiltersStore>()(
  persist(
    (set) => {
      return {
        search: "",
        setSearch: (search) => set({ search }),
        filterTags: [],
        setFilterTags: (filterTags) => {
          set({ filterTags });
        },
      };
    },
    {
      name: `${appName}-filters`,
    }
  )
);
