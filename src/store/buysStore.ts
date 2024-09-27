import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PaymentsStore } from "../interfaces";

export const useBuysStore = create<PaymentsStore>()(
  persist(
    (set) => ({
      id: 1,
      payments: [],
      addPayment: (newPayment) => {
        set((state) => {
          const payment = { ...newPayment, id: state.id };
          return { payments: [...state.payments, payment], id: state.id + 1 };
        });
      },

      updatePayment: (payment) => {
        set((state) => {
          const filtredPayments = state.payments.filter(
            (p) => p.id !== payment.id
          );
          return { payments: [...filtredPayments, payment] };
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
    }),
    {
      name: "fm901-buys",
    }
  )
);
