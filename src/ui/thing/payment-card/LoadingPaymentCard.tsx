import { Payment, Tag } from "../../../interfaces";
import ArrowFromFor from "../../atom/arrow-from-for/ArrowFromFor";
import FlexColumnCenter from "../../atom/flex-column-center/FlexColumnCenter";
import HighlightText from "../../atom/highlight-text/HighlightText";
import SearchedName from "../../molecul/searched-name/SearchedName";
import UpdatePayment from "../../substance/update-payment/UpdatePayment";
import "./style.css";

interface PaymentCardComponent {
  maybeName?: string[];
  payment?: Payment;
  fromOptions?: string[];
  forOptions?: string[];
  updatePayment?: (payment: Payment) => void;
  deletePayment?: (payment: Payment) => void;
  maybeTags?: Tag[];
  search?: string;
}

export default function LoadingPaymentCard({
  maybeName = [],
  payment = {
    id: 0,
    datetime: "2024-09-24",
    name: "payment",
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
  maybeTags = [],
  search = "",
}: PaymentCardComponent) {
  return (
    <div className='loading-payment-card' key={payment.id}>
      <div className='loading'></div>
      <FlexColumnCenter>
        <div className='payment-card-datetime'>
          {payment.datetime.split("T").map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>
        <div>
          <div className='payment-card-name'>
            <SearchedName name={payment.name} search={search} />
          </div>
          <div className='payment-card-amount'>{payment.amount}</div>
          <div className='payment-card-currency'>{payment.currency}</div>
        </div>
        <div>
          {payment.tags.map((t) => (
            <HighlightText key={t.value + t.color} bgColor={t.color} padding>
              {t.value}
            </HighlightText>
          ))}
        </div>
        {payment.from && payment.for && (
          <div className='payment-card-from-for'>
            <div className='payment-card-from'>{payment.from}</div>
            <ArrowFromFor />
            <div className='payment-card-for'>{payment.for}</div>
          </div>
        )}
        <UpdatePayment
          maybeName={maybeName}
          payment={payment}
          fromOptions={fromOptions}
          forOptions={forOptions}
          updatePayment={updatePayment}
          deletePayment={deletePayment}
          maybeTags={maybeTags}
        />
      </FlexColumnCenter>
    </div>
  );
}