import "./style.css";
import { useEffect, useState } from "react";
import InputNumber from "../../atom/input-number/InputNumber";
import InputWithOptions from "../../atom/input-with-options/InputWithOptions";
import ActionButton from "../../atom/action-button/ActionButton";
import FlexColumnCenter from "../../atom/flex-column-center/FlexColumnCenter";
import Datepicker from "../../atom/datepicker/Datepicker";
import AddTags from "../add-tags/AddTags";
import { Payment, Tag } from "../../../interfaces";
import getDefaultDatetime from "../../../helpers/getDefaultDatetime";
import LoadingDots from "../../atom/loading-dots/LoadingDots";

interface FormPaymentComponent {
  maybeName?: string[];
  actionType?: string;
  actionPayment?: (payment: Payment) => void;
  payment?: Payment;
  fromOptions?: string[];
  forOptions?: string[];
  deletePayment?: (payment: Payment) => void;
  maybeTags?: Tag[];
}

export default function FormPayment({
  maybeName = [],
  actionType = "action",
  actionPayment = () => {},
  payment = {
    id: 0,
    datetime: getDefaultDatetime(),
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
  maybeTags = [],
}: FormPaymentComponent) {
  const [paymentDatetime, setPaymentDatetime] = useState(payment.datetime);
  const [paymentName, setPaymentName] = useState(payment.name);
  const [paymentAmount, setPaymentAmount] = useState(payment.amount);
  const [paymentCurrency, setPaymentCurrency] = useState(payment.currency);
  const [paymentFrom, setPaymentFrom] = useState(payment.from);
  const [paymentFor, setPaymentFor] = useState(payment.for);
  const [paymentTags, setPaymentTags] = useState<Tag[]>(payment.tags);

  const [inActionStatus, setInActionStatus] = useState(1);

  const handleActionPayment = () => {
    setInActionStatus(2);
  };

  const handleDeletePayment = () => {
    const agree = confirm("delete?");
    if (agree) {
      deletePayment(payment);
    }
  };

  useEffect(() => {
    if (inActionStatus) {
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
      setInActionStatus(3);
    }
  }, [inActionStatus]);

  useEffect(() => {
    setInActionStatus(1);
  }, []);

  return (
    <FlexColumnCenter>
      <Datepicker
        id='payment-datetime'
        name='datetime'
        valueFromParent={paymentDatetime}
        hoistValue={setPaymentDatetime}
      />
      <InputWithOptions
        id='payment-name'
        name='name'
        valueFromParent={paymentName}
        hoistValue={setPaymentName}
        options={maybeName}
      />
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
      <AddTags
        tagsFromParrent={paymentTags}
        hoistTags={setPaymentTags}
        maybeTags={maybeTags}
      />

      <ActionButton actionWithPayload={handleActionPayment}>
        {actionType}
      </ActionButton>

      {inActionStatus === 2 ? (
        <LoadingDots>in action</LoadingDots>
      ) : inActionStatus === 3 ? (
        <div>{actionType} done</div>
      ) : null}
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
