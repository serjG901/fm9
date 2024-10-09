//atoms
import ActionButton from "./atom/action-button/ActionButton";
import ArrowFromFor from "./atom/arrow-from-for/ArrowFromFor";
import BreakLine from "./atom/break-line/BreakLine";
import Checked from "./atom/checked/Checked";
import Collapse from "./atom/collapse/Collapse";
import Colorpicker from "./atom/colorpicker/Colorpicker";
import Cross from "./atom/cross/Cross";
import Datepicker from "./atom/datepicker/Datepicker";
import FlexColumnCenter from "./atom/flex-column-center/FlexColumnCenter";
import FlexWrap from "./atom/flex-wrap/FlexWrap";
import HighlightText from "./atom/highlight-text/HighlightText";
import InputNumber from "./atom/input-number/InputNumber";
import InputText from "./atom/input-text/InputText";
import InputWithMemory from "./atom/input-with-memory/InputWithMemory";
import InputWithOptions from "./atom/input-with-options/InputWithOptions";
import LoadingDots from "./atom/loading-dots/LoadingDots";
import Page from "./atom/page/Page";
import ViewAndPath from "./atom/view-and-path/ViewAndPath";
//moleculs
import AddTags from "./molecul/add-tags/AddTags";
import FormDataRange from "./molecul/form-data-range/FormDataRange";
import FormPayment from "./molecul/form-payment/FormPayment";
import FormSource from "./molecul/form-source/FormSource";
import FormTransaction from "./molecul/form-transaction/FormTransaction";
import Menu from "./molecul/menu/Menu";
import Modal from "./molecul/modal/Modal";
import Search from "./molecul/search/Search";
import SearchedName from "./molecul/searched-name/SearchedName";
import Statistics from "./molecul/statistics/Statistics";
//substances
import AddPayment from "./substance/add-payment/AddPayment";
import AddSource from "./substance/add-source/AddSource";
import AddTransaction from "./substance/add-transaction/AddTransaction";
import Filter from "./substance/filter/Filter";
import UpdatePayment from "./substance/update-payment/UpdatePayment";
import UpdateSource from "./substance/update-source/UpdateSource";
import UpdateTransaction from "./substance/update-transaction/UpdateTransaction";
//things
import LoadingPaymentCard from "./thing/payment-card/LoadingPaymentCard";
import PaymentCard from "./thing/payment-card/PaymentCard";
import SourceCard from "./thing/source-card/SourceCard";
import TransactionCard from "./thing/transaction-card/TrancactionCard";

const componentsArr = [
  <ActionButton />,
  <ArrowFromFor />,
  <BreakLine />,
  <Checked />,
  <Collapse />,
  <Colorpicker />,
  <Cross />,
  <Datepicker />,
  <FlexColumnCenter />,
  <FlexWrap />,
  <HighlightText />,
  <InputNumber />,
  <InputText />,
  <InputWithMemory />,
  <InputWithOptions />,
  <LoadingDots />,
  <Page />,
  <ViewAndPath />,
  <AddTags />,
  <FormDataRange />,
  <FormPayment />,
  <FormSource />,
  <FormTransaction />,
  <Menu />,
  <Modal />,
  <Search />,
  <SearchedName />,
  <Statistics />,
  <AddPayment />,
  <AddSource />,
  <AddTransaction />,
  <Filter />,
  <UpdatePayment />,
  <UpdateSource />,
  <UpdateTransaction />,
  <LoadingPaymentCard />,
  <PaymentCard />,
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
