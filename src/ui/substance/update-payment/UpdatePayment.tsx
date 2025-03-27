import "./style.css";
import Modal from "../../molecul/modal/Modal";
import FormPayment from "../../molecul/form-payment/FormPayment";
import { defaultPayment, Payment, Tag, TextesByLanguage } from "../../../interfaces";
import ActionButton from "../../atom/action-button/ActionButton";

interface UpdatePaymentComponent extends TextesByLanguage {
  maybeName?: string[];
  updatePayment?: (payment: Payment) => void;
  payment?: Payment;
  fromOptions?: string[];
  forOptions?: string[];
  deletePayment?: (payment: Payment) => void;
  maybeTags?: Tag[];
  currencies?: string[];
}

export default function UpdatePayment({
  textes = {},
  maybeName = [],
  updatePayment = () => {},
  payment = defaultPayment,
  fromOptions = [],
  forOptions = [],
  deletePayment = () => {},
  maybeTags = [],
  currencies = [],
}: UpdatePaymentComponent) {
  return (
    <>
      <Modal id={`update-payment-${payment.id}`} textes={textes}>
        <FormPayment
          textes={textes}
          maybeName={maybeName}
          actionType='update'
          actionPayment={updatePayment}
          payment={payment}
          deletePayment={deletePayment}
          fromOptions={fromOptions}
          forOptions={forOptions}
          maybeTags={maybeTags}
          currencies={currencies}
        />
      </Modal>
      {payment.id === 0 ? (
        <ActionButton
          actionWithPayload={() =>
            document
              .getElementById(`update-payment-${payment.id}`)
              ?.showPopover()
          }
        >
          show modal
        </ActionButton>
      ) : null}
    </>
  );
}
