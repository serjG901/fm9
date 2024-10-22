import "./style.css";
import FormSource from "../../molecul/form-source/FormSource";
import Modal from "../../molecul/modal/Modal";
import { Source, TextesByLanguage } from "../../../interfaces";
import ActionButton from "../../atom/action-button/ActionButton";

interface UpdateSourceComponent extends TextesByLanguage {
  updateSource?: (source: Source) => void;
  source?: Source;
  deleteSource?: (source: Source) => void;
  sources?: Source[];
  currencies?: string[];
}

export default function UpdateSource({
  textes = {},
  updateSource = () => {},
  source = { id: 0, name: "", amount: "", currency: "BYN" },
  deleteSource = () => {},
  sources = [],
  currencies = [],
}: UpdateSourceComponent) {
  return (
    <>
      <Modal id={`update-source-${source.id}`} textes={textes}>
        <FormSource
          textes={textes}
          actionType='update'
          actionSource={updateSource}
          source={source}
          deleteSource={deleteSource}
          sources={sources}
          currencies={currencies}
        />
      </Modal>
      {source.id === 0 ? (
        <ActionButton
          actionWithPayload={() =>
            document
              .getElementById(`update-payment-${source.id}`)
              ?.showPopover()
          }
        >
          show modal
        </ActionButton>
      ) : null}
    </>
  );
}
