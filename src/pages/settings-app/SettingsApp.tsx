import { TextesByLanguage } from "../../interfaces";
import Settings from "../../view/settings/Settings";

export default function SettingsApp({ textes = {} }: TextesByLanguage) {
  return <Settings textes={textes} />;
}
