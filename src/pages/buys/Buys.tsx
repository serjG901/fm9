import "./style.css";
import { useBuysStore } from "../../store/buysStore";
import Payments from "../../view/payments/Payments";
import upperFirstLetter from "../../helpers/upperFirstLetter";
import { TextesByLanguage } from "../../interfaces";

export default function Buys({ textes = {} }: TextesByLanguage) {
  return (
    <Payments
      textes={textes}
      paymentsType={textes["buys"] ? upperFirstLetter(textes["buys"]) : "Buys"}
      usePaymentsStore={useBuysStore}
    />
  );
}
