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
}

interface NewPayment {
  datetime: string;
  name: string;
  amount: string;
  currency: string;
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
}
