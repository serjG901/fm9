import "./style.css";
import Page from "../../ui/atom/page/Page";
import AddPayment from "../../ui/substance/add-payment/AddPayment";
import { useBuysStore } from "../../store/buysStore";
import PaymentCard from "../../ui/thing/payment-card/PaymentCard";
import FlexWrap from "../../ui/atom/flex-wrap/FlexWrap";

export default function Buys() {
  const [payments, addPayment, updatePayment, deletePayment] = useBuysStore(
    (state) => [
      state.payments,
      state.addPayment,
      state.updatePayment,
      state.deletePayment,
    ]
  );
  return (
    <Page>
      <div className='buys-page'>
        <h1>Buys</h1>
        <AddPayment addPayment={addPayment} />
        <FlexWrap
          childrenArray={payments.map((payment) => {
            return (
              <PaymentCard
                payment={payment}
                updatePayment={updatePayment}
                deletePayment={deletePayment}
              />
            );
          })}
        ></FlexWrap>
      </div>
    </Page>
  );
}
