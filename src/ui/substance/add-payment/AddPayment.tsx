import "./style.css";
import Collapse from "../../atom/collapse/Collapse";
import FormPayment from "../../molecul/form-payment/FormPayment";
import { Payment, Tag, TextesByLanguage } from "../../../interfaces";

interface AddPaymentComponent extends TextesByLanguage {
  maybeName?: string[];
  addPayment?: (payment: Payment) => void;
  fromOptions?: string[];
  forOptions?: string[];
  maybeTags?: Tag[];
  defaultCurrency?: string;
  currencies?: string[];
  payments?: Payment[];
}

export default function AddPayment({
  textes = {},
  maybeName = [],
  addPayment = () => {},
  fromOptions = [],
  forOptions = [],
  maybeTags = [],
  defaultCurrency = "",
  currencies = [],
  payments = [],
}: AddPaymentComponent) {
  return (
    <div className='add-payment'>
      <Collapse collapseLevel='menu' title={textes["add"] || "add"}>
        <FormPayment
          textes={textes}
          maybeName={maybeName}
          actionType='add'
          actionPayment={addPayment}
          fromOptions={fromOptions}
          forOptions={forOptions}
          maybeTags={maybeTags}
          defaultCurrency={defaultCurrency}
          currencies={currencies}
          payments={payments}
        />
      </Collapse>
    </div>
  );
}
