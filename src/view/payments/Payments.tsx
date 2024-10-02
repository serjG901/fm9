import "./style.css";
import Page from "../../ui/atom/page/Page";
import AddPayment from "../../ui/substance/add-payment/AddPayment";
import PaymentCard from "../../ui/thing/payment-card/PaymentCard";
import FlexWrap from "../../ui/atom/flex-wrap/FlexWrap";
import { useDebetsStore } from "../../store/debetsStore";
import { useCreditsStore } from "../../store/creditsStore";
import { updatePaymentWithSource } from "../../helpers/updatePaymentWithSources";
import { addPaymentWithSource } from "../../helpers/addPaymentWithSource";
import FormDataRange from "../../ui/molecul/form-data-range/FormDataRange";
import { usePeriodStore } from "../../store/periodStore";
import BreakLine from "../../ui/atom/break-line/BreakLine";
import { Payment, PaymentsStore } from "../../interfaces";
import { StoreApi, UseBoundStore } from "zustand";

interface PaymentsComponent {
  paymentsType: string;
  usePaymentsStore: UseBoundStore<
    Write<StoreApi<PaymentsStore>, StorePersist<PaymentsStore, PaymentsStore>>
  >;
}

export default function Payments({
  paymentsType,
  usePaymentsStore,
}: PaymentsComponent) {
  const [
    payments,
    addPayment,
    updatePayment,
    deletePayment,
    getFromOptions,
    getForOptions,
  ] = usePaymentsStore((state: PaymentsStore) => [
    state.payments,
    state.addPayment,
    state.updatePayment,
    state.deletePayment,
    state.getFromOptions,
    state.getForOptions,
  ]);
  const [getDebetsName, debets, updateDebet, getDebets] = useDebetsStore(
    (state) => [
      state.getSourcesName,
      state.sources,
      state.updateSource,
      state.getSources,
    ]
  );
  const [getCreditsName, credits, updateCredit, getCredits] = useCreditsStore(
    (state) => [
      state.getSourcesName,
      state.sources,
      state.updateSource,
      state.getSources,
    ]
  );

  const [startPeriod, endPeriod, setPeriod] = usePeriodStore((state) => [
    state.start,
    state.end,
    state.setPeriod,
  ]);

  const fromOptions = Array.from(
    new Set([...getDebetsName(), ...getCreditsName(), ...getFromOptions()])
  );
  const forOptions = Array.from(
    new Set([...getDebetsName(), ...getCreditsName(), ...getForOptions()])
  );

  let date = "";

  const filtredPayments =
    startPeriod && endPeriod
      ? payments.filter(
          (p: Payment) => p.datetime >= startPeriod && p.datetime <= endPeriod
        )
      : payments;

  const sortedPayments = filtredPayments.sort((p1: Payment, p2: Payment) =>
    p1.datetime > p2.datetime ? -1 : 1
  );

  const addPaymentWithS = addPaymentWithSource(
    debets,
    credits,
    updateDebet,
    updateCredit,
    addPayment
  );

  const updatePaymentWithS = updatePaymentWithSource(
    updatePayment,
    payments,
    debets,
    credits,
    updateDebet,
    updateCredit,
    getDebets,
    getCredits
  );

  return (
    <Page>
      <div className='payments-view'>
        <h1>{paymentsType}</h1>
        <AddPayment
          addPayment={addPaymentWithS}
          fromOptions={fromOptions}
          forOptions={forOptions}
        />
        <FormDataRange
          period={{ start: startPeriod, end: endPeriod }}
          setPeriod={setPeriod}
        />
        <FlexWrap
          childrenArray={sortedPayments.map((payment: Payment) => {
            const card = (
              <PaymentCard
                payment={payment}
                updatePayment={updatePaymentWithS}
                deletePayment={deletePayment}
                fromOptions={fromOptions}
                forOptions={forOptions}
              />
            );
            let breakLine = <BreakLine>{payment.datetime}</BreakLine>;
            if (date === "") {
              date = payment.datetime;
            } else {
              if (date === payment.datetime) {
                breakLine = <></>;
              }
            }
            date = payment.datetime;
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
