import "./style.css";
import { usePaysStore } from "../../store/paysStore";
import Payments from "../../view/payments/Payments";
import upperFirstLetter from "../../helpers/upperFirstLetter";

interface PaysComponent {
  textes?: { [key: string]: string };
}

export default function Pays({ textes = {} }: PaysComponent) {
  return (
    <Payments
      paymentsType={textes["pays"] ? upperFirstLetter(textes["pays"]) : "Pays"}
      usePaymentsStore={usePaysStore}
    />
  );
}
