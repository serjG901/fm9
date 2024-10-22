import "./style.css";
import Modal from "../../molecul/modal/Modal";
import FormPayment from "../../molecul/form-payment/FormPayment";
import { Payment, Tag, TextesByLanguage } from "../../../interfaces";
import getDefaultDatetime from "../../../helpers/getDefaultDatetime";
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
  payment = {
    id: 0,
    datetime: getDefaultDatetime(),
    name: "",
    amount: "",
    currency: "BYN",
    from: "",
    for: "",
    tags: [],
  },
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
