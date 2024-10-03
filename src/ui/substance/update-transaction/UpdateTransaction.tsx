import getDefaultDatetime from "../../../helpers/getDefaultDatetime";
import { Source, Transaction } from "../../../interfaces";
import FormTransaction from "../../molecul/form-transaction/FormTransaction";
import Modal from "../../molecul/modal/Modal";
import "./style.css";

interface UpdateTransactionComponent {
  transaction?: Transaction;
  fromOptions?: Source[];
  forOptions?: Source[];
  updateTransaction?: (transaction: Transaction) => void;
  deleteTransaction?: (transaction: Transaction) => void;
}

export default function UpdateTransaction({
  transaction = {
    id: 0,
    datetime: getDefaultDatetime(),
    amount: "",
    from: "",
    for: "",
    exchangeRate: "1",
  },
  fromOptions = [],
  forOptions = [],
  updateTransaction = () => {},
  deleteTransaction = () => {},
}: UpdateTransactionComponent) {
  return (
    <div>
      <Modal id={`update-payment-${transaction.id}`} description='update'>
        <FormTransaction
          actionType='update'
          transaction={transaction}
          actionTransaction={updateTransaction}
          deleteTransaction={deleteTransaction}
          fromOptions={fromOptions}
          forOptions={forOptions}
        />
      </Modal>
    </div>
  );
}
