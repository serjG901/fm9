import "./style.css";
import Grid from "../../atom/grid/Grid";
import Contents from "../../atom/contents/Contents";
import { TextesByLanguage } from "../../../interfaces";
import InputRadio from "../../atom/input-radio/InputRadio";

interface LanguagesComponent extends TextesByLanguage {
  currentLanguage?: string;
  setCurrentLanguage?: (defaultCurrency: string) => void;
  languages?: string[];
}

export default function Languages({
  textes = {},
  currentLanguage = "en",
  setCurrentLanguage = () => {},
  languages = ["en", "by"],
}: LanguagesComponent) {
  return (
    <div className='languages'>
      <Grid columns={2}>
        {languages.map((l) => {
          return (
            <Contents key={l}>
              <InputRadio
                id={l}
                name='languages'
                setValue={setCurrentLanguage}
                defaultValue={currentLanguage}
              />
              <span>
                {l === currentLanguage ? textes["current"] || "current" : ""}
              </span>
            </Contents>
          );
        })}
      </Grid>
    </div>
  );
}
