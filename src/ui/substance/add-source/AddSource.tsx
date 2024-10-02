import "./style.css";
import Collapse from "../../atom/collapse/Collapse";
import FormSource from "../../molecul/form-source/FormSource";
import { NewSource } from "../../../interfaces";

interface AddSourceComponent {
  addSource?: (newSource: NewSource) => void;
}

export default function AddSource({
  addSource = () => {},
}: AddSourceComponent) {
  return (
    <div>
      <Collapse collapseLevel='menu' title='add'>
        <FormSource actionType='add' actionSource={addSource} />
      </Collapse>
    </div>
  );
}
