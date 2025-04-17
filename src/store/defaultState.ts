import { name as appName } from "../../package.json";
import { PaymentsStore, SettingsStore, SourcesStore } from "../interfaces";
//@ts-expect-error this is default
export const defaultDB: {
  [x: string]: PaymentsStore | SourcesStore | SettingsStore;
} = {
  [`${appName}-buys`]: {
    id: 1,
    payments: [],
    pageActive: 1,
    itemsPerPage: "50",
    isSimpleCard: false,
  },
  [`${appName}-pays`]: {
    id: 1,
    payments: [],
    pageActive: 1,
    itemsPerPage: "50",
    isSimpleCard: false,
  },
  [`${appName}-debets`]: {
    id: 1,
    sources: [],
  },
  [`${appName}-credits`]: {
    id: 1,
    sources: [],
  },
  [`${appName}-settings`]: {
    hue: "190",
    defaultCurrency: "USD",
    onAutoAddTags: false,
  },
};
