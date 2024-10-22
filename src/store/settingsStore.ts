import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SettingsStore } from "../interfaces";
import { name as appName } from "../../package.json";

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set, get) => {
      return {
        getState: () => get(),
        setState: (state) => {
          set(state);
        },
        hue: "190",
        setHue: (hue) => set({ hue }),
        defaultCurrency: "USD",
        setDefaultCurrency: (defaultCurrency) => set({ defaultCurrency }),
        currencies: ["USD", "EUR", "CNY", "BYN"],
        addCurrency: (currency) => {
          if (!get().currencies.find((c) => c === currency))
            set({ currencies: [...get().currencies, currency] });
        },
        deleteCurrency: (currency) => {
          if (get().currencies.length > 1) {
            set({
              currencies: [...get().currencies.filter((c) => c !== currency)],
            });
            if (currency === get().defaultCurrency)
              get().setDefaultCurrency(get().currencies[0]);
          }
        },
      };
    },
    {
      name: `${appName}-settings`,
    }
  )
);
