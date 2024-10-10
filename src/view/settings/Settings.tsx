import Page from "../../ui/atom/page/Page";
import { useSettingsStore } from "../../store/settingsStore";

export default function Settings() {
  const [hue, setHue] = useSettingsStore((state) => [state.hue, state.setHue]);

  const handleChangeHue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHue(e.target.value);
  };

  return (
    <Page>
      <label htmlFor='change-hue'>
        <div>change main color</div>
        <div>
          <input
            id='change-hue'
            min={0}
            max={360}
            type='range'
            value={hue}
            onChange={handleChangeHue}
          />
        </div>
      </label>
    </Page>
  );
}
