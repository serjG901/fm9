import { name as appName } from "../../package.json";
import { PaymentsStore, SourcesStore } from "../interfaces";
export const defaultDB: { [x: string]: PaymentsStore | SourcesStore } = {
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
};
