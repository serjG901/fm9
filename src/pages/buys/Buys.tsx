import "./style.css";
import { useBuysStore } from "../../store/buysStore";
import Payments from "../../view/payments/Payments";
import upperFirstLetter from "../../helpers/upperFirstLetter";

interface BuysComponent {
  textes?: { [key: string]: string };
}

export default function Buys({ textes = {} }: BuysComponent) {
  return (
    <Payments
      paymentsType={textes["buys"] ? upperFirstLetter(textes["buys"]) : "Buys"}
      usePaymentsStore={useBuysStore}
    />
  );
}
