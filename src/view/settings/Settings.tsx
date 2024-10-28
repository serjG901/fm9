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
import Languages from "../../ui/thing/languages/Languages";
import { useLanguageStore } from "../../store/languageStore";
import { TextesByLanguage } from "../../interfaces";
import upperFirstLetter from "../../helpers/upperFirstLetter";

export default function Settings({ textes = {} }: TextesByLanguage) {
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
  const [currentLanguage, languages, setCurrentLanguage] = useLanguageStore(
    (state) => [
      state.currentLanguage,
      state.languages,
      state.setCurrentLanguage,
    ]
  );

  return (
    <Page>
      <div className='settings-view'>
        <FlexColumnCenter>
          <h1>
            {textes["settings"]
              ? upperFirstLetter(textes["settings"])
              : "Settings"}
          </h1>
          <hr />
          <div>
            <h2>
              {textes["colors"] ? upperFirstLetter(textes["colors"]) : "Colors"}
            </h2>
            <div>
              {textes["main_color"] || "main color"}:{" "}
              <HighlightText bgColor={hslToRgb(+hue, 100, 20)} padding>
                {hslToRgb(+hue, 100, 20)}
              </HighlightText>
            </div>
            <InputRange
              id='change-hue'
              name={textes["change_main_color"] || "change main color"}
              min={0}
              max={360}
              valueFromParent={hue}
              hoistValue={setHue}
            />
          </div>
          <hr />
          <div>
            <h2>
              {textes["languages"]
                ? upperFirstLetter(textes["languages"])
                : "Languages"}
            </h2>
            <Languages
              textes={textes}
              currentLanguage={currentLanguage}
              languages={languages}
              setCurrentLanguage={setCurrentLanguage}
            />
          </div>
          <hr />
          <div>
            <h2>
              {textes["currencies"]
                ? upperFirstLetter(textes["currencies"])
                : "Currencies"}
            </h2>
            <Currencies
              textes={textes}
              defaultCurrency={defaultCurrency}
              setDefaultCurrency={setDefaultCurrency}
              currencies={currencies}
              addCurrency={addCurrency}
              deleteCurrency={deleteCurrency}
            />
          </div>
          <hr />
          <div>
            <h2>
              {textes["the_number_of_elements_per_payments_page"]
                ? upperFirstLetter(
                    textes["the_number_of_elements_per_payments_page"]
                  )
                : "The number of elements per payments page"}
            </h2>
            <FlexColumnCenter>
              <div>
                <div>
                  {textes["buys"] ? upperFirstLetter(textes["buys"]) : "Buys"}:{" "}
                  {itemsPerPageBuys}
                </div>
                <InputRange
                  id='items-per-buys-page'
                  name={
                    textes["set_the_number_of_elements"] ||
                    "set the number of elements"
                  }
                  min={10}
                  max={100}
                  step={10}
                  valueFromParent={itemsPerPageBuys}
                  hoistValue={setItemsPerPageBuys}
                />
              </div>
              <div>
                <div>
                  {textes["pays"] ? upperFirstLetter(textes["pays"]) : "Pays"}:{" "}
                  {itemsPerPagePays}
                </div>
                <InputRange
                  id='items-per-pays-page'
                  name={
                    textes["set_the_number_of_elements"] ||
                    "set the number of elements"
                  }
                  min={10}
                  max={100}
                  step={10}
                  valueFromParent={itemsPerPagePays}
                  hoistValue={setItemsPerPagePays}
                />
              </div>
            </FlexColumnCenter>
          </div>
          <hr />
          <div>
            <h2>
              {textes["manage_base"]
                ? upperFirstLetter(textes["manage_base"])
                : "Manage Base"}
            </h2>
            <ChangeBase textes={textes} />
          </div>
          <hr />
          <div>
            <h2>
              {textes["manage_data"]
                ? upperFirstLetter(textes["manage_data"])
                : "Manage data"}
            </h2>
            <LoadDb textes={textes} />
          </div>
        </FlexColumnCenter>
      </div>
    </Page>
  );
}
