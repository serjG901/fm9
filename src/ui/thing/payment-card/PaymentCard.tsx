import { Payment } from "../../../interfaces";
import ArrowFromFor from "../../atom/arrow-from-for/ArrowFromFor";
import FlexColumnCenter from "../../atom/flex-column-center/FlexColumnCenter";
import HighlightText from "../../atom/highlight-text/HighlightText";
import UpdatePayment from "../../substance/update-payment/UpdatePayment";
import "./style.css";

interface PaymentCardComponent {
  payment?: Payment;
  fromOptions?: string[];
  forOptions?: string[];
  updatePayment?: (payment: Payment) => void;
  deletePayment?: (payment: Payment) => void;
}

export default function PaymentCard({
  payment = {
    id: 0,
    datetime: "2024-09-24",
    name: "source",
    amount: "0",
    currency: "BYN",
    from: "",
    for: "",
    tags: [],
  },
  fromOptions = [],
  forOptions = [],
  updatePayment = () => {},
  deletePayment = () => {},
}: PaymentCardComponent) {
  return (
    <div className='payment-card' key={payment.id}>
      <FlexColumnCenter>
        <div className='payment-card-datetime'>{payment.datetime}</div>
        <div>
          <div className='payment-card-name'>{payment.name}</div>
          <div className='payment-card-amount'>{payment.amount}</div>
          <div className='payment-card-currency'>{payment.currency}</div>
        </div>
        <div>
          {payment.tags.map((t) => (
            <HighlightText color={t.color}>{t.value}</HighlightText>
          ))}
        </div>
        {payment.from && payment.for && (
          <div>
            <div className='payment-card-from'>{payment.from}</div>
            <ArrowFromFor />
            <div className='payment-card-for'>{payment.for}</div>
          </div>
        )}
        <UpdatePayment
          payment={payment}
          fromOptions={fromOptions}
          forOptions={forOptions}
          updatePayment={updatePayment}
          deletePayment={deletePayment}
        />
      </FlexColumnCenter>
    </div>
  );
}
