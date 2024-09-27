import { Payment } from "../../../interfaces";
import FlexColumnCenter from "../../atom/flex-column-center/FlexColumnCenter";
import UpdatePayment from "../../substance/update-payment/UpdatePayment";
import "./style.css";

interface PaymentCardComponent {
  payment?: Payment;
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
  },
  updatePayment = () => {},
  deletePayment = () => {},
}: PaymentCardComponent) {
  return (
    <div className='payment-card' key={payment.id}>
      <FlexColumnCenter>
      <div className='payment-card-datetime'>{payment.datetime}</div>
        <div className='payment-card-name'>{payment.name}</div>
        <div className='payment-card-amount'>{payment.amount}</div>
        <div className='payment-card-currency'>{payment.currency}</div>
        <UpdatePayment
          payment={payment}
          updatePayment={updatePayment}
          deletePayment={deletePayment}
        />
      </FlexColumnCenter>
    </div>
  );
}
