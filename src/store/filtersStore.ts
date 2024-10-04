import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Tag } from "../interfaces";
import { name as appName } from "../../package.json";

interface FiltersStore {
  search: string;
  setSearch: (search: string) => void;
  filterTags: Tag[];
  setFilterTags: (filterTags: Tag[]) => void;
}

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
