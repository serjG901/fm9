import { name as appName } from "../../package.json";
import { PaymentsStore, SettingsStore, SourcesStore } from "../interfaces";
//@ts-expect-error this is default
export const defaultDB: {
  [x: string]: PaymentsStore | SourcesStore | SettingsStore;
} = {
  [`${appName}-buys`]: {
    id: 0,
    payments: [],
    pageActive: 1,
    itemsPerPage: "50",
  },
  [`${appName}-pays`]: {
    id: 0,
    payments: [],
    pageActive: 1,
    itemsPerPage: "50",
  },
  [`${appName}-debets`]: {
    id: 0,
    sources: [],
  },
  [`${appName}-credits`]: {
    id: 0,
    sources: [],
  },
  [`${appName}-settings`]: {
    hue: '190',
    defaultCurrency: "USD",
  },
};
