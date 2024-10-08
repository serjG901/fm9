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
import {
  Payment,
  PaymentsStore,
  StorePersist,
  Tag,
  Write,
} from "../../interfaces";
import { StoreApi, UseBoundStore } from "zustand";
import Statistics from "../../ui/molecul/statistics/Statistics";
import plus from "../../helpers/plus";
import { useFiltersStore } from "../../store/filtersStore";
import Filter from "../../ui/substance/filter/Filter";
import { useEffect, useState } from "react";

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
  const [isLoading, setIsLoading] = useState(false);

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

  const [search, setSearch, filterTags, setFilterTags] = useFiltersStore(
    (state) => [
      state.search,
      state.setSearch,
      state.filterTags,
      state.setFilterTags,
    ]
  );

  const fromOptions = Array.from(
    new Set([...getDebetsName(), ...getCreditsName(), ...getFromOptions()])
  );
  const forOptions = Array.from(
    new Set([...getDebetsName(), ...getCreditsName(), ...getForOptions()])
  );

  let date = "";

  const filtredPaymentsByPeriod =
    startPeriod && endPeriod
      ? payments.filter(
          (p: Payment) => p.datetime >= startPeriod && p.datetime <= endPeriod
        )
      : payments;

  const filtredPaymentsBySearch = !search
    ? filtredPaymentsByPeriod
    : filtredPaymentsByPeriod.filter((p: Payment) => p.name.includes(search));

  const filtredPayments = !filterTags.length
    ? filtredPaymentsBySearch
    : filtredPaymentsBySearch.filter((p) =>
        p.tags
          .map((tag) =>
            filterTags.find(
              (ft) => ft.value + ft.color === tag.value + tag.color
            )
          )
          .find((b) => b)
      );

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

  const maybeTags = payments
    .flatMap((p) => p.tags)
    .reduce(
      (acc: Tag[], tag) =>
        acc.find((t) => t.value + t.color === tag.value + tag.color)
          ? acc
          : [...acc, tag],
      []
    )
    .sort((a, b) => (a.value > b.value ? 1 : -1));

  const byCurrency = Object.groupBy(payments, (a) => a.currency);
  const amountsByCurrency = Object.keys(byCurrency).map((c) => [
    c,
    byCurrency![c]!.map((p) => p.amount),
  ]);

  const maybeName = Array.from(new Set(payments.map((p) => p.name))).sort(
    (a, b) => (a > b ? 1 : -1)
  );

  useEffect(() => setIsLoading(false), []);

  return isLoading ? (
    <div className='loading'>Loading</div>
  ) : (
    <Page>
      <div className='payments-view'>
        <h1>{paymentsType}</h1>
        <FlexWrap
          childrenArray={[
            <FormDataRange
              period={{ start: startPeriod, end: endPeriod }}
              setPeriod={setPeriod}
            />,
            <Filter
              search={search}
              setSearch={setSearch}
              filterTags={filterTags}
              setFilterTags={setFilterTags}
              maybeTags={maybeTags}
            />,
            <Statistics payments={sortedPayments} search={search} />,
          ]}
        />

        {amountsByCurrency.map((pair) => (
          <div>
            {pair[0]}: <span className='sum'>{plus(...pair[1])}</span>
          </div>
        ))}

        <AddPayment
          maybeName={maybeName}
          addPayment={addPaymentWithS}
          fromOptions={fromOptions}
          forOptions={forOptions}
          maybeTags={maybeTags}
        />

        <FlexWrap
          childrenArray={sortedPayments.map((payment: Payment) => {
            const card = (
              <PaymentCard
                maybeName={maybeName}
                payment={payment}
                updatePayment={updatePaymentWithS}
                deletePayment={deletePayment}
                fromOptions={fromOptions}
                forOptions={forOptions}
                maybeTags={maybeTags}
                search={search}
              />
            );
            let breakLine = (
              <BreakLine>{payment.datetime.split("T")[0]}</BreakLine>
            );
            if (date === "") {
              date = payment.datetime.split("T")[0];
            } else {
              if (date === payment.datetime.split("T")[0]) {
                breakLine = <></>;
              }
            }
            date = payment.datetime.split("T")[0];
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
