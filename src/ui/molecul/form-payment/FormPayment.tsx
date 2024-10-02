import "./style.css";
import { useState } from "react";
import InputText from "../../atom/input-text/InputText";
import InputNumber from "../../atom/input-number/InputNumber";
import InputWithOptions from "../../atom/input-with-options/InputWithOptions";
import ActionButton from "../../atom/action-button/ActionButton";
import FlexColumnCenter from "../../atom/flex-column-center/FlexColumnCenter";
import Datepicker from "../../atom/datepicker/Datepicker";
import AddTags from "../add-tags/AddTags";
import { Payment, Tag } from "../../../interfaces";

interface FormPaymentComponent {
  actionType?: string;
  actionPayment?: (payment: Payment) => void;
  payment?: Payment;
  fromOptions?: string[];
  forOptions?: string[];
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
    from: "",
    for: "",
    tags: [],
  },
  fromOptions = [],
  forOptions = [],
  deletePayment = () => {},
}: FormPaymentComponent) {
  const [paymentDatetime, setPaymentDatetime] = useState(payment.datetime);
  const [paymentName, setPaymentName] = useState(payment.name);
  const [paymentAmount, setPaymentAmount] = useState(payment.amount);
  const [paymentCurrency, setPaymentCurrency] = useState(payment.currency);
  const [paymentFrom, setPaymentFrom] = useState(payment.from);
  const [paymentFor, setPaymentFor] = useState(payment.for);
  const [paymentTags, setPaymentTags] = useState<Tag[]>(payment.tags);

  const handleActionPayment = () => {
    actionPayment({
      datetime: paymentDatetime,
      name: paymentName,
      amount: paymentAmount,
      currency: paymentCurrency,
      from: paymentFrom,
      for: paymentFor,
      tags: paymentTags,
      id: payment.id,
    });
  };

  const handleDeletePayment = () => {
    const agree = confirm("delete?");
    if (agree) {
      deletePayment(payment);
    }
  };
  // <AddTags />
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
      <AddTags tagsFromParrent={paymentTags} hoistTags={setPaymentTags} />
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
      <InputWithOptions
        id='payment-from'
        name='from'
        options={fromOptions}
        valueFromParent={paymentFrom}
        hoistValue={setPaymentFrom}
      />
      <InputWithOptions
        id='payment-for'
        name='for'
        options={forOptions}
        valueFromParent={paymentFor}
        hoistValue={setPaymentFor}
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
