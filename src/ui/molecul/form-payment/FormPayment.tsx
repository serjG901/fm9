import "./style.css";
import { useEffect, useState } from "react";
import InputNumber from "../../atom/input-number/InputNumber";
import InputWithOptions from "../../atom/input-with-options/InputWithOptions";
import ActionButton from "../../atom/action-button/ActionButton";
import FlexColumnCenter from "../../atom/flex-column-center/FlexColumnCenter";
import Datepicker from "../../atom/datepicker/Datepicker";
import AddTags from "../add-tags/AddTags";
import { Payment, Tag, TextesByLanguage } from "../../../interfaces";
import getDefaultDatetime from "../../../helpers/getDefaultDatetime";
import LoadingDots from "../../atom/loading-dots/LoadingDots";

interface FormPaymentComponent extends TextesByLanguage {
  maybeName?: string[];
  actionType?: string;
  actionPayment?: (payment: Payment) => void;
  payment?: Payment;
  fromOptions?: string[];
  forOptions?: string[];
  deletePayment?: (payment: Payment) => void;
  maybeTags?: Tag[];
  defaultCurrency?: string;
  currencies?: string[];
  payments?: Payment[];
}

export default function FormPayment({
  textes = {},
  maybeName = [],
  actionType = "action",
  actionPayment = () => {},
  payment = {
    id: 0,
    datetime: getDefaultDatetime(),
    name: "",
    amount: "",
    currency: "",
    from: "",
    for: "",
    tags: [],
  },
  fromOptions = [],
  forOptions = [],
  deletePayment = () => {},
  maybeTags = [],
  defaultCurrency = "",
  currencies = [],
  payments = [],
}: FormPaymentComponent) {
  const [paymentDatetime, setPaymentDatetime] = useState(payment.datetime);
  const [paymentName, setPaymentName] = useState(payment.name);
  const [paymentAmount, setPaymentAmount] = useState(payment.amount);
  const [paymentCurrency, setPaymentCurrency] = useState(
    payment.id === 0 ? defaultCurrency : payment.currency
  );
  const [paymentFrom, setPaymentFrom] = useState(payment.from);
  const [paymentFor, setPaymentFor] = useState(payment.for);
  const [paymentTags, setPaymentTags] = useState<Tag[]>(payment.tags);

  const [isActionStatus, setIsActionStatus] = useState(1);
  const [isDeleteStatus, setIsDeleteStatus] = useState(1);

  const handleActionPayment = () => {
    if (paymentName) {
      if (!(isNaN(+paymentAmount) || +paymentAmount <= 0)) {
        setIsActionStatus(2);
      }
    }
  };

  const handleDeletePayment = () => {
    const agree = confirm(`${textes["delete"]}?`);
    if (agree) {
      setIsDeleteStatus(2);
    }
  };

  const handleFocusLeaveForName = () => {
    if (payments.length) {
      setPaymentTags(
        payments
          ?.reduce(
            (acc: Tag[], p) =>
              p.name === paymentName ? [...acc, ...p.tags] : acc,
            []
          )
          .reduce(
            (acc: Tag[], tag) =>
              acc.find((t) => JSON.stringify(t) === JSON.stringify(tag))
                ? acc
                : [...acc, tag],
            []
          )
      );
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
      document.getElementById(`update-payment-${payment.id}`)?.hidePopover();
    }
  }, [isDeleteStatus]);

  return (
    <FlexColumnCenter>
      <Datepicker
        id={`${actionType === "update" ? "update-" : ""}payment-datetime`}
        name={textes["datetime"] || "datetime"}
        valueFromParent={paymentDatetime}
        hoistValue={setPaymentDatetime}
      />
      <InputWithOptions
        id={`${actionType === "update" ? "update-" : ""}payment-name`}
        name={textes["name"] || "name"}
        valueFromParent={paymentName}
        hoistValue={setPaymentName}
        options={maybeName}
        handleFocusLeave={handleFocusLeaveForName}
      />
      <InputNumber
        id={`${actionType === "update" ? "update-" : ""}payment-amount`}
        name={textes["amount"] || "amount"}
        valueFromParent={paymentAmount}
        hoistValue={setPaymentAmount}
      />
      <InputWithOptions
        id={`${actionType === "update" ? "update-" : ""}payment-currency`}
        name={textes["currency"] || "currency"}
        options={currencies}
        valueFromParent={paymentCurrency}
        hoistValue={setPaymentCurrency}
      />
      <InputWithOptions
        id={`${actionType === "update" ? "update-" : ""}payment-from`}
        name={textes["from"] || "from"}
        options={fromOptions}
        valueFromParent={paymentFrom}
        hoistValue={setPaymentFrom}
      />
      <InputWithOptions
        id={`${actionType === "update" ? "update-" : ""}payment-for`}
        name={textes["for"] || "for"}
        options={forOptions}
        valueFromParent={paymentFor}
        hoistValue={setPaymentFor}
      />
      <div>
        <AddTags
          textes={textes}
          tagsFromParrent={paymentTags}
          hoistTags={setPaymentTags}
          maybeTags={maybeTags}
        />
      </div>
      <br />
      {isActionStatus === 2 || isActionStatus === 3 ? (
        <ActionButton>
          <LoadingDots>
            {actionType === "update"
              ? textes["updating"] || "updating"
              : textes["adding"] || "adding"}
          </LoadingDots>
        </ActionButton>
      ) : isActionStatus === 4 ? (
        <ActionButton>
          <div>{textes["done"] || "done"}</div>
        </ActionButton>
      ) : (
        <ActionButton actionWithPayload={handleActionPayment}>
          {textes[actionType] || actionType}
        </ActionButton>
      )}

      {actionType === "update" && (
        <>
          <br />
          {isDeleteStatus === 2 ? (
            <ActionButton alert>
              <LoadingDots>{textes["deleting"] || "deleting"}</LoadingDots>
            </ActionButton>
          ) : (
            <ActionButton actionWithPayload={handleDeletePayment} alert>
              {textes["delete"] || "delete"}
            </ActionButton>
          )}
        </>
      )}
    </FlexColumnCenter>
  );
}
