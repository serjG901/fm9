import { PersistOptions } from "zustand/middleware";

export interface NewSource {
  name: string;
  amount: string;
  currency: string;
}

export interface Source extends NewSource {
  id: number;
}

export interface SourcesStore {
  id: number;
  sources: Source[];
  addSource: (newSource: NewSource) => void;
  updateSource: (source: Source) => void;
  deleteSource: (source: Source) => void;
  getSourcesName: () => string[];
  getSources: () => Source[];
}

interface NewPayment {
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

export interface PaymentsStore {
  id: number;
  payments: Payment[];
  addPayment: (newPayment: NewPayment) => void;
  updatePayment: (payment: Payment) => void;
  deletePayment: (payment: Payment) => void;
  fromOptions: Set<string>;
  getFromOptions: () => string[];
  forOptions: Set<string>;
  getForOptions: () => string[];
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
