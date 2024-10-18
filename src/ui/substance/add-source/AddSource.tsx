import "./style.css";
import Collapse from "../../atom/collapse/Collapse";
import FormSource from "../../molecul/form-source/FormSource";
import { NewSource, Source } from "../../../interfaces";

interface AddSourceComponent {
  addSource?: (newSource: NewSource) => void;
  sources?: Source[];
}

export default function AddSource({
  addSource = () => {},
  sources = [],
}: AddSourceComponent) {
  return (
    <div>
      <Collapse collapseLevel='menu' title='add'>
        <FormSource
          actionType='add'
          actionSource={addSource}
          sources={sources}
        />
      </Collapse>
    </div>
  );
}
