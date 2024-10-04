import { Payment, Source } from "../interfaces";
import minus from "./minus";
import plus from "./plus";

export const addPaymentWithSource =
  (
    sources: Source[],
    credits: Source[],
    updateSource: (source: Source) => void,
    updateCredit: (source: Source) => void,
    addPayment: (payment: Payment) => void
  ) =>
  (payment: Payment) => {
    //from
    const findedFromSources = sources.find((s) => s.name === payment.from);
    const findedFromCredits = credits.find((s) => s.name === payment.from);
    if (findedFromSources) {
      const newAmountSource = minus(findedFromSources.amount, payment.amount);
      const newSource: Source = {
        ...findedFromSources,
        amount: newAmountSource,
      };
      updateSource(newSource);
    }
    if (findedFromCredits) {
      const newAmountSource = plus(findedFromCredits.amount, payment.amount);
      const newSource: Source = {
        ...findedFromCredits,
        amount: newAmountSource,
      };
      updateCredit(newSource);
    }
    //from

    //for
    const findedForSources = sources.find((s) => s.name === payment.for);
    const findedForCredits = credits.find((s) => s.name === payment.for);
    if (findedForSources) {
      const newAmountSource = plus(findedForSources.amount, payment.amount);
      const newSource: Source = {
        ...findedForSources,
        amount: newAmountSource,
      };
      updateSource(newSource);
    }
    if (findedForCredits) {
      const newAmountSource = minus(findedForCredits.amount, payment.amount);
      const newSource: Source = {
        ...findedForCredits,
        amount: newAmountSource,
      };
      updateCredit(newSource);
    }
    //for
    addPayment(payment);
  };
