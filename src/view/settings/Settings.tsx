import Page from "../../ui/atom/page/Page";
import { useSettingsStore } from "../../store/settingsStore";
import InputRange from "../../ui/atom/input-range/InputRange";
import LoadDb from "../../ui/thing/load-db/LoadDb";

export default function Settings() {
  const [hue, setHue] = useSettingsStore((state) => [state.hue, state.setHue]);

  return (
    <Page>
      <h1>Settings</h1>
      <InputRange
        id='change-hue'
        name='change main color'
        min={0}
        max={360}
        valueFromParent={hue}
        hoistValue={setHue}
      />
      <LoadDb />
    </Page>
  );
}
