import "./style.css";
import Collapse from "../../atom/collapse/Collapse";
import FormSource from "../../molecul/form-source/FormSource";
import { NewSource, Source } from "../../../interfaces";

interface AddSourceComponent {
  addSource?: (newSource: NewSource) => void;
  sources?: Source[];
  defaultCurrency?: string;
  currencies?: string[];
}

export default function AddSource({
  addSource = () => {},
  sources = [],
  defaultCurrency = "",
  currencies = [],
}: AddSourceComponent) {
  return (
    <div>
      <Collapse collapseLevel='menu' title='add'>
        <FormSource
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
