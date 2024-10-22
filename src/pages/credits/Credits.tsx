import "./style.css";
import { useCreditsStore } from "../../store/creditsStore";
import Sources from "../../view/sources/Sources";
import { TextesByLanguage } from "../../interfaces";
import upperFirstLetter from "../../helpers/upperFirstLetter";

export default function Credits({ textes = {} }: TextesByLanguage) {
  return (
    <Sources
      textes={textes}
      sourcesType={
        textes["credits"] ? upperFirstLetter(textes["credits"]) : "Credits"
      }
      useSourcesStore={useCreditsStore}
    />
  );
}
