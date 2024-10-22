import "./style.css";
import Grid from "../../atom/grid/Grid";
import Contents from "../../atom/contents/Contents";

interface LanguagesComponent {
  currentLanguage?: string;
  setCurrentLanguage?: (defaultCurrency: string) => void;
  languages?: string[];
}

export default function Languages({
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
              {l === currentLanguage ? <span>current</span> : <span></span>}
            </Contents>
          );
        })}
      </Grid>
    </div>
  );
}
