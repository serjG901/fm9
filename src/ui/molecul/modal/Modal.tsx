// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { ReactNode } from "react";
import "./style.css";
import ActionButton from "../../atom/action-button/ActionButton";
/*import Cross from "../../atom/cross/Cross";*/

interface ModalComponent {
  id?: string;
  //description?: string;
  children?: ReactNode;
}

export default function Modal({
  id = "modal",
  //description = "open",
  children = "children",
}: ModalComponent) {
  /* const showModal = () => {
    const modalId = document.getElementById(id);
    modalId?.showPopover();
  };*/

  const hideModal = (_, e) => {
    e.stopPropagation();
    const modalId = document.getElementById(id);
    modalId?.hidePopover();
  };
  //<ActionButton actionWithPayload={showModal}>{description}</ActionButton>
  return (
    <div>
      <div className='modal' popover='manual' id={id}>
        <div className='hide-modal'>
          <ActionButton actionWithPayload={hideModal}>close</ActionButton>
        </div>
        <div className='modal-content'>{children}</div>
      </div>
    </div>
  );
}
