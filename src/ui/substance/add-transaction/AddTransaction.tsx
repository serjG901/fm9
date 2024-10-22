import { Source, TextesByLanguage, Transaction } from "../../../interfaces";
import Collapse from "../../atom/collapse/Collapse";
import FormTransaction from "../../molecul/form-transaction/FormTransaction";
import "./style.css";

interface AddTransactionComponent extends TextesByLanguage {
  addTransaction?: (transaction: Transaction) => void;
  fromOptions?: Source[];
  forOptions?: Source[];
}

export default function AddTransaction({
  textes = {},
  addTransaction = () => {},
  fromOptions = [],
  forOptions = [],
}: AddTransactionComponent) {
  return (
    <div>
      <Collapse collapseLevel='menu' title={textes["add"] || "add"}>
        <FormTransaction
          textes={textes}
          actionType='add'
          actionTransaction={addTransaction}
          fromOptions={fromOptions}
          forOptions={forOptions}
        />
      </Collapse>
    </div>
  );
}
