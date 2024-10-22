import { useState } from "react";
import ActionButton from "../../atom/action-button/ActionButton";
import InputText from "../../atom/input-text/InputText";
import "./style.css";
import FlexColumnCenter from "../../atom/flex-column-center/FlexColumnCenter";
import Grid from "../../atom/grid/Grid";
import Contents from "../../atom/contents/Contents";

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

  const handleDeleteCurrency = (c: string) => {
    const agree = confirm(`delete currency ${c}?`);
    if (agree) {
      deleteCurrency(c);
    }
  };

  return (
    <div className='currencies'>
      <Grid>
        {currencies.map((c) => {
          return (
            <Contents key={c}>
              <label htmlFor={c}>
                <span>{c}</span>
                <input
                  type='radio'
                  id={c}
                  name='currency'
                  checked={c === defaultCurrency}
                  onChange={() => setDefaultCurrency(c)}
                />
              </label>
              {c === defaultCurrency ? <span>default</span> : <span></span>}
              {currencies.length > 1 ? (
                <ActionButton
                  actionWithPayload={handleDeleteCurrency}
                  payload={c}
                  alert
                >
                  delete
                </ActionButton>
              ) : null}
            </Contents>
          );
        })}
      </Grid>
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
