import "./style.css";
import Collapse from "../../atom/collapse/Collapse";
import FormPayment from "../../molecul/form-payment/FormPayment";
import { Payment, Tag } from "../../../interfaces";

interface AddPaymentComponent {
  maybeName?: string[];
  addPayment?: (payment: Payment) => void;
  fromOptions?: string[];
  forOptions?: string[];
  maybeTags?: Tag[];
}

export default function AddPayment({
  maybeName = [],
  addPayment = () => {},
  fromOptions = [],
  forOptions = [],
  maybeTags = [],
}: AddPaymentComponent) {
  return (
    <div className='add-payment'>
      <Collapse collapseLevel='menu' title='add'>
        <FormPayment
          maybeName={maybeName}
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
