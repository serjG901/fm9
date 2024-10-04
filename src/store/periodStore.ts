import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PeriodStore } from "../interfaces";
import { name as appName } from "../../package.json";

export const usePeriodStore = create<PeriodStore>()(
  persist(
    (set) => ({
      start: "",
      end: "",
      setPeriod: (start, end) => {
        set({ start, end });
      },
    }),
    {
      name: `${appName}-period`,
    }
  )
);
