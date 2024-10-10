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

  const [isActionStatus, setIsActionStatus] = useState(1);
  const [isDeleteStatus, setIsDeleteStatus] = useState(1);

  const handleActionPayment = () => {
    if (paymentName) {
      setIsActionStatus(2);
    }
  };

  const handleDeletePayment = () => {
    const agree = confirm("delete?");
    if (agree) {
      setIsDeleteStatus(2);
    }
  };

  useEffect(() => {
    let timer = 0;
    if (isActionStatus === 2) {
      setIsActionStatus(3);
    }
    if (isActionStatus === 3) {
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

      timer = setTimeout(() => setIsActionStatus(4), 300);
    }
    if (isActionStatus === 4) {
      clearTimeout(timer);
      timer = setTimeout(() => setIsActionStatus(1), 2000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isActionStatus]);

  useEffect(() => {
    if (isDeleteStatus === 2) {
      setIsDeleteStatus(3);
    }
    if (isDeleteStatus === 3) {
      deletePayment(payment);
    }
  }, [isDeleteStatus]);

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
      {isActionStatus === 2 || isActionStatus === 3 ? (
        <ActionButton>
          <LoadingDots>
            {actionType === "update" ? "updating" : "adding"}
          </LoadingDots>
        </ActionButton>
      ) : isActionStatus === 4 ? (
        <ActionButton>
          <div>{actionType} done</div>
        </ActionButton>
      ) : (
        <ActionButton actionWithPayload={handleActionPayment}>
          {actionType}
        </ActionButton>
      )}

      {actionType === "update" && (
        <>
          <br />
          {isDeleteStatus === 2 ? (
            <ActionButton>
              <LoadingDots>deleting</LoadingDots>
            </ActionButton>
          ) : (
            <ActionButton actionWithPayload={handleDeletePayment} alert={true}>
              delete
            </ActionButton>
          )}
        </>
      )}
    </FlexColumnCenter>
  );
}
