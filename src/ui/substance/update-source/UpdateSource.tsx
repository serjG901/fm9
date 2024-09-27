import "./style.css";
import FormSource from "../../molecul/form-source/FormSource";
import Modal from "../../molecul/modal/Modal";

interface UpdateSourceComponent {
  updateSource?: (name: string, amount: string, currency: string) => void;
  source?: {
    name: string;
    amount: string;
    currency: string;
  };
}

export default function UpdateSource({
  updateSource = () => {},
  source = { name: "", amount: "", currency: "BYN" },
}: UpdateSourceComponent) {
  return (
    <Modal id='update-source' description='update'>
      <FormSource
        actionType='update'
        actionSource={updateSource}
        source={source}
      />
    </Modal>
  );
}
