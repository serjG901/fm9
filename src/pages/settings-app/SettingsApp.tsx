import Settings from "../../view/settings/Settings";
interface SettingsAppComponent {
  hueFromParrent: number;
  hoistHue: (hue: number) => void;
}

export default function SettingsApp({
  hueFromParrent,
  hoistHue,
}: SettingsAppComponent) {
  return <Settings hueFromParrent={hueFromParrent} hoistHue={hoistHue} />;
}
