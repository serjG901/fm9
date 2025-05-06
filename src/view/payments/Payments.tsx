import "./style.css";
import Page from "../../ui/atom/page/Page";
import AddPayment from "../../ui/substance/add-payment/AddPayment";
import PaymentCard from "../../ui/thing/payment-card/PaymentCard";
import PaymentCardSimple from "../../ui/thing/payment-card-simple/PaymentCardSimple";
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
import StatisticSources from "../../ui/substance/statistic-sources/StatisticSources";
import ButtonWithLoading from "../../ui/molecul/buttonWithLoading/ButtonWithLoading";
import filtredPaymentsBySort from "../../helpers/filtredPaymentsBySort";

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
    isSimpleCard,
    setIsSimpleCard,
    isColoredCard,
    setIsColoredCard,
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
    state.isSimpleCard,
    state.setIsSimpleCard,
    state.isColoredCard,
    state.setIsColoredCard,
  ]);
  const [getDebetsName, debets, updateDebet, getDebets, checkDebetCurrency] =
    useDebetsStore((state) => [
      state.getSourcesName,
      state.sources,
      state.updateSource,
      state.getSources,
      state.checkSourceCurrency,
    ]);
  const [
    getCreditsName,
    credits,
    updateCredit,
    getCredits,
    checkCreditCurrency,
  ] = useCreditsStore((state) => [
    state.getSourcesName,
    state.sources,
    state.updateSource,
    state.getSources,
    state.checkSourceCurrency,
  ]);

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

  const [defaultCurrency, currencies, autoAddTags] = useSettingsStore(
    (state) => [state.defaultCurrency, state.currencies, state.autoAddTags]
  );

  const fromOptions = Array.from(
    new Set([...getDebetsName(), ...getCreditsName(), ...getFromOptions()])
  );
  const forOptions = Array.from(
    new Set([...getDebetsName(), ...getCreditsName(), ...getForOptions()])
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

  const filtredPayments = filtredPaymentsBySort(
    payments,
    startPeriod,
    endPeriod,
    search,
    isSearchBySource,
    filterTags
  );

  const byCurrency = Object.groupBy(filtredPayments, (a) => a.currency);
  const amountsByCurrency = Object.keys(byCurrency).map((c) => [
    c,
    byCurrency![c]!.map((p) => p.amount),
  ]);

  const maybeName = Array.from(new Set(payments.map((p) => p.name))).sort(
    (a, b) => (a > b ? 1 : -1)
  );

  const pages = Math.ceil(filtredPayments.length / +itemsPerPage);

  const sortedPaymentsByPage = filtredPayments.slice(
    (pageActive - 1) * +itemsPerPage,
    pageActive * +itemsPerPage
  );

  const Card = isSimpleCard ? PaymentCardSimple : PaymentCard;

  const reduceCards: { payments: Payment[]; date: string; sum: {[key: string]: string} }[] =
    sortedPaymentsByPage.reduce(
      (
        acc: { payments: Payment[]; date: string; sum: { [key: string]: string} }[],
        a: Payment,
        i
      ) => {
        const nextDate = a.datetime.split("T")[0];
        if (i === 0) return [{ payments: [a], date: nextDate, sum: {[a.currency]: a.amount} }];
        if (acc.at(-1)?.date !== nextDate)
          return [...acc, { payments: [a], date: nextDate, sum: {[a.currency]: a.amount} }];
        acc.at(-1)!.payments.push(a);
        acc.at(-1)!.sum[a.currency] = plus(acc.at(-1)!.sum[a.currency], a.amount);
        return acc;
      },
      []
    );
  /*  
  let date = "";
  const cards = sortedPaymentsByPage.map((payment: Payment) => {
    const card = (
      <Card
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
        checkDebetCurrency={checkDebetCurrency}
        checkCreditCurrency={checkCreditCurrency}
        colored={isColoredCard}
      />
    );
    let breakLine: ReactNode;
    if (date === payment.datetime.split("T")[0]) {
      breakLine = <></>;
    } else {
      date = payment.datetime.split("T")[0];
      breakLine = <BreakLine>{date}</BreakLine>;
    }
    return (
      <Contents key={payment.id}>
        {breakLine}
        {card}
      </Contents>
    );
  });
*/
  const handleSetSearch = (search: string) => {
    setSearch(search);
    setPageActive(1);
  };
  const handleSetFilterTags = (filterTags: Tag[]) => {
    setFilterTags(filterTags);
    setPageActive(1);
  };

  const statisticsByCurrency = Object.groupBy(
    filtredPayments,
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
                    <StatisticSources
                      textes={textes}
                      currency={currency}
                      payments={statisticsByCurrency[currency]}
                      search={search}
                      sourceType='from'
                    />
                    <StatisticSources
                      textes={textes}
                      currency={currency}
                      payments={statisticsByCurrency[currency]}
                      search={search}
                      sourceType='for'
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
          payments={payments}
          autoAddTags={autoAddTags}
          checkDebetCurrency={checkDebetCurrency}
          checkCreditCurrency={checkCreditCurrency}
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
        <div className='switch-card-simple'>
          <ButtonWithLoading
            action={() => setIsColoredCard()}
            bgColor={
              isColoredCard
                ? "var(--color-bg-payment-card)"
                : "var(--color-bg-card)"
            }
          >
            <span>&#9680;</span>
          </ButtonWithLoading>
          <ButtonWithLoading action={() => setIsSimpleCard()}>
            {isSimpleCard ? <span>&#8983;</span> : <span>&#9776;</span>}
          </ButtonWithLoading>
        </div>

        <FlexWrap>
          {reduceCards.map((obj, i) => {
            return (
              <Contents key={i}>
                <BreakLine>
                  <div className='break-line-date'>{obj.date}</div>
                  <div className='break-line-sum'>{Object.keys(obj.sum).map((k) => <span>{obj.sum[k]+k}</span>)}</div>
                </BreakLine>
                {obj.payments.map((payment) => {
                  return (
                    <Card
                      key={payment.id}
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
                      checkDebetCurrency={checkDebetCurrency}
                      checkCreditCurrency={checkCreditCurrency}
                      colored={isColoredCard}
                      payments={payments}
                      autoAddTags={autoAddTags}
                    />
                  );
                })}
              </Contents>
            );
          })}
        </FlexWrap>
      </div>

      <Paginate
        pageActive={pageActive}
        pages={pages}
        setPageActive={setPageActive}
        setPreviousPage={setPreviousPage}
        setNextPage={(pages) => setNextPage(pages || 20)}
      />

      {sortedPaymentsByPage.length > +itemsPerPage / 2 ? <ToTop /> : null}
    </Page>
  );
}
