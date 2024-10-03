import { Transaction, Source } from "../interfaces";
import minus from "./minus";
import plus from "./plus";

export const addTransactionWithSource =
  (
    sources: Source[],
    credits: Source[],
    updateSource: (source: Source) => void,
    updateCredit: (source: Source) => void,
    addTransaction: (transaction: Transaction) => void
  ) =>
  (transaction: Transaction) => {
    //from
    const findedFromSources = sources.find((s) => s.name === transaction.from);
    const findedFromCredits = credits.find((s) => s.name === transaction.from);
    if (findedFromSources) {
      const newAmountSource = minus(
        findedFromSources.amount,
        transaction.amount
      );
      const newSource: Source = {
        ...findedFromSources,
        amount: newAmountSource + "",
      };
      updateSource(newSource);
    }
    if (findedFromCredits) {
      const newAmountSource = plus(
        findedFromCredits.amount,
        transaction.amount
      );
      const newSource: Source = {
        ...findedFromCredits,
        amount: newAmountSource + "",
      };
      updateCredit(newSource);
    }
    //from

    //for
    const findedForSources = sources.find((s) => s.name === transaction.for);
    const findedForCredits = credits.find((s) => s.name === transaction.for);
    if (findedForSources) {
      const newAmountSource = plus(findedForSources.amount, transaction.amount);
      const newSource: Source = {
        ...findedForSources,
        amount: newAmountSource + "",
      };
      updateSource(newSource);
    }
    if (findedForCredits) {
      const newAmountSource = minus(
        findedForCredits.amount,
        transaction.amount
      );
      const newSource: Source = {
        ...findedForCredits,
        amount: newAmountSource + "",
      };
      updateCredit(newSource);
    }
    //for
    addTransaction(transaction);
  };
