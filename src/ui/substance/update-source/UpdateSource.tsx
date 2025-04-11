import "./style.css";
import { useState } from "react";
import FormSource from "../../molecul/form-source/FormSource";
import Modal from "../../molecul/modal/Modal";
import { defaultSource, Source, TextesByLanguage } from "../../../interfaces";
import ActionButton from "../../atom/action-button/ActionButton";
import Contents from "../../atom/contents/Contents";

interface UpdateSourceComponent extends TextesByLanguage {
  updateSource?: (source: Source) => void;
  source?: Source;
  deleteSource?: (source: Source) => void;
  sources?: Source[];
  currencies?: string[];
  defaultHue?: string;
  isShow?: boolean;
  setIsShow?: (isShow: boolean) => void;
}

export default function UpdateSource({
  textes = {},
  updateSource = () => {},
  source = defaultSource,
  deleteSource = () => {},
  sources = [],
  currencies = [],
  defaultHue = "",
  isShow = false,
  setIsShow = () => {},
}: UpdateSourceComponent) {
  const [hueSelf, setHueSelf] = useState(
    source.hueAsDefault ? defaultHue : source.hue
  );

  const updateSourceAndCloseModal = (s: Source) => {
    updateSource(s);
    document.getElementById(`update-source-${source.id}`)?.hidePopover();
    setHueSelf(defaultHue);
    setIsShow(false);
  };

  const hideModal = () => {
    const modalId = document.getElementById(`update-source-${source.id}`);
    modalId?.hidePopover();
    setHueSelf(defaultHue);
    setIsShow(false);
  };

  return (
    <Contents style={{ "--hue-self": hueSelf } as React.CSSProperties}>
      <Modal
        id={`update-source-${source.id}`}
        textes={textes}
        hideModal={hideModal}
      >
        {isShow ? (
          <FormSource
            textes={textes}
            actionType='update'
            actionSource={updateSourceAndCloseModal}
            source={source}
            deleteSource={deleteSource}
            sources={sources}
            currencies={currencies}
            defaultHue={defaultHue}
            setHueSelf={setHueSelf}
          />
        ) : null}
      </Modal>
      {source.id === 0 ? (
        <ActionButton
          actionWithPayload={() => {
            document
              .getElementById(`update-source-${source.id}`)
              ?.showPopover();
            setIsShow(true);
          }}
        >
          show modal
        </ActionButton>
      ) : null}
    </Contents>
  );
}
