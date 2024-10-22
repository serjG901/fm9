import "./style.css";
import Grid from "../../atom/grid/Grid";
import Contents from "../../atom/contents/Contents";
import { TextesByLanguage } from "../../../interfaces";

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
              <label htmlFor={l}>
                <span>{l}</span>
                <input
                  type='radio'
                  id={l}
                  name='language'
                  checked={l === currentLanguage}
                  onChange={() => setCurrentLanguage(l)}
                />
              </label>
              {l === currentLanguage ? (
                <span>{textes["current"] || "current"}</span>
              ) : (
                <span></span>
              )}
            </Contents>
          );
        })}
      </Grid>
    </div>
  );
}
