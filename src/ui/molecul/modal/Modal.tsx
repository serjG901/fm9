// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { ReactNode } from "react";
import "./style.css";
import ActionButton from "../../atom/action-button/ActionButton";
import Cross from "../../atom/cross/Cross";

interface ModalComponent {
  id?: string;
  description?: string;
  children?: ReactNode;
}

export default function Modal({
  id = "modal",
  description = "open",
  children = "children",
}: ModalComponent) {
  const showModal = () => {
    const modalId = document.getElementById(id);
    modalId?.showPopover();
  };

  const hideModal = () => {
    const modalId = document.getElementById(id);
    modalId?.hidePopover();
  };

  return (
    <div>
      <ActionButton actionWithPayload={showModal}>{description}</ActionButton>
      <div className='modal' popover='auto' id={id}>
        <div className='hide-modal'>
          <ActionButton actionWithPayload={hideModal}>
            <Cross />
          </ActionButton>
        </div>
        <div className='content-modal'>{children}</div>
      </div>
    </div>
  );
}
