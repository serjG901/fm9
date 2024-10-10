import "./style.css";
import FormSource from "../../molecul/form-source/FormSource";
import Modal from "../../molecul/modal/Modal";
import { Source } from "../../../interfaces";

interface UpdateSourceComponent {
  updateSource?: (source: Source) => void;
  source?: Source;
  deleteSource?: (source: Source) => void;
}

export default function UpdateSource({
  updateSource = () => {},
  source = { id: 0, name: "", amount: "", currency: "BYN" },
  deleteSource = () => {},
}: UpdateSourceComponent) {
  return (
    <Modal id={`update-source-${source.id}`}>
      <FormSource
        actionType='update'
        actionSource={updateSource}
        source={source}
        deleteSource={deleteSource}
      />
    </Modal>
  );
}
