import { Transaction, Source } from "../interfaces";
import minus from "./minus";
import multy from "./multy";
import plus from "./plus";

export const updateTransactionWithSource =
  (
    updateTransaction: (transaction: Transaction) => void,
    transactions: Transaction[],
    sources: Source[],
    credits: Source[],
    updateSource: (source: Source) => void,
    updateCredit: (source: Source) => void,
    getSources: () => Source[],
    getCredits: () => Source[]
  ) =>
  (transaction: Transaction) => {
    const oldTransaction = transactions.find((p) => p.id === transaction.id);

    if (oldTransaction) {
      //oldFrom
      const oldFindedFromSources = sources.find(
        (s) => s.name === oldTransaction.from
      );
      const oldFindedFromCredits = credits.find(
        (s) => s.name === oldTransaction.from
      );

      if (oldFindedFromSources) {
        const newAmountSource = plus(
          oldFindedFromSources.amount,
          oldTransaction.amount
        );
        console.log(newAmountSource);
        const newSource: Source = {
          ...oldFindedFromSources,
          amount: newAmountSource,
        };
        updateSource(newSource);
      }
      if (oldFindedFromCredits) {
        const newAmountSource = minus(
          oldFindedFromCredits.amount,
          oldTransaction.amount
        );
        const newSource: Source = {
          ...oldFindedFromCredits,
          amount: newAmountSource,
        };
        updateCredit(newSource);
      }
      //oldFrom

      //oldFor
      const oldFindedForSources = sources.find(
        (s) => s.name === oldTransaction.for
      );
      const oldFindedForCredits = credits.find(
        (s) => s.name === oldTransaction.for
      );
      if (oldFindedForSources) {
        const newAmountSource = minus(
          oldFindedForSources.amount,
          multy(oldTransaction.amount, oldTransaction.exchangeRate)
        );
        const newSource: Source = {
          ...oldFindedForSources,
          amount: newAmountSource,
        };
        updateSource(newSource);
      }
      if (oldFindedForCredits) {
        const newAmountSource = plus(
          oldFindedForCredits.amount,
          multy(oldTransaction.amount, oldTransaction.exchangeRate)
        );
        const newSource: Source = {
          ...oldFindedForCredits,
          amount: newAmountSource,
        };
        updateCredit(newSource);
      }
      //oldFor
      //new
      //from
      const findedFromSources = getSources().find(
        (s) => s.name === transaction.from
      );
      const findedFromCredits = getCredits().find(
        (s) => s.name === transaction.from
      );
      if (findedFromSources) {
        const newAmountSource = minus(
          findedFromSources.amount,
          transaction.amount
        );
        const newSource: Source = {
          ...findedFromSources,
          amount: newAmountSource,
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
          amount: newAmountSource,
        };
        updateCredit(newSource);
      }
      //from

      //for
      const findedForSources = getSources().find(
        (s) => s.name === transaction.for
      );
      const findedForCredits = getCredits().find(
        (s) => s.name === transaction.for
      );
      if (findedForSources) {
        const newAmountSource = plus(
          findedForSources.amount,
          multy(transaction.amount, transaction.exchangeRate)
        );
        const newSource: Source = {
          ...findedForSources,
          amount: newAmountSource,
        };
        updateSource(newSource);
      }
      if (findedForCredits) {
        const newAmountSource = minus(
          findedForCredits.amount,
          multy(transaction.amount, transaction.exchangeRate)
        );
        const newSource: Source = {
          ...findedForCredits,
          amount: newAmountSource,
        };
        updateCredit(newSource);
      }
      //for
    }

    updateTransaction(transaction);
  };
