import { PersistOptions } from "zustand/middleware";
import getDefaultDatetime from "./helpers/getDefaultDatetime";

interface KeyString {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface NewSource extends KeyString {
  name: string;
  amount: string;
  currency: string;
  hue: string;
  hueAsDefault: boolean;
  alwaysOnTop: boolean;
}

export interface Source extends NewSource {
  id: number;
}

export const defaultSource: Source = {
  id: 0,
  name: "",
  amount: "",
  currency: "",
  hue: "",
  hueAsDefault: true,
  alwaysOnTop: false,
};

export interface SourcesStore {
  getState: () => SourcesStore;
  setState: (state: SourcesStore) => void;
  id: number;
  sources: Source[];
  addSource: (newSource: NewSource) => void;
  updateSource: (source: Source) => void;
  deleteSource: (source: Source) => void;
  getSourcesName: () => string[];
  getSources: () => Source[];
  checkSourceCurrency: (sourceName: string) => string | undefined;
}

interface NewPayment extends KeyString {
  datetime: string;
  name: string;
  amount: string;
  currency: string;
  from: string;
  for: string;
  tags: Tag[];
}

export interface Payment extends NewPayment {
  id: number;
}

export const defaultPayment = {
  id: 0,
  datetime: getDefaultDatetime(),
  name: "",
  amount: "",
  currency: "",
  from: "",
  for: "",
  tags: [],
};

export interface PaymentsStore {
  getState: () => PaymentsStore;
  setState: (state: PaymentsStore) => void;
  id: number;
  payments: Payment[];
  addPayment: (newPayment: NewPayment) => void;
  updatePayment: (payment: Payment) => void;
  deletePayment: (payment: Payment) => void;
  getFromOptions: () => string[];
  getForOptions: () => string[];

  itemsPerPage: string;
  setItemsPerPage: (pages: string) => void;
  pageActive: number;
  setPageActive: (page: number) => void;
  setPreviousPage: () => void;
  setNextPage: (total: number) => void;

  isSimpleCard: boolean;
  setIsSimpleCard: () => void;
  isColoredCard: boolean;
  setIsColoredCard: () => void;
}

export interface PeriodStore {
  start: string;
  end: string;
  setPeriod: (start: string, end: string) => void;
}

export interface Tag {
  value: string;
  color: string;
}

export interface NewTransaction {
  datetime: string;
  amount: string;
  from: string;
  for: string;
  exchangeRate: string;
}

export interface Transaction extends NewTransaction {
  id: number;
}

export interface TransactionsStore {
  id: number;
  transactions: Transaction[];
  addTransaction: (newTransaction: NewTransaction) => void;
  updateTransaction: (transaction: Transaction) => void;
  deleteTransaction: (transaction: Transaction) => void;
}

export interface NewBase {
  name: string;
  db: { [x: string]: PaymentsStore | SourcesStore | SettingsStore };
}

export interface Base extends NewBase {
  id: number;
}

export interface BasesStore {
  id: number;
  bases: Base[];
  getBases: () => Base[];
  addBase: (newBaseName: string) => void;
  updateBase: (base: Base) => void;
  deleteBase: (base: Base) => void;
  currentBase: Base | null;
  setCurrentBase: (base: Base | null) => void;
  getCurrentBase: () => Base | null;
}

export interface FiltersStore {
  search: string;
  setSearch: (search: string) => void;
  filterTags: Tag[];
  setFilterTags: (filterTags: Tag[]) => void;
  isSearchBySource: boolean;
  setIsSearchBySource: (isSearchBySource: boolean) => void;
}

export interface SettingsStore {
  getState: () => SettingsStore;
  setState: (state: SettingsStore) => void;
  hue: string;
  setHue: (hue: string) => void;
  defaultCurrency: string;
  setDefaultCurrency: (defaultCurrency: string) => void;
  currencies: string[];
  addCurrency: (currency: string) => void;
  deleteCurrency: (currency: string) => void;
  autoAddTags: boolean;
  setAutoAddTags: (autoAddTags: boolean) => void;
  autoBackup: string;
  setAutoBackup: (autoBackup: string) => void;
  backupWhenStart: boolean;
  setBackupWhenStart: (backupWhenStart: boolean) => void;
}

export interface LanguageStore {
  currentLanguage: string;
  languages: string[];
  setCurrentLanguage: (lang: string) => void;
  textes: () => { [key: string]: string };
}

export interface TextesByLanguage {
  textes?: { [key: string]: string };
}

//zustand

export type Write<T, U> = Omit<T, keyof U> & U;
export type PersistListener<S> = (state: S) => void;
export type StorePersist<S, Ps> = {
  persist: {
    setOptions: (options: Partial<PersistOptions<S, Ps>>) => void;
    clearStorage: () => void;
    rehydrate: () => Promise<void> | void;
    hasHydrated: () => boolean;
    onHydrate: (fn: PersistListener<S>) => () => void;
    onFinishHydration: (fn: PersistListener<S>) => () => void;
    getOptions: () => Partial<PersistOptions<S, Ps>>;
  };
};
