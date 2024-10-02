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
