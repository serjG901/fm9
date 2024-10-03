import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TransactionsStore } from "../interfaces";

export const useTransactionsStore = create<TransactionsStore>()(
  persist(
    (set) => {
      return {
        id: 1,
        transactions: [],
        addTransaction: (newTransaction) => {
          set((state) => {
            const transaction = { ...newTransaction, id: state.id };
            return {
              transactions: [...state.transactions, transaction],
              id: state.id + 1,
            };
          });
        },
        updateTransaction: (transaction) => {
          set((state) => {
            const filtredTransactions = state.transactions.filter(
              (t) => t.id !== transaction.id
            );
            return {
              transactions: [...filtredTransactions, transaction],
            };
          });
        },
        deleteTransaction: (transaction) => {
          set((state) => {
            const filtredTransactions = state.transactions.filter(
              (t) => t.id !== transaction.id
            );
            return { transactions: filtredTransactions };
          });
        },
      };
    },

    {
      name: "fm9-transactions",
    }
  )
);
