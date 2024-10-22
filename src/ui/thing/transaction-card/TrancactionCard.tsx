import { Source, TextesByLanguage, Transaction } from "../../../interfaces";
import ArrowFromFor from "../../atom/arrow-from-for/ArrowFromFor";
import FlexColumnCenter from "../../atom/flex-column-center/FlexColumnCenter";
import UpdateTransaction from "../../substance/update-transaction/UpdateTransaction";
import "./style.css";

interface TransactionCardComponent extends TextesByLanguage {
  transaction?: Transaction;
  fromOptions?: Source[];
  forOptions?: Source[];
  updateTransaction?: (transaction: Transaction) => void;
  deleteTransaction?: (transaction: Transaction) => void;
}

export default function TransactionCard({
  textes = {},
  transaction = {
    id: 0,
    datetime: "2024-09-24",
    amount: "0",
    from: "",
    for: "",
    exchangeRate: "0",
  },
  fromOptions = [],
  forOptions = [],
  updateTransaction = () => {},
  deleteTransaction = () => {},
}: TransactionCardComponent) {
  return (
    <div className='transaction-card' key={transaction.id}>
      <FlexColumnCenter>
        <div className='transaction-card-datetime'>
          {transaction.datetime.split("T").map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>
        <div className='transaction-card-amount'>{transaction.amount}</div>
        <div className='transaction-card-from-for'>
          <div className='transaction-card-from'>{transaction.from}</div>
          <ArrowFromFor />
          <div className='transaction-card-for'>{transaction.for}</div>
        </div>
        <div className='transaction-card-exchange-rate'>
          <span className='transaction-card-from'>
            {textes["rate"] || "rate"}:
          </span>{" "}
          {transaction.exchangeRate}
        </div>
        <UpdateTransaction
          transaction={transaction}
          fromOptions={fromOptions}
          forOptions={forOptions}
          updateTransaction={updateTransaction}
          deleteTransaction={deleteTransaction}
        />
      </FlexColumnCenter>
    </div>
  );
}
