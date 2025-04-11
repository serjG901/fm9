import "./style.css";
import Modal from "../../molecul/modal/Modal";
import FormPayment from "../../molecul/form-payment/FormPayment";
import {
  defaultPayment,
  Payment,
  Tag,
  TextesByLanguage,
} from "../../../interfaces";
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
  checkDebetCurrency?: (sourceName: string) => string | undefined;
  checkCreditCurrency?: (sourceName: string) => string | undefined;
  isShow?: boolean;
  setIsShow?: (isShow: boolean) => void;
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
  checkDebetCurrency = () => undefined,
  checkCreditCurrency = () => undefined,
  isShow = false,
  setIsShow = () => {},
}: UpdatePaymentComponent) {
  const updatePaymentAndCloseModal = (p: Payment) => {
    updatePayment(p);
    document.getElementById(`update-payment-${payment.id}`)?.hidePopover();
    setIsShow(false);
  };
  const hideModal = () => {
    const modalId = document.getElementById(`update-payment-${payment.id}`);
    modalId?.hidePopover();
    setIsShow(false);
  };
  return (
    <>
      <Modal
        id={`update-payment-${payment.id}`}
        textes={textes}
        hideModal={hideModal}
      >
        {isShow ? (
          <FormPayment
            textes={textes}
            maybeName={maybeName}
            actionType='update'
            actionPayment={updatePaymentAndCloseModal}
            payment={payment}
            deletePayment={deletePayment}
            fromOptions={fromOptions}
            forOptions={forOptions}
            maybeTags={maybeTags}
            currencies={currencies}
            checkDebetCurrency={checkDebetCurrency}
            checkCreditCurrency={checkCreditCurrency}
          />
        ) : null}
      </Modal>
      {payment.id === 0 ? (
        <ActionButton
          actionWithPayload={() => {
            document
              .getElementById(`update-payment-${payment.id}`)
              ?.showPopover();
            setIsShow(true);
          }}
        >
          show modal
        </ActionButton>
      ) : null}
    </>
  );
}
