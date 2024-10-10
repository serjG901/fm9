import "./style.css";
import { useTransactionsStore } from "../../store/transactionsStore";
import Transactions from "../../view/transactions/Transactions";

export default function SelfTransactions() {
  return (
    <Transactions
      transactionsType='Self transactions'
      useTransactionsStore={useTransactionsStore}
    />
  );
}
