import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PaymentsStore } from "../../interfaces";
import { name as appName } from "../../../package.json";

export const createPaymentStore = (name: string) =>
  create<PaymentsStore>()(
    persist(
      (set, get) => {
        return {
          id: 1,
          payments: [],
          addPayment: (newPayment) => {
            set((state) => {
              const payment = { ...newPayment, id: state.id };
              console.log(payment.from);
              return {
                payments: [...state.payments, payment],
                id: state.id + 1,
                fromOptions: Array.from(
                  new Set(state.fromOptions).add(payment.from)
                ),
                forOptions: Array.from(
                  new Set(state.forOptions).add(payment.from)
                ),
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
                fromOptions: Array.from(
                  new Set(state.fromOptions).add(payment.from)
                ),
                forOptions: Array.from(
                  new Set(state.forOptions).add(payment.from)
                ),
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
          fromOptions: [],
          getFromOptions: () => {
            return get().fromOptions;
          },
          updateFromFor: () => {
            set({fromOptions:[], forOptions:[]});
          },
          forOptions: [],
          getForOptions: () => {
            return get().forOptions;
          },
        };
      },

      {
        name: `${appName}-${name}`,
      }
    )
  );
