import ActionButton from "./atom/action-button/ActionButton";
import Checked from "./atom/checked/Checked";
import Collapse from "./atom/collapse/Collapse";
import Colorpicker from "./atom/colorpicker/Colorpicker";
import Datepicker from "./atom/datepicker/Datepicker";
import HighlightText from "./atom/highlight-text/HighlightText";
import InputText from "./atom/input-text/InputText";
import InputWithMemory from "./atom/input-with-memory/InputWithMemory";
import InputWithOptions from "./atom/input-with-options/InputWithOptions";
import Page from "./atom/page/Page";
import Menu from "./molecul/menu/Menu";
import ViewAndPath from "./molecul/view-and-path/ViewAndPath";
import AddTags from "./substance/add-tags/AddTags";

const componentsArr = [
  <ActionButton />,
  <Checked />,
  <Collapse />,
  <Colorpicker />,
  <Datepicker />,
  <HighlightText />,
  <InputText />,
  <InputWithMemory />,
  <InputWithOptions />,
  <Page />,
  <Menu />,
  <ViewAndPath />,
  [<Menu />, <Menu />],
  <AddTags />,
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
