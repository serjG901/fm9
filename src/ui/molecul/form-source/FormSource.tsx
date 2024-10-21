import "./style.css";
import { useState } from "react";
import InputText from "../../atom/input-text/InputText";
import InputNumber from "../../atom/input-number/InputNumber";
import InputWithOptions from "../../atom/input-with-options/InputWithOptions";
import ActionButton from "../../atom/action-button/ActionButton";
import FlexColumnCenter from "../../atom/flex-column-center/FlexColumnCenter";
import { Source } from "../../../interfaces";

interface FormSourceComponent {
  actionType?: string;
  actionSource?: (source: Source) => void;
  source?: Source;
  deleteSource?: (source: Source) => void;
  sources?: Source[];
  defaultCurrency?: string;
  currencies?: string[];
}

export default function FormSource({
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
    actionSource({
      name: sourceName,
      amount: sourceAmount,
      currency: sourceCurrency,
      id: source.id,
    });
  };

  const handleDeleteSource = () => {
    const agree = confirm("delete?");
    if (agree) {
      deleteSource(source);
    }
  };

  return (
    <FlexColumnCenter>
      <InputText
        id='source-name'
        name='name'
        valueFromParent={sourceName}
        hoistValue={setSourceName}
        noValidValues={sources.map((s) => s.name)}
      />
      <InputNumber
        id='source-amount'
        name='amount'
        valueFromParent={sourceAmount}
        hoistValue={setSourceAmount}
      />
      <InputWithOptions
        id='source-currency'
        name='currency'
        options={currencies}
        valueFromParent={sourceCurrency}
        hoistValue={setSourceCurrency}
      />
      <ActionButton actionWithPayload={handleActionSource}>
        {actionType}
      </ActionButton>
      {actionType === "update" && (
        <>
          <br />
          <ActionButton actionWithPayload={handleDeleteSource} alert={true}>
            delete
          </ActionButton>
        </>
      )}
    </FlexColumnCenter>
  );
}
