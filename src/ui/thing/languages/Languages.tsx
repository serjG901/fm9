import "./style.css";
import FlexWrap from "../../atom/flex-wrap/FlexWrap";
import FlexColumnCenter from "../../atom/flex-column-center/FlexColumnCenter";

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
      <FlexWrap
        childrenArray={languages.map((l) => {
          return (
            <FlexColumnCenter>
              <label htmlFor='language'>
                {l === currentLanguage ? <span>current</span> : null}
                <input
                  type='radio'
                  id={l}
                  name='language'
                  defaultChecked={l === currentLanguage}
                  checked={l === currentLanguage}
                  onChange={() => setCurrentLanguage(l)}
                />
              </label>
              <span>{l}</span>
            </FlexColumnCenter>
          );
        })}
      />
    </div>
  );
}
