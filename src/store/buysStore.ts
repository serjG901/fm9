import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PaymentsStore } from "../interfaces";

export const useBuysStore = create<PaymentsStore>()(
  persist(
    (set, get) => {
      return {
        id: 1,
        payments: [],
        addPayment: (newPayment) => {
          set((state) => {
            const payment = { ...newPayment, id: state.id };
            console.log(payment.from, payment.for);
            return {
              payments: [...state.payments, payment],
              id: state.id + 1,
              fromOptions: new Set(Array.from(state.fromOptions)).add(payment.from),
              forOptions: new Set(Array.from(state.forOptions)).add(payment.for),
            };
          });
        },
        updatePayment: (payment) => {
          set((state) => {
            const filtredPayments = state.payments.filter(
              (p) => p.id !== payment.id
            );
            return {
              payments: [...filtredPayments, payment],
              fromOptions: new Set(Array.from(state.fromOptions)).add(payment.from),
              forOptions: new Set(Array.from(state.forOptions)).add(payment.for),
            };
          });
        },
        deletePayment: (payment) => {
          set((state) => {
            const filtredPayments = state.payments.filter(
              (p) => p.id !== payment.id
            );
            return { payments: filtredPayments };
          });
        },
        fromOptions: new Set(),
        getFromOptions: () => {
          return Array.from(get().fromOptions);
        },
        forOptions: new Set(),
        getForOptions: () => {
          return Array.from(get().fromOptions);
        },
      };
    },
    {
      name: "fm9-buys",
    }
  )
);
