import { TextesByLanguage } from "../../interfaces";
import Help from "../../view/help/Help";

export default function HelpApp({ textes = {} }: TextesByLanguage) {
  return <Help textes={textes} />;
}
