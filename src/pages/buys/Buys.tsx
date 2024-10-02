import "./style.css";
import { useBuysStore } from "../../store/buysStore";
import Payments from "../../view/payments/Payments";

export default function Buys() {
  return <Payments paymentsType='Buys' usePaymentsStore={useBuysStore} />;
}
