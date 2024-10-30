import "./style.css";
import { useState } from "react";
import InputText from "../../atom/input-text/InputText";
import InputNumber from "../../atom/input-number/InputNumber";
import InputWithOptions from "../../atom/input-with-options/InputWithOptions";
import ActionButton from "../../atom/action-button/ActionButton";
import FlexColumnCenter from "../../atom/flex-column-center/FlexColumnCenter";
import { Source, TextesByLanguage } from "../../../interfaces";

interface FormSourceComponent extends TextesByLanguage {
  actionType?: string;
  actionSource?: (source: Source) => void;
  source?: Source;
  deleteSource?: (source: Source) => void;
  sources?: Source[];
  defaultCurrency?: string;
  currencies?: string[];
}

export default function FormSource({
  textes = {},
  actionType = "action",
  actionSource = () => {},
  source = { id: 0, name: "", amount: "", currency: "" },
  deleteSource = () => {},
  sources = [],
  defaultCurrency = "",
  currencies = [],
}: FormSourceComponent) {
  const [sourceName, setSourceName] = useState(source.name);
  const [sourceAmount, setSourceAmount] = useState(source.amount);
  const [sourceCurrency, setSourceCurrency] = useState(
    source.id === 0 ? defaultCurrency : source.currency
  );

  const handleActionSource = () => {
    if (!(isNaN(+sourceAmount) || +sourceAmount < 0)) {
      actionSource({
        name: sourceName,
        amount: sourceAmount,
        currency: sourceCurrency,
        id: source.id,
      });
    }
  };

  const handleDeleteSource = () => {
    const agree = confirm(`${textes["delete"]}?`);
    if (agree) {
      deleteSource(source);
    }
  };

  return (
    <FlexColumnCenter>
      <InputText
        id={`${actionType === "update" ? "update-" : ""}source-name`}
        name={textes["name"] || "name"}
        valueFromParent={sourceName}
        hoistValue={setSourceName}
        noValidValues={sources
          .filter((s) => s.id !== source.id)
          .map((s) => s.name)}
      />
      <InputNumber
        id={`${actionType === "update" ? "update-" : ""}source-amount`}
        name={textes["amount"] || "amount"}
        valueFromParent={sourceAmount}
        hoistValue={setSourceAmount}
      />
      <InputWithOptions
        id={`${actionType === "update" ? "update-" : ""}source-currency`}
        name={textes["currency"] || "currency"}
        options={currencies}
        valueFromParent={sourceCurrency}
        hoistValue={setSourceCurrency}
      />
      <ActionButton actionWithPayload={handleActionSource}>
        {textes[actionType] || actionType}
      </ActionButton>
      {actionType === "update" && (
        <>
          <br />
          <ActionButton actionWithPayload={handleDeleteSource} alert={true}>
            {textes["delete"] || "delete"}
          </ActionButton>
        </>
      )}
    </FlexColumnCenter>
  );
}
