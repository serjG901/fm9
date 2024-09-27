import "./style.css";
import Collapse from "../../atom/collapse/Collapse";
import FormPayment from "../../molecul/form-payment/FormPayment";

interface AddPaymentComponent {
  addPayment?: (
    datetime: string,
    name: string,
    amount: string,
    currency: string,
    id?: number
  ) => void;
}

export default function AddPayment({
  addPayment = () => {},
}: AddPaymentComponent) {
  return (
    <Collapse collapseLevel='payments' title='add payment'>
      <FormPayment actionType='add' actionPayment={addPayment} />
    </Collapse>
  );
}
