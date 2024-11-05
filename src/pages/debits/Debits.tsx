import "./style.css";
import { useDebetsStore } from "../../store/debetsStore";
import Sources from "../../view/sources/Sources";
import { TextesByLanguage } from "../../interfaces";
import upperFirstLetter from "../../helpers/upperFirstLetter";

export default function Debits({ textes = {} }: TextesByLanguage) {
  return (
    <Sources
      textes={textes}
      sourcesType={
        textes["debits"] ? upperFirstLetter(textes["debits"]) : "Debits"
      }
      useSourcesStore={useDebetsStore}
    />
  );
}
