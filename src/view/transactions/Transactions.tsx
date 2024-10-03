import "./style.css";
import Page from "../../ui/atom/page/Page";
import AddTransaction from "../../ui/substance/add-transaction/AddTransaction";
import TransactionCard from "../../ui/thing/transaction-card/TrancactionCard";
import FlexWrap from "../../ui/atom/flex-wrap/FlexWrap";
import { useDebetsStore } from "../../store/debetsStore";
import { useCreditsStore } from "../../store/creditsStore";
import FormDataRange from "../../ui/molecul/form-data-range/FormDataRange";
import { usePeriodStore } from "../../store/periodStore";
import BreakLine from "../../ui/atom/break-line/BreakLine";
import { addTransactionWithSource } from "../../helpers/addTransactionWithSource";
import { updateTransactionWithSource } from "../../helpers/updateTransactionWithSource";
import {
  Transaction,
  TransactionsStore,
  StorePersist,
  Write,
} from "../../interfaces";
import { StoreApi, UseBoundStore } from "zustand";

interface TransactionsComponent {
  transactionsType: string;
  useTransactionsStore: UseBoundStore<
    Write<
      StoreApi<TransactionsStore>,
      StorePersist<TransactionsStore, TransactionsStore>
    >
  >;
}

export default function Transactions({
  transactionsType,
  useTransactionsStore,
}: TransactionsComponent) {
  const [transactions, addTransaction, updateTransaction, deleteTransaction] =
    useTransactionsStore((state: TransactionsStore) => [
      state.transactions,
      state.addTransaction,
      state.updateTransaction,
      state.deleteTransaction,
    ]);
  const [debets, updateDebet, getDebets] = useDebetsStore((state) => [
    state.sources,
    state.updateSource,
    state.getSources,
  ]);
  const [credits, updateCredit, getCredits] = useCreditsStore((state) => [
    state.sources,
    state.updateSource,
    state.getSources,
  ]);

  const [startPeriod, endPeriod, setPeriod] = usePeriodStore((state) => [
    state.start,
    state.end,
    state.setPeriod,
  ]);

  const acounts = Array.from(new Set([...debets, ...credits]));

  let date = "";

  const filtredTransactions =
    startPeriod && endPeriod
      ? transactions.filter(
          (p: Transaction) =>
            p.datetime >= startPeriod && p.datetime <= endPeriod
        )
      : transactions;

  const sortedTransactions = filtredTransactions.sort(
    (p1: Transaction, p2: Transaction) => (p1.datetime > p2.datetime ? -1 : 1)
  );

  const addTransactionWithS = addTransactionWithSource(
    debets,
    credits,
    updateDebet,
    updateCredit,
    addTransaction
  );

  const updateTransactionWithS = updateTransactionWithSource(
    updateTransaction,
    transactions,
    debets,
    credits,
    updateDebet,
    updateCredit,
    getDebets,
    getCredits
  );

  return (
    <Page>
      <div className='transactions-view'>
        <h1>{transactionsType}</h1>
        <FormDataRange
          period={{ start: startPeriod, end: endPeriod }}
          setPeriod={setPeriod}
        />
        <AddTransaction
          addTransaction={addTransactionWithS}
          fromOptions={acounts}
          forOptions={acounts}
        />
        <FlexWrap
          childrenArray={sortedTransactions.map((transaction: Transaction) => {
            const card = (
              <TransactionCard
                transaction={transaction}
                updateTransaction={updateTransactionWithS}
                deleteTransaction={deleteTransaction}
                fromOptions={acounts}
                forOptions={acounts}
              />
            );
            let breakLine = <BreakLine>{transaction.datetime}</BreakLine>;
            if (date === "") {
              date = transaction.datetime;
            } else {
              if (date === transaction.datetime) {
                breakLine = <></>;
              }
            }
            date = transaction.datetime;
            return (
              <>
                {breakLine}
                {card}
              </>
            );
          })}
        ></FlexWrap>
      </div>
    </Page>
  );
}
