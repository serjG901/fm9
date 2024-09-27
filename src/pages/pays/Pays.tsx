import "./style.css";
import Page from "../../ui/atom/page/Page";
import AddPayment from "../../ui/substance/add-payment/AddPayment";
import { usePaysStore } from "../../store/paysStore";
import PaymentCard from "../../ui/thing/payment-card/PaymentCard";
import FlexWrap from "../../ui/atom/flex-wrap/FlexWrap";

export default function Pays() {
  const [payments, addPayment, updatePayment, deletePayment] = usePaysStore(
    (state) => [
      state.payments,
      state.addPayment,
      state.updatePayment,
      state.deletePayment,
    ]
  );
  return (
    <Page>
      <div className='pays-page'>
        <h1>Pays</h1>
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
