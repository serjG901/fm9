import "./style.css";
import { useState } from "react";
import FormSource from "../../molecul/form-source/FormSource";
import Modal from "../../molecul/modal/Modal";
import { Source, TextesByLanguage } from "../../../interfaces";
import ActionButton from "../../atom/action-button/ActionButton";
import Contents from "../../atom/contents/Contents";

interface UpdateSourceComponent extends TextesByLanguage {
  updateSource?: (source: Source) => void;
  source?: Source;
  deleteSource?: (source: Source) => void;
  sources?: Source[];
  currencies?: string[];
  defaultHue?: string;
}

export default function UpdateSource({
  textes = {},
  updateSource = () => {},
  source = { id: 0, name: "", amount: "", currency: "", hue: "" },
  deleteSource = () => {},
  sources = [],
  currencies = [],
  defaultHue = "",
}: UpdateSourceComponent) {
  const updateSourceAndCloseModal = (s: Source) => {
    updateSource(s);
    document.getElementById(`update-source-${source.id}`)?.hidePopover();
  };
  const [hueSelf, setHueSelf] = useState(source.hue || defaultHue);
  return (
    <Contents style={{ "--hue-self": hueSelf } as React.CSSProperties}>
      <Modal id={`update-source-${source.id}`} textes={textes}>
        <FormSource
          textes={textes}
          actionType='update'
          actionSource={updateSourceAndCloseModal}
          source={source}
          deleteSource={deleteSource}
          sources={sources}
          currencies={currencies}
          defaultHue={hueSelf}
          setHueSelf={setHueSelf}
        />
      </Modal>
      {source.id === 0 ? (
        <ActionButton
          actionWithPayload={() =>
            document.getElementById(`update-source-${source.id}`)?.showPopover()
          }
        >
          show modal
        </ActionButton>
      ) : null}
    </Contents>
  );
}
