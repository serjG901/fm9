import ActionButton from "./atom/action-button/ActionButton";
import Checked from "./atom/checked/Checked";
import Collapse from "./atom/collapse/Collapse";
import Colorpicker from "./atom/colorpicker/Colorpicker";
import Cross from "./atom/cross/Cross";
import Datepicker from "./atom/datepicker/Datepicker";
import FlexColumnCenter from "./atom/flex-column-center/FlexColumnCenter";
import HighlightText from "./atom/highlight-text/HighlightText";
import InputNumber from "./atom/input-number/InputNumber";
import InputText from "./atom/input-text/InputText";
import InputWithMemory from "./atom/input-with-memory/InputWithMemory";
import InputWithOptions from "./atom/input-with-options/InputWithOptions";
import Modal from "./molecul/modal/Modal";
import Page from "./atom/page/Page";
import FormSource from "./molecul/form-source/FormSource";
import Menu from "./molecul/menu/Menu";
import ViewAndPath from "./atom/view-and-path/ViewAndPath";
import AddSource from "./substance/add-source/AddSource";
import AddTags from "./molecul/add-tags/AddTags";
import SourceCard from "./thing/source-card/SourceCard";
import UpdateSource from "./substance/update-source/UpdateSource";
import FlexWrap from "./atom/flex-wrap/FlexWrap";
import FormPayment from "./molecul/form-payment/FormPayment";
import AddPayment from "./substance/add-payment/AddPayment";
import UpdatePayment from "./substance/update-payment/UpdatePayment";

const componentsArr = [
  <ActionButton />,
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
  <Page />,
  <ViewAndPath />,
  <FormPayment />,
  <FormSource />,
  <Menu />,
  <Modal />,
  [<Menu />, <Menu />],
  <AddPayment />,
  <AddSource />,
  <AddTags />,
  <UpdatePayment />,
  <UpdateSource />,
  <SourceCard />,
];

const components: { [key: string]: JSX.Element | JSX.Element[] } =
  componentsArr.reduce(
    (
      acc: { [key: string]: JSX.Element | JSX.Element[] },
      a: JSX.Element | JSX.Element[]
    ) => {
      acc[Array.isArray(a) ? a[0].type.name + "Array" : a.type.name] = (
        <ViewAndPath>{a}</ViewAndPath>
      );
      return acc;
    },
    {}
  );
console.dir(components);

export default components;
