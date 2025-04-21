//atoms
import { JSX } from "react";
import ActionButton from "./atom/action-button/ActionButton";
import ArrowFromFor from "./atom/arrow-from-for/ArrowFromFor";
import BreakLine from "./atom/break-line/BreakLine";
import Checked from "./atom/checked/Checked";
import Collapse from "./atom/collapse/Collapse";
import ColoredText from "./atom/colored-text/ColoredText";
import Colorpicker from "./atom/colorpicker/Colorpicker";
import Contents from "./atom/contents/Contents";
import Cross from "./atom/cross/Cross";
import Datepicker from "./atom/datepicker/Datepicker";
import FlexColumnCenter from "./atom/flex-column-center/FlexColumnCenter";
import FlexWrap from "./atom/flex-wrap/FlexWrap";
import Grid from "./atom/grid/Grid";
import HighlightText from "./atom/highlight-text/HighlightText";
import InputNumber from "./atom/input-number/InputNumber";
import InputNumeric from "./atom/input-numeric/InputNumeric";
import InputRange from "./atom/input-range/InputRange";
import InputText from "./atom/input-text/InputText";
import InputWithMemory from "./atom/input-with-memory/InputWithMemory";
import InputWithOptions from "./atom/input-with-options/InputWithOptions";
import LoadingDots from "./atom/loading-dots/LoadingDots";
import Page from "./atom/page/Page";
import ViewAndPath from "./atom/view-and-path/ViewAndPath";
//moleculs
import AddTags from "./molecul/add-tags/AddTags";
import ButtonWithLoading from "./molecul/buttonWithLoading/ButtonWithLoading";
import FormDataRange from "./molecul/form-date-range/FormDateRange";
import FormPayment from "./molecul/form-payment/FormPayment";
import FormSource from "./molecul/form-source/FormSource";
import FormTransaction from "./molecul/form-transaction/FormTransaction";
import Menu from "./molecul/menu/Menu";
import Modal from "./molecul/modal/Modal";
import MonthStatRow from "./molecul/month-stat-row/MonthStatRow";
import PaginatePageButton from "./molecul/paginate-page-button/PaginatePageButton";
import Search from "./molecul/search/Search";
import SearchedName from "./molecul/searched-name/SearchedName";
import StatRow from "./molecul/stat-row/StatRow";
import SumPerMonth from "./molecul/sum-per-month/SumPerMonth";
import ToTop from "./molecul/to-top/ToTop";
//substances
import AddPayment from "./substance/add-payment/AddPayment";
import AddSource from "./substance/add-source/AddSource";
import AddTransaction from "./substance/add-transaction/AddTransaction";
import Filter from "./substance/filter/Filter";
import MonthStat from "./substance/month-stat/MonthStat";
import Paginate from "./substance/paginate/Paginate";
import StatisticSources from "./substance/statistic-sources/StatisticSources";
import StatisticTags from "./substance/statistic-tags/StatisticTags";
import Statistics from "./substance/statistics/Statistics";
import UpdatePayment from "./substance/update-payment/UpdatePayment";
import UpdateSource from "./substance/update-source/UpdateSource";
import UpdateTransaction from "./substance/update-transaction/UpdateTransaction";
//things
import Currencies from "./thing/currencies/Currencies";
import Languages from "./thing/languages/Languages";
import ManageBase from "./thing/manage-base/ManageBase";
import ManageData from "./thing/manage-data/ManageData";
import ManageTags from "./thing/manage-tags/ManageTags";
import PaymentCard from "./thing/payment-card/PaymentCard";
import PaymentCardSimple from "./thing/payment-card-simple/PaymentCardSimple";
import SourceCard from "./thing/source-card/SourceCard";
import TransactionCard from "./thing/transaction-card/TrancactionCard";

const componentsArr = [
  //atoms
  <ActionButton />,
  <ArrowFromFor />,
  <BreakLine />,
  <Checked />,
  <Collapse />,
  <ColoredText />,
  <Colorpicker />,
  <Contents />,
  <Cross />,
  <Datepicker />,
  <FlexColumnCenter />,
  <FlexWrap />,
  <Grid />,
  <HighlightText />,
  <InputNumber />,
  <InputNumeric />,
  <InputRange />,
  <InputText />,
  <InputWithMemory />,
  <InputWithOptions />,
  <LoadingDots />,
  <Page />,
  <ViewAndPath />,
  //moleculs
  <AddTags />,
  <ButtonWithLoading />,
  <FormDataRange />,
  <FormPayment />,
  <FormSource />,
  <FormTransaction />,
  <Menu />,
  <Modal />,
  <MonthStatRow />,
  <PaginatePageButton />,
  <Search />,
  <SearchedName />,
  <StatRow />,
  <SumPerMonth />,
  <ToTop />,
  //substances
  <AddPayment />,
  <AddSource />,
  <AddTransaction />,
  <Filter />,
  <MonthStat />,
  <Paginate />,
  <StatisticSources />,
  <StatisticTags />,
  <Statistics />,
  <UpdatePayment />,
  <UpdateSource />,
  <UpdateTransaction />,
  //things
  <Currencies />,
  <Languages />,
  <ManageBase />,
  <ManageData />,
  <ManageTags />,
  <PaymentCard />,
  <PaymentCardSimple />,
  <SourceCard />,
  <TransactionCard />,
];

const components: { [key: string]: JSX.Element | JSX.Element[] } =
  componentsArr.reduce(
    (
      acc: { [key: string]: JSX.Element | JSX.Element[] },
      a: JSX.Element | JSX.Element[]
    ) => {
      acc[Array.isArray(a) ? a[0].type.name + "Array" : a.type.name] = (
        <ViewAndPath key={a.toString() + Math.random()}>{a}</ViewAndPath>
      );
      return acc;
    },
    {}
  );
//console.dir(components);

export default components;
