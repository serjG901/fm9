// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { ReactNode } from "react";
import "./style.css";
import ActionButton from "../../atom/action-button/ActionButton";
import { TextesByLanguage } from "../../../interfaces";

interface ModalComponent extends TextesByLanguage {
  id?: string;
  children?: ReactNode;
  hideModal?: (isShow: boolean) => void;
}

export default function Modal({
  textes = {},
  id = "modal",
  children = "children",
  hideModal = () => {},
}: ModalComponent) {
  return (
    <div>
      <div
        className='modal'
        popover='manual'
        id={id}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='modal-content'>{children}</div>
        <div className='hide-modal'>
          <ActionButton actionWithPayload={hideModal} attention>
            {textes["close"] || "close"}
          </ActionButton>
        </div>
      </div>
    </div>
  );
}
