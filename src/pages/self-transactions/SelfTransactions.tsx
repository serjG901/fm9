import "./style.css";
import { useTransactionsStore } from "../../store/transactionsStore";
import Transactions from "../../view/transactions/Transactions";
import { TextesByLanguage } from "../../interfaces";

export default function SelfTransactions({ textes = {} }: TextesByLanguage) {
  return (
    <Transactions
      textes={textes}
      transactionsType='Self transactions'
      useTransactionsStore={useTransactionsStore}
    />
  );
}
