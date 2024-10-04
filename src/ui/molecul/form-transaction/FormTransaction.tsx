import "./style.css";
import { useEffect, useState } from "react";
import InputNumber from "../../atom/input-number/InputNumber";
import InputWithOptions from "../../atom/input-with-options/InputWithOptions";
import ActionButton from "../../atom/action-button/ActionButton";
import FlexColumnCenter from "../../atom/flex-column-center/FlexColumnCenter";
import Datepicker from "../../atom/datepicker/Datepicker";
import { Source, Transaction } from "../../../interfaces";
import getDefaultDatetime from "../../../helpers/getDefaultDatetime";
import multy from "../../../helpers/multy";

interface FormTransactionComponent {
  actionType?: string;
  actionTransaction?: (transaction: Transaction) => void;
  transaction?: Transaction;
  fromOptions?: Source[];
  forOptions?: Source[];
  deleteTransaction?: (transaction: Transaction) => void;
}

export default function FormTransaction({
  actionType = "action",
  actionTransaction = () => {},
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
  deleteTransaction = () => {},
}: FormTransactionComponent) {
  const [transactionDatetime, setTransactionDatetime] = useState(
    transaction.datetime
  );
  const [transactionAmount, setTransactionAmount] = useState(
    transaction.amount
  );
  const [transactionFrom, setTransactionFrom] = useState(transaction.from);
  const [transactionFor, setTransactionFor] = useState(transaction.for);
  const [transactionExchangeRate, setTransactionExchangeRate] = useState(
    transaction.exchangeRate
  );

  const [rateDirection, setRateDirection] = useState("right");

  const handleActionTransaction = () => {
    actionTransaction({
      datetime: transactionDatetime,
      amount: transactionAmount,
      from: transactionFrom,
      for: transactionFor,
      exchangeRate: transactionExchangeRate,
      id: transaction.id,
    });
  };

  const handleDeleteTransaction = () => {
    const agree = confirm("delete?");
    if (agree) {
      deleteTransaction(transaction);
    }
  };

  const handleChangeRateDirection = () => {
    setRateDirection(rateDirection === "right" ? "left" : "right");
  };

  useEffect(() => {
    setTransactionExchangeRate(
      (1 / +transactionExchangeRate).toString().slice(0, 4)
    );
  }, [rateDirection]);

  return (
    <FlexColumnCenter>
      <Datepicker
        id='transaction-datetime'
        name='datetime'
        valueFromParent={transactionDatetime}
        hoistValue={setTransactionDatetime}
      />
      <InputNumber
        id='transaction-amount'
        name='amount'
        valueFromParent={transactionAmount}
        hoistValue={setTransactionAmount}
      />
      <InputWithOptions
        id='transaction-from'
        name='from'
        options={fromOptions.map((op) => op.name)}
        valueFromParent={transactionFrom}
        hoistValue={setTransactionFrom}
      />
      <InputWithOptions
        id='transaction-for'
        name='for'
        options={forOptions.map((op) => op.name)}
        valueFromParent={transactionFor}
        hoistValue={setTransactionFor}
      />
      <div>
        <InputNumber
          id='transaction-exchange-rate'
          name='exchange-rate'
          valueFromParent={transactionExchangeRate}
          hoistValue={setTransactionExchangeRate}
          numberAfterZero={6}
        />

        <div>
          <div>
            {transactionAmount}{" "}
            {fromOptions.find((op) => op.name === transactionFrom)?.currency}
          </div>
          <ActionButton actionWithPayload={handleChangeRateDirection}>
            ↺
          </ActionButton>
          <div>
            {multy(transactionExchangeRate.toString(), transactionAmount)}{" "}
            {forOptions.find((op) => op.name === transactionFor)?.currency}
          </div>
        </div>
      </div>

      <ActionButton actionWithPayload={handleActionTransaction}>
        {actionType}
      </ActionButton>
      {actionType === "update" && (
        <>
          <br />
          <ActionButton
            actionWithPayload={handleDeleteTransaction}
            alert={true}
          >
            delete
          </ActionButton>
        </>
      )}
    </FlexColumnCenter>
  );
}
