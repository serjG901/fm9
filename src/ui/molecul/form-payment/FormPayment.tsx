import "./style.css";
import { useState } from "react";
import InputText from "../../atom/input-text/InputText";
import InputNumber from "../../atom/input-number/InputNumber";
import InputWithOptions from "../../atom/input-with-options/InputWithOptions";
import ActionButton from "../../atom/action-button/ActionButton";
import FlexColumnCenter from "../../atom/flex-column-center/FlexColumnCenter";
import Datepicker from "../../atom/datepicker/Datepicker";
import AddTags from "../add-tags/AddTags";

interface FormPaymentComponent {
  actionType?: string;
  actionPayment?: (
    datetime: string,
    name: string,
    amount: string,
    currency: string,
    id?: number
  ) => void;
  payment?: {
    id: number;
    datetime: string;
    name: string;
    amount: string;
    currency: string;
  };
}

export default function FormPayment({
  actionType = "action",
  actionPayment = () => {},
  payment = {
    id: 0,
    datetime: "2024-09-09",
    name: "",
    amount: "",
    currency: "BYN",
  },
}: FormPaymentComponent) {
  const [paymentDatetime, setPaymentDatetime] = useState(payment.datetime);
  const [paymentName, setPaymentName] = useState(payment.name);
  const [paymentAmount, setPaymentAmount] = useState(payment.amount);
  const [paymentCurrency, setPaymentCurrency] = useState(payment.currency);

  const handleActionPayment = () => {
    actionPayment(
      paymentDatetime,
      paymentName,
      paymentAmount,
      paymentCurrency,
      payment.id
    );
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
    </FlexColumnCenter>
  );
}
