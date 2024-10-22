import "./style.css";
import { useDebetsStore } from "../../store/debetsStore";
import Sources from "../../view/sources/Sources";
import { TextesByLanguage } from "../../interfaces";
import upperFirstLetter from "../../helpers/upperFirstLetter";

export default function Debets({ textes = {} }: TextesByLanguage) {
  return (
    <Sources
      textes={textes}
      sourcesType={
        textes["debets"] ? upperFirstLetter(textes["debets"]) : "Debets"
      }
      useSourcesStore={useDebetsStore}
    />
  );
}
