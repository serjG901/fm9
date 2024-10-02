import { Payment, Source } from "../interfaces";
import minus from "./minus";
import plus from "./plus";

export const updatePaymentWithSource =
  (
    updatePayment: (payment: Payment) => void,
    payments: Payment[],
    sources: Source[],
    credits: Source[],
    updateSource: (source: Source) => void,
    updateCredit: (source: Source) => void,
    getSources: () => Source[],
    getCredits: () => Source[]
  ) =>
  (payment: Payment) => {
    const oldPayment = payments.find((p) => p.id === payment.id);

    if (oldPayment) {
      //oldFrom
      const oldFindedFromSources = sources.find(
        (s) => s.name === oldPayment.from
      );
      const oldFindedFromCredits = credits.find(
        (s) => s.name === oldPayment.from
      );

      if (oldFindedFromSources) {
        const newAmountSource = plus(
          oldFindedFromSources.amount,
          oldPayment.amount
        );
        console.log(newAmountSource);
        const newSource: Source = {
          ...oldFindedFromSources,
          amount: newAmountSource + "",
        };
        updateSource(newSource);
      }
      if (oldFindedFromCredits) {
        const newAmountSource = minus(
          oldFindedFromCredits.amount,
          oldPayment.amount
        );
        const newSource: Source = {
          ...oldFindedFromCredits,
          amount: newAmountSource + "",
        };
        updateCredit(newSource);
      }
      //oldFrom

      //oldFor
      const oldFindedForSources = sources.find(
        (s) => s.name === oldPayment.for
      );
      const oldFindedForCredits = credits.find(
        (s) => s.name === oldPayment.for
      );
      if (oldFindedForSources) {
        const newAmountSource = minus(
          oldFindedForSources.amount,
          oldPayment.amount
        );
        const newSource: Source = {
          ...oldFindedForSources,
          amount: newAmountSource + "",
        };
        updateSource(newSource);
      }
      if (oldFindedForCredits) {
        const newAmountSource = plus(
          oldFindedForCredits.amount,
          oldPayment.amount
        );
        const newSource: Source = {
          ...oldFindedForCredits,
          amount: newAmountSource + "",
        };
        updateCredit(newSource);
      }
      //oldFor
      //new
      //from
      const findedFromSources = getSources().find(
        (s) => s.name === payment.from
      );
      const findedFromCredits = getCredits().find(
        (s) => s.name === payment.from
      );
      if (findedFromSources) {
        const newAmountSource = minus(findedFromSources.amount, payment.amount);
        const newSource: Source = {
          ...findedFromSources,
          amount: newAmountSource + "",
        };
        updateSource(newSource);
      }
      if (findedFromCredits) {
        const newAmountSource = plus(findedFromCredits.amount, payment.amount);
        const newSource: Source = {
          ...findedFromCredits,
          amount: newAmountSource + "",
        };
        updateCredit(newSource);
      }
      //from

      //for
      const findedForSources = getSources().find((s) => s.name === payment.for);
      const findedForCredits = getCredits().find((s) => s.name === payment.for);
      if (findedForSources) {
        const newAmountSource = plus(findedForSources.amount, payment.amount);
        const newSource: Source = {
          ...findedForSources,
          amount: newAmountSource + "",
        };
        updateSource(newSource);
      }
      if (findedForCredits) {
        const newAmountSource = minus(findedForCredits.amount, payment.amount);
        const newSource: Source = {
          ...findedForCredits,
          amount: newAmountSource + "",
        };
        updateCredit(newSource);
      }
      //for
    }

    updatePayment(payment);
  };
