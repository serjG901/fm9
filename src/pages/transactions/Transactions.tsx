import "./style.css";
import { useTransactionsStore } from "../../store/transactionsStore";
import Transactions from "../../view/transactions/Transactions";

export default function Pays() {
  return (
    <Transactions
      transactionsType='Self transactions'
      useTransactionsStore={useTransactionsStore}
    />
  );
}
