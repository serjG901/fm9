import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PaymentsStore } from "../../interfaces";
import { name as appName } from "../../../package.json";

export const createPaymentStore = (name: string) =>
  create<PaymentsStore>()(
    persist(
      (set, get) => {
        return {
          getState: () => get(),
          setState: (state) => {
            set(state);
          },
          id: 1,
          payments: [],
          addPayment: (newPayment) => {
            set((state) => {
              const payment = { ...newPayment, id: state.id };
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

          itemsPerPage: "50",
          setItemsPerPage: (pages: string) => {
            set({ itemsPerPage: pages });
          },
          pageActive: 1,
          setPageActive: (page: number) => {
            set({ pageActive: page });
          },
          setPreviousPage: () => {
            const page = get().pageActive;
            if (page > 1) {
              set({ pageActive: get().pageActive - 1 });
            }
          },
          setNextPage: (totalPages) => {
            const page = get().pageActive;
            if (page < totalPages) {
              set({ pageActive: get().pageActive + 1 });
            }
          },

          isSimpleCard: false,
          setIsSimpleCard: () => set({ isSimpleCard: !get().isSimpleCard }),
          isColoredCard: false,
          setIsColoredCard: () => set({ isColoredCard: !get().isColoredCard }),
        };
      },

      {
        name: `${appName}-${name}`,
      }
    )
  );
