import "./style.css";
import { useState } from "react";
import InputText from "../../atom/input-text/InputText";
import InputNumber from "../../atom/input-number/InputNumber";
import InputWithOptions from "../../atom/input-with-options/InputWithOptions";
import ActionButton from "../../atom/action-button/ActionButton";
import FlexColumnCenter from "../../atom/flex-column-center/FlexColumnCenter";

interface FormSourceComponent {
  actionType?: string;
  actionSource?: (name: string, amount: string, currency: string) => void;
  source?: {
    name: string;
    amount: string;
    currency: string;
  };
}

export default function FormSource({
  actionType = "action",
  actionSource = () => {},
  source = { name: "", amount: "", currency: "BYN" },
}: FormSourceComponent) {
  const [sourceName, setSourceName] = useState(source.name);
  const [sourceAmount, setSourceAmount] = useState(source.amount);
  const [sourceCurrency, setSourceCurrency] = useState(source.currency);

  const handleActionSource = () => {
    actionSource(sourceName, sourceAmount, sourceCurrency);
  };

  return (
    <FlexColumnCenter>
      <InputText
        id='source-name'
        name='name'
        valueFromParent={sourceName}
        hoistValue={setSourceName}
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
        options={["BYN", "USD", "EUR", "RUB"]}
        valueFromParent={sourceCurrency}
        hoistValue={setSourceCurrency}
      />
      <ActionButton actionWithPayload={handleActionSource}>
        {actionType}
      </ActionButton>
    </FlexColumnCenter>
  );
}
