import { useEffect, useState } from "react";
import Page from "../../ui/atom/page/Page";

interface SettingsComponent {
  hueFromParrent: number;
  hoistHue: (hue: number) => void;
}

export default function Settings({
  hueFromParrent,
  hoistHue,
}: SettingsComponent) {
  const [hue, setHue] = useState(hueFromParrent);

  const handleChangeHue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHue(+e.target.value);
  };

  useEffect(() => {
    if (hue !== hueFromParrent) hoistHue(hue);
  }, [hue]);

  useEffect(() => {
    if (hue !== hueFromParrent) setHue(hueFromParrent);
  }, [hueFromParrent]);

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
