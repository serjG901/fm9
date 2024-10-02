import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PeriodStore } from "../interfaces";

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
      name: "fm9-period",
    }
  )
);
