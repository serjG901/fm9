import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PaymentsStore } from "../../interfaces";
import { name as appName } from "../../../package.json";

export const createPaymentStore = (name: string) =>
  create<PaymentsStore>()(
    persist(
      (set, get) => {
        return {
          setState: (state) => {
            set(state);
          },
          id: 1,
          payments: [],
          addPayment: (newPayment) => {
            set((state) => {
              const payment = { ...newPayment, id: state.id };
              console.log(payment.from);
              return {
                payments: [...state.payments, payment],
                id: state.id + 1,
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
          getFromOptions: () => {
            return get().payments.map((p) => p.from);
          },
          getForOptions: () => {
            return get().payments.map((p) => p.for);
          },

          //pagination

          pageActive: 1,
          itemsPerPage: 50,
          setPageActive: (page: number) => {
            set({ pageActive: page });
          },
          setPreviousPage: () => {
            const page = get().pageActive;
            if (page > 0) {
              set({ pageActive: get().pageActive - 1 });
            }
          },
          setNextPage: (totalPages) => {
            const page = get().pageActive;
            if (page < totalPages) {
              set({ pageActive: get().pageActive + 1 });
            }
          },
        };
      },

      {
        name: `${appName}-${name}`,
      }
    )
  );
