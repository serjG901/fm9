import { useState } from "react";
import ActionButton from "../../atom/action-button/ActionButton";
import InputText from "../../atom/input-text/InputText";
import "./style.css";
import FlexColumnCenter from "../../atom/flex-column-center/FlexColumnCenter";
import FlexWrap from "../../atom/flex-wrap/FlexWrap";

interface CurrencyComponent {
  defaultCurrency?: string;
  setDefaultCurrency?: (defaultCurrency: string) => void;
  currencies?: string[];
  addCurrency?: (currency: string) => void;
  deleteCurrency?: (currency: string) => void;
}

export default function Currencies({
  defaultCurrency = "BYN",
  setDefaultCurrency = () => {},
  currencies = ["BYN", "USD"],
  addCurrency = () => {},
  deleteCurrency = () => {},
}: CurrencyComponent) {
  const [local, setLocal] = useState("");

  const handleAddCurrency = () => {
    addCurrency(local);
  };
  return (
    <div className='currencies'>
      <FlexColumnCenter>
        {currencies.map((c) => {
          return (
            <FlexWrap
              childrenArray={[
                <label htmlFor='currency'>
                  {c === defaultCurrency ? <span>default</span> : null}
                  <input
                    type='radio'
                    id={c}
                    name='currency'
                    defaultChecked={c === defaultCurrency}
                    checked={c === defaultCurrency}
                    onChange={() => setDefaultCurrency(c)}
                  />
                </label>,
                <span>{c}</span>,
                currencies.length > 1 ? (
                  <ActionButton actionWithPayload={() => deleteCurrency(c)}>
                    delete
                  </ActionButton>
                ) : null,
              ]}
            />
          );
        })}
      </FlexColumnCenter>
      <br />
      <FlexColumnCenter>
        <InputText
          noValidValues={currencies}
          name='new currency'
          valueFromParent={local}
          hoistValue={setLocal}
        />
        <ActionButton actionWithPayload={handleAddCurrency}>
          add currency
        </ActionButton>
      </FlexColumnCenter>
    </div>
  );
}
