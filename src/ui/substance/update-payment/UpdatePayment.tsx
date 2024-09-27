import "./style.css";
import Modal from "../../molecul/modal/Modal";
import FormPayment from "../../molecul/form-payment/FormPayment";

interface UpdatePaymentComponent {
  updatePayment?: (
    datetime: string,
    name: string,
    amount: string,
    currency: string,
    id?: number
  ) => void;
  payment?: {
    id: number;
    datetime: string;
    name: string;
    amount: string;
    currency: string;
  };
}

export default function UpdatePayment({
  updatePayment = () => {},
  payment = {
    id: 0,
    datetime: "2024-09-09",
    name: "",
    amount: "",
    currency: "BYN",
  },
}: UpdatePaymentComponent) {
  return (
    <Modal id='update-payment' description='update'>
      <FormPayment
        actionType='update'
        actionPayment={updatePayment}
        payment={payment}
      />
    </Modal>
  );
}
