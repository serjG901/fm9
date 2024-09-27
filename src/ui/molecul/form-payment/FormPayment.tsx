import "./style.css";
import { useState } from "react";
import InputText from "../../atom/input-text/InputText";
import InputNumber from "../../atom/input-number/InputNumber";
import InputWithOptions from "../../atom/input-with-options/InputWithOptions";
import ActionButton from "../../atom/action-button/ActionButton";
import FlexColumnCenter from "../../atom/flex-column-center/FlexColumnCenter";
import Datepicker from "../../atom/datepicker/Datepicker";
import AddTags from "../add-tags/AddTags";
import { Payment } from "../../../interfaces";

interface FormPaymentComponent {
  actionType?: string;
  actionPayment?: (payment: Payment) => void;
  payment?: Payment;
  deletePayment?: (payment: Payment) => void;
}

export default function FormPayment({
  actionType = "action",
  actionPayment = () => {},
  payment = {
    id: 0,
    datetime: new Date(Date.now()).toLocaleDateString("ru-RU", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }),
    name: "",
    amount: "",
    currency: "BYN",
  },
  deletePayment = () => {},
}: FormPaymentComponent) {
  const [paymentDatetime, setPaymentDatetime] = useState(payment.datetime);
  const [paymentName, setPaymentName] = useState(payment.name);
  const [paymentAmount, setPaymentAmount] = useState(payment.amount);
  const [paymentCurrency, setPaymentCurrency] = useState(payment.currency);

  const handleActionPayment = () => {
    actionPayment({
      datetime: paymentDatetime,
      name: paymentName,
      amount: paymentAmount,
      currency: paymentCurrency,
      id: payment.id,
    });
  };

  const handleDeletePayment = () => {
    const agree = confirm("delete?");
    if (agree) {
      deletePayment(payment);
    }
  };

  return (
    <FlexColumnCenter>
      <Datepicker
        id='payment-datetime'
        name='datetime'
        valueFromParent={paymentDatetime}
        hoistValue={setPaymentDatetime}
      />
      <InputText
        id='payment-name'
        name='name'
        valueFromParent={paymentName}
        hoistValue={setPaymentName}
      />
      <AddTags />
      <InputNumber
        id='payment-amount'
        name='amount'
        valueFromParent={paymentAmount}
        hoistValue={setPaymentAmount}
      />
      <InputWithOptions
        id='payment-currency'
        name='currency'
        options={["BYN", "USD", "EUR", "RUB"]}
        valueFromParent={paymentCurrency}
        hoistValue={setPaymentCurrency}
      />
      <ActionButton actionWithPayload={handleActionPayment}>
        {actionType}
      </ActionButton>
      {actionType === "update" && (
        <>
          <br />
          <ActionButton actionWithPayload={handleDeletePayment} alert={true}>
            delete
          </ActionButton>
        </>
      )}
    </FlexColumnCenter>
  );
}
