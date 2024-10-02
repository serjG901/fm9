import "./style.css";
import Collapse from "../../atom/collapse/Collapse";
import FormPayment from "../../molecul/form-payment/FormPayment";
import { Payment } from "../../../interfaces";

interface AddPaymentComponent {
  addPayment?: (payment: Payment) => void;
  fromOptions?: string[];
  forOptions?: string[];
}

export default function AddPayment({
  addPayment = () => {},
  fromOptions = [],
  forOptions = [],
}: AddPaymentComponent) {
  return (
    <Collapse collapseLevel='menu' title='add'>
      <FormPayment
        actionType='add'
        actionPayment={addPayment}
        fromOptions={fromOptions}
        forOptions={forOptions}
      />
    </Collapse>
  );
}
