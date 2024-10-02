import "./style.css";
import { usePaysStore } from "../../store/paysStore";
import Payments from "../../view/payments/Payments";

export default function Pays() {
  return <Payments paymentsType='Pays' usePaymentsStore={usePaysStore} />;
}
