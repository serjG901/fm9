import "./style.css";
import Collapse from "../../atom/collapse/Collapse";
import FormPayment from "../../molecul/form-payment/FormPayment";
import { Payment, Tag } from "../../../interfaces";

interface AddPaymentComponent {
  addPayment?: (payment: Payment) => void;
  fromOptions?: string[];
  forOptions?: string[];
  maybeTags?: Tag[];
}

export default function AddPayment({
  addPayment = () => {},
  fromOptions = [],
  forOptions = [],
  maybeTags = [],
}: AddPaymentComponent) {
  return (
    <div>
      <Collapse collapseLevel='menu' title='add'>
        <FormPayment
          actionType='add'
          actionPayment={addPayment}
          fromOptions={fromOptions}
          forOptions={forOptions}
          maybeTags={maybeTags}
        />
      </Collapse>
    </div>
  );
}
