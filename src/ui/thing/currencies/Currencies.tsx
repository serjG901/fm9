import { useState } from "react";
import ActionButton from "../../atom/action-button/ActionButton";
import InputText from "../../atom/input-text/InputText";
import "./style.css";
import FlexColumnCenter from "../../atom/flex-column-center/FlexColumnCenter";
import Grid from "../../atom/grid/Grid";
import Contents from "../../atom/contents/Contents";
import { TextesByLanguage } from "../../../interfaces";
import Collapse from "../../atom/collapse/Collapse";

interface CurrencyComponent extends TextesByLanguage {
  defaultCurrency?: string;
  setDefaultCurrency?: (defaultCurrency: string) => void;
  currencies?: string[];
  addCurrency?: (currency: string) => void;
  deleteCurrency?: (currency: string) => void;
}

export default function Currencies({
  textes = {},
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
    const agree = confirm(
      `${textes["delete_currency"] || "delete currency"} ${c}?`
    );
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
              <label
                htmlFor={c}
                tabIndex={0}
                onKeyDown={(e) =>
                  e.code === "Space" &&
                  (e.preventDefault(), e.stopPropagation())
                }
                onKeyUp={(e) => (
                  console.log(e),
                  e.code === "Space" &&
                    (e.preventDefault(),
                    e.stopPropagation(),
                    setDefaultCurrency(c))
                )}
              >
                <span>{c}</span>
                <input
                  type='radio'
                  id={c}
                  name='currency'
                  checked={c === defaultCurrency}
                  onChange={() => setDefaultCurrency(c)}
                />
              </label>
              {c === defaultCurrency ? (
                <span>{textes["default"] || "default"}</span>
              ) : (
                <span></span>
              )}
              {currencies.length > 1 ? (
                <ActionButton
                  actionWithPayload={handleDeleteCurrency}
                  payload={c}
                  alert
                >
                  {textes["delete"] || "delete"}
                </ActionButton>
              ) : null}
            </Contents>
          );
        })}
      </Grid>

      <Collapse
        title={textes["add_currency"] || "add currency"}
        collapseLevel='settings'
      >
        <FlexColumnCenter>
          <InputText
            noValidValues={currencies}
            name={textes["new_currency"] || "new currency"}
            valueFromParent={local}
            hoistValue={setLocal}
          />
          <ActionButton actionWithPayload={handleAddCurrency}>
            {textes["add_currency"] || "add currency"}
          </ActionButton>
        </FlexColumnCenter>
      </Collapse>
    </div>
  );
}
