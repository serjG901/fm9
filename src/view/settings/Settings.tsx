import Page from "../../ui/atom/page/Page";
import { useSettingsStore } from "../../store/settingsStore";
import InputRange from "../../ui/atom/input-range/InputRange";
import LoadDb from "../../ui/thing/load-db/LoadDb";
import { useBuysStore } from "../../store/buysStore";
import { usePaysStore } from "../../store/paysStore";
import HighlightText from "../../ui/atom/highlight-text/HighlightText";
import hslToRgb from "../../helpers/hslToRgb";
import ChangeBase from "../../ui/thing/changeBase/ChangeBase";

export default function Settings() {
  const [hue, setHue] = useSettingsStore((state) => [state.hue, state.setHue]);
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
      <h1>Settings</h1>
      <div>
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

      <LoadDb />
      <ChangeBase />
    </Page>
  );
}
