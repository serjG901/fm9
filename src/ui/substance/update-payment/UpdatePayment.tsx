import "./style.css";
import Modal from "../../molecul/modal/Modal";
import FormPayment from "../../molecul/form-payment/FormPayment";
import { Payment, Tag } from "../../../interfaces";

interface UpdatePaymentComponent {
  updatePayment?: (payment: Payment) => void;
  payment?: Payment;
  fromOptions?: string[];
  forOptions?: string[];
  deletePayment?: (payment: Payment) => void;
  maybeTags?: Tag[];
}

export default function UpdatePayment({
  updatePayment = () => {},
  payment = {
    id: 0,
    datetime: "2024-09-24",
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
}: UpdatePaymentComponent) {
  return (
    <Modal id={`update-payment-${payment.id}`} description='update'>
      <FormPayment
        actionType='update'
        actionPayment={updatePayment}
        payment={payment}
        deletePayment={deletePayment}
        fromOptions={fromOptions}
        forOptions={forOptions}
        maybeTags={maybeTags}
      />
    </Modal>
  );
}
