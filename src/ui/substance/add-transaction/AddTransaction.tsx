import { Source, Transaction } from "../../../interfaces";
import Collapse from "../../atom/collapse/Collapse";
import FormTransaction from "../../molecul/form-transaction/FormTransaction";
import "./style.css";

interface AddTransactionComponent {
  addTransaction?: (transaction: Transaction) => void;
  fromOptions?: Source[];
  forOptions?: Source[];
}

export default function AddTransaction({
  addTransaction = () => {},
  fromOptions = [],
  forOptions = [],
}: AddTransactionComponent) {
  return (
    <div>
      <Collapse collapseLevel='menu' title='add'>
        <FormTransaction
          actionType='add'
          actionTransaction={addTransaction}
          fromOptions={fromOptions}
          forOptions={forOptions}
        />
      </Collapse>
    </div>
  );
}
