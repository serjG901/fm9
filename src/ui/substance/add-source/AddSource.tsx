import "./style.css";
import Collapse from "../../atom/collapse/Collapse";
import FormSource from "../../molecul/form-source/FormSource";

interface AddSourceComponent {
  addSource?: (name: string, amount: string, currency: string) => void;
}

export default function AddSource({
  addSource = () => {},
}: AddSourceComponent) {
  return (
    <Collapse collapseLevel='sources' title='add source'>
      <FormSource actionType='add' actionSource={addSource} />
    </Collapse>
  );
}
