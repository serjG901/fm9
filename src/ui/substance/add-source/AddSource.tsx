import "./style.css";
import Collapse from "../../atom/collapse/Collapse";
import FormSource from "../../molecul/form-source/FormSource";
import { NewSource, Source, TextesByLanguage } from "../../../interfaces";

interface AddSourceComponent extends TextesByLanguage {
  addSource?: (newSource: NewSource) => void;
  sources?: Source[];
  defaultCurrency?: string;
  currencies?: string[];
}

export default function AddSource({
  textes = {},
  addSource = () => {},
  sources = [],
  defaultCurrency = "",
  currencies = [],
}: AddSourceComponent) {
  return (
    <div>
      <Collapse collapseLevel='menu' title={textes["add"] || "add"}>
        <FormSource
          textes={textes}
          actionType='add'
          actionSource={addSource}
          sources={sources}
          defaultCurrency={defaultCurrency}
          currencies={currencies}
        />
      </Collapse>
    </div>
  );
}
