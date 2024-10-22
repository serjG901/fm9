import getDefaultDatetime from "../../../helpers/getDefaultDatetime";
import { Source, TextesByLanguage, Transaction } from "../../../interfaces";
import ActionButton from "../../atom/action-button/ActionButton";
import FormTransaction from "../../molecul/form-transaction/FormTransaction";
import Modal from "../../molecul/modal/Modal";
import "./style.css";

interface UpdateTransactionComponent extends TextesByLanguage {
  transaction?: Transaction;
  fromOptions?: Source[];
  forOptions?: Source[];
  updateTransaction?: (transaction: Transaction) => void;
  deleteTransaction?: (transaction: Transaction) => void;
}

export default function UpdateTransaction({
  textes = {},
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
      <Modal id={`update-transaction-${transaction.id}`} textes={textes}>
        <FormTransaction
          textes={textes}
          actionType='update'
          transaction={transaction}
          actionTransaction={updateTransaction}
          deleteTransaction={deleteTransaction}
          fromOptions={fromOptions}
          forOptions={forOptions}
        />
      </Modal>
      {transaction.id === 0 ? (
        <ActionButton
          actionWithPayload={() =>
            document
              .getElementById(`update-transaction-${transaction.id}`)
              ?.showPopover()
          }
        >
          show modal
        </ActionButton>
      ) : null}
    </div>
  );
}
