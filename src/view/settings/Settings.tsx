import "./style.css";
import Page from "../../ui/atom/page/Page";
import { useSettingsStore } from "../../store/settingsStore";
import InputRange from "../../ui/atom/input-range/InputRange";
import LoadDb from "../../ui/thing/load-db/LoadDb";
import { useBuysStore } from "../../store/buysStore";
import { usePaysStore } from "../../store/paysStore";
import HighlightText from "../../ui/atom/highlight-text/HighlightText";
import hslToRgb from "../../helpers/hslToRgb";
import ChangeBase from "../../ui/thing/changeBase/ChangeBase";
import FlexColumnCenter from "../../ui/atom/flex-column-center/FlexColumnCenter";
import Currencies from "../../ui/thing/currencies/Currencies";

export default function Settings() {
  const [
    hue,
    setHue,
    defaultCurrency,
    setDefaultCurrency,
    currencies,
    addCurrency,
    deleteCurrency,
  ] = useSettingsStore((state) => [
    state.hue,
    state.setHue,
    state.defaultCurrency,
    state.setDefaultCurrency,
    state.currencies,
    state.addCurrency,
    state.deleteCurrency,
  ]);
  const [itemsPerPageBuys, setItemsPerPageBuys] = useBuysStore((state) => [
    state.itemsPerPage,
    state.setItemsPerPage,
  ]);
  const [itemsPerPagePays, setItemsPerPagePays] = usePaysStore((state) => [
    state.itemsPerPage,
    state.setItemsPerPage,
  ]);

  return (
    <Page>
      <div className='settings-view'>
        <FlexColumnCenter>
          <h1>Settings</h1>
          <hr />
          <div>
            <h2>Colors</h2>
            <div>
              main color:{" "}
              <HighlightText bgColor={hslToRgb(+hue, 100, 20)} padding>
                {hslToRgb(+hue, 100, 20)}
              </HighlightText>
            </div>
            <InputRange
              id='change-hue'
              name='change main color'
              min={0}
              max={360}
              valueFromParent={hue}
              hoistValue={setHue}
            />
          </div>
          <hr />
          <div>
            <h2>Currencies</h2>
            <Currencies
              defaultCurrency={defaultCurrency}
              setDefaultCurrency={setDefaultCurrency}
              currencies={currencies}
              addCurrency={addCurrency}
              deleteCurrency={deleteCurrency}
            />
          </div>
          <hr />
          <div>
            <h2>Items per payments page</h2>
            <div>
              <div>items per Buys page: {itemsPerPageBuys}</div>
              <InputRange
                id='items-per-page'
                name='set items per Buys page'
                min={10}
                max={100}
                step={10}
                valueFromParent={itemsPerPageBuys}
                hoistValue={setItemsPerPageBuys}
              />
            </div>
            <div>
              <div>items per Pays page: {itemsPerPagePays}</div>
              <InputRange
                id='items-per-page'
                name='set items per Pays page'
                min={10}
                max={100}
                step={10}
                valueFromParent={itemsPerPagePays}
                hoistValue={setItemsPerPagePays}
              />
            </div>
          </div>
          <hr />
          <ChangeBase />
          <hr />
          <LoadDb />
        </FlexColumnCenter>
      </div>
    </Page>
  );
}
