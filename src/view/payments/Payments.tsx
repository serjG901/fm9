import "./style.css";
import Page from "../../ui/atom/page/Page";
import AddPayment from "../../ui/substance/add-payment/AddPayment";
import PaymentCard from "../../ui/thing/payment-card/PaymentCard";
import FlexWrap from "../../ui/atom/flex-wrap/FlexWrap";
import { useDebetsStore } from "../../store/debetsStore";
import { useCreditsStore } from "../../store/creditsStore";
import { updatePaymentWithSource } from "../../helpers/updatePaymentWithSources";
import { addPaymentWithSource } from "../../helpers/addPaymentWithSource";
import FormDataRange from "../../ui/molecul/form-date-range/FormDateRange";
import { usePeriodStore } from "../../store/periodStore";
import BreakLine from "../../ui/atom/break-line/BreakLine";
import {
  Payment,
  PaymentsStore,
  StorePersist,
  Tag,
  TextesByLanguage,
  Write,
} from "../../interfaces";
import { StoreApi, UseBoundStore } from "zustand";
import Statistics from "../../ui/substance/statistics/Statistics";
import plus from "../../helpers/plus";
import { useFiltersStore } from "../../store/filtersStore";
import Filter from "../../ui/substance/filter/Filter";
import Paginate from "../../ui/substance/paginate/Paginate";
import ToTop from "../../ui/molecul/to-top/ToTop";
import { useSettingsStore } from "../../store/settingsStore";
import FlexColumnCenter from "../../ui/atom/flex-column-center/FlexColumnCenter";
import StatisticTags from "../../ui/substance/statistic-tags/StatisticTags";
import Collapse from "../../ui/atom/collapse/Collapse";
import Contents from "../../ui/atom/contents/Contents";

interface PaymentsComponent extends TextesByLanguage {
  paymentsType: string;
  usePaymentsStore: UseBoundStore<
    Write<StoreApi<PaymentsStore>, StorePersist<PaymentsStore, PaymentsStore>>
  >;
}

export default function Payments({
  textes = {},
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
    pageActive,
    itemsPerPage,
    setPageActive,
    setPreviousPage,
    setNextPage,
  ] = usePaymentsStore((state: PaymentsStore) => [
    state.payments,
    state.addPayment,
    state.updatePayment,
    state.deletePayment,
    state.getFromOptions,
    state.getForOptions,
    state.pageActive,
    state.itemsPerPage,
    state.setPageActive,
    state.setPreviousPage,
    state.setNextPage,
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

  const [
    search,
    setSearch,
    filterTags,
    setFilterTags,
    isSearchBySource,
    setIsSearchBySource,
  ] = useFiltersStore((state) => [
    state.search,
    state.setSearch,
    state.filterTags,
    state.setFilterTags,
    state.isSearchBySource,
    state.setIsSearchBySource,
  ]);

  const [defaultCurrency, currencies] = useSettingsStore((state) => [
    state.defaultCurrency,
    state.currencies,
  ]);

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
    : filtredPaymentsByPeriod.filter((p: Payment) =>
        isSearchBySource ? p.from.includes(search) : p.name.includes(search)
      );

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

  const byCurrency = Object.groupBy(filtredPayments, (a) => a.currency);
  const amountsByCurrency = Object.keys(byCurrency).map((c) => [
    c,
    byCurrency![c]!.map((p) => p.amount),
  ]);

  const maybeName = Array.from(new Set(payments.map((p) => p.name))).sort(
    (a, b) => (a > b ? 1 : -1)
  );

  const pages = Math.ceil(sortedPayments.length / +itemsPerPage);
  const sortedPaymentsByPage = sortedPayments.slice(
    (pageActive - 1) * +itemsPerPage,
    pageActive * +itemsPerPage
  );

  const cards = sortedPaymentsByPage.map((payment: Payment) => {
    const card = (
      <PaymentCard
        textes={textes}
        maybeName={maybeName}
        payment={payment}
        updatePayment={updatePaymentWithS}
        deletePayment={deletePayment}
        fromOptions={fromOptions}
        forOptions={forOptions}
        maybeTags={maybeTags}
        search={search}
        currencies={currencies}
        isSearchBySource={isSearchBySource}
      />
    );
    let breakLine = <BreakLine>{payment.datetime.split("T")[0]}</BreakLine>;
    if (date === "") {
      date = payment.datetime.split("T")[0];
    } else {
      if (date === payment.datetime.split("T")[0]) {
        breakLine = <></>;
      }
    }
    date = payment.datetime.split("T")[0];
    return (
      <Contents key={payment.id}>
        {breakLine}
        {card}
      </Contents>
    );
  });

  const handleSetSearch = (search: string) => {
    setSearch(search);
    setPageActive(1);
  };
  const handleSetFilterTags = (filterTags: Tag[]) => {
    setFilterTags(filterTags);
    setPageActive(1);
  };

  const statisticsByCurrency = Object.groupBy(
    sortedPayments,
    ({ currency }) => currency
  );

  return (
    <Page>
      <div className='payments-view'>
        <h1>{paymentsType}</h1>
        <FlexColumnCenter>
          <FormDataRange
            textes={textes}
            key={"FormDataRange"}
            period={{ start: startPeriod, end: endPeriod }}
            setPeriod={setPeriod}
          />
          <Filter
            textes={textes}
            key={"Filter"}
            search={search}
            setSearch={handleSetSearch}
            filterTags={filterTags}
            setFilterTags={handleSetFilterTags}
            maybeTags={maybeTags}
            isSearchBySource={isSearchBySource}
            setIsSearchBySource={setIsSearchBySource}
          />
          <Collapse title={`${textes["stat"] || "stat"}`} collapseLevel='menu'>
            <FlexColumnCenter>
              {...Object.keys(statisticsByCurrency).map((currency) => {
                return (
                  <Contents key={currency}>
                    <Statistics
                      textes={textes}
                      currency={currency}
                      payments={statisticsByCurrency[currency]}
                      search={search}
                    />
                    <StatisticTags
                      textes={textes}
                      currency={currency}
                      payments={statisticsByCurrency[currency]}
                    />
                  </Contents>
                );
              })}
            </FlexColumnCenter>
          </Collapse>
        </FlexColumnCenter>

        {amountsByCurrency.map((pair) => (
          <div key={pair[0].toString()}>
            {pair[0]}: <span className='sum'>{plus(...pair[1])}</span>
          </div>
        ))}

        <AddPayment
          textes={textes}
          maybeName={maybeName}
          addPayment={addPaymentWithS}
          fromOptions={fromOptions}
          forOptions={forOptions}
          maybeTags={maybeTags}
          defaultCurrency={defaultCurrency}
          currencies={currencies}
        />
        <br />
        <Paginate
          dublicate={true}
          pageActive={pageActive}
          pages={pages}
          setPageActive={setPageActive}
          setPreviousPage={setPreviousPage}
          setNextPage={() => setNextPage(pages || 20)}
        />

        <FlexWrap>{cards}</FlexWrap>
      </div>

      <Paginate
        pageActive={pageActive}
        pages={pages}
        setPageActive={setPageActive}
        setPreviousPage={setPreviousPage}
        setNextPage={(pages) => setNextPage(pages || 20)}
      />

      {cards.length > +itemsPerPage / 2 ? <ToTop /> : null}
    </Page>
  );
}
