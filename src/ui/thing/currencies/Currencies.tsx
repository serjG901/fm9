import { useState } from "react";
import ActionButton from "../../atom/action-button/ActionButton";
import InputText from "../../atom/input-text/InputText";
import "./style.css";
import FlexColumnCenter from "../../atom/flex-column-center/FlexColumnCenter";
import Grid from "../../atom/grid/Grid";
import Contents from "../../atom/contents/Contents";
import { TextesByLanguage } from "../../../interfaces";
import Collapse from "../../atom/collapse/Collapse";
import InputRadio from "../../atom/input-radio/InputRadio";

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
              <InputRadio
                id={c}
                name="currencies"
                setValue={setDefaultCurrency}
                defaultValue={defaultCurrency}
              />
              <span>
                {c === defaultCurrency ? textes["default"] || "default" : ""}
              </span>
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
