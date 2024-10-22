import "./style.css";
import { usePaysStore } from "../../store/paysStore";
import Payments from "../../view/payments/Payments";
import upperFirstLetter from "../../helpers/upperFirstLetter";
import { TextesByLanguage } from "../../interfaces";

export default function Pays({ textes = {} }: TextesByLanguage) {
  return (
    <Payments
      textes={textes}
      paymentsType={textes["pays"] ? upperFirstLetter(textes["pays"]) : "Pays"}
      usePaymentsStore={usePaysStore}
    />
  );
}
