import "./style.css";
import { useEffect, useState } from "react";
import InputText from "../../atom/input-text/InputText";
import InputNumber from "../../atom/input-number/InputNumber";
import InputWithOptions from "../../atom/input-with-options/InputWithOptions";
import ActionButton from "../../atom/action-button/ActionButton";
import FlexColumnCenter from "../../atom/flex-column-center/FlexColumnCenter";
import { Source, TextesByLanguage } from "../../../interfaces";
import InputRange from "../../atom/input-range/InputRange";
import Checked from "../../atom/checked/Checked";

interface FormSourceComponent extends TextesByLanguage {
  actionType?: string;
  actionSource?: (source: Source) => void;
  source?: Source;
  deleteSource?: (source: Source) => void;
  sources?: Source[];
  defaultCurrency?: string;
  currencies?: string[];
  defaultHue?: string;
  setHueSelf?: (hueSelf: string) => void;
}

export default function FormSource({
  textes = {},
  actionType = "action",
  actionSource = () => {},
  source = {
    id: 0,
    name: "",
    amount: "",
    currency: "",
    hue: "",
    alwaysOnTop: false,
  },
  deleteSource = () => {},
  sources = [],
  defaultCurrency = "",
  currencies = [],
  defaultHue = "",
  setHueSelf = () => {},
}: FormSourceComponent) {
  const [sourceName, setSourceName] = useState(source.name);
  const [sourceAmount, setSourceAmount] = useState(source.amount);
  const [sourceCurrency, setSourceCurrency] = useState(
    source.id === 0 ? defaultCurrency : source.currency
  );
  const [sourceHue, setSourceHue] = useState(
    source.id === 0 ? defaultHue : source.hue || defaultHue
  );
  const [sourceAlwaysOnTop, setSourceAlwaysOnTop] = useState(
    source.alwaysOnTop
  );

  const handleActionSource = () => {
    if (!(isNaN(+sourceAmount) || +sourceAmount < 0)) {
      actionSource({
        name: sourceName,
        amount: sourceAmount || "0",
        currency: sourceCurrency,
        hue: sourceHue,
        alwaysOnTop: sourceAlwaysOnTop,
        id: source.id,
      });
      setSourceHue(defaultHue);
    }
  };

  const handleDeleteSource = () => {
    const agree = confirm(`${textes["delete"]}?`);
    if (agree) {
      deleteSource(source);
    }
  };

  useEffect(() => {
    setHueSelf(sourceHue);
  }, [sourceHue]);

  return (
    <FlexColumnCenter>
      <InputText
        id={`${actionType === "update" ? "update-" : ""}source-name-${
          source.id
        }`}
        name={textes["name"] || "name"}
        valueFromParent={sourceName}
        hoistValue={setSourceName}
        noValidValues={sources
          .filter((s) => s.id !== source.id)
          .map((s) => s.name)}
      />
      <InputNumber
        id={`${actionType === "update" ? "update-" : ""}source-amount-${
          source.id
        }`}
        name={textes["amount"] || "amount"}
        valueFromParent={sourceAmount}
        hoistValue={setSourceAmount}
      />
      <InputWithOptions
        id={`${actionType === "update" ? "update-" : ""}source-currency-${
          source.id
        }`}
        name={textes["currency"] || "currency"}
        options={currencies}
        valueFromParent={sourceCurrency}
        hoistValue={setSourceCurrency}
      />

      <InputRange
        id={`${actionType === "update" ? "update-" : ""}source-hue-${
          source.id
        }`}
        name={textes["color"] || "color"}
        min={0}
        max={360}
        valueFromParent={sourceHue}
        hoistValue={setSourceHue}
        onlySelfChange={true}
      />
      <Checked
        id={`${actionType === "update" ? "update-" : ""}source-always-on-top-${
          source.id
        }`}
        name={textes["always_on_top"] || "always on top"}
        valueFromParent={Boolean(sourceAlwaysOnTop)}
        hoistValue={setSourceAlwaysOnTop}
      />
      <br />
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
