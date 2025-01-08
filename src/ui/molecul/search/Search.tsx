import { useEffect, useRef, useState } from "react";
import ActionButton from "../../atom/action-button/ActionButton";
import Cross from "../../atom/cross/Cross";
import InputText from "../../atom/input-text/InputText";
import "./style.css";
import { TextesByLanguage } from "../../../interfaces";

interface SearchComponent extends TextesByLanguage {
  search?: string;
  setSearch?: (search: string) => void;
}

export default function Search({
  textes = {},
  search = "",
  setSearch = () => {},
}: SearchComponent) {
  const [state, setState] = useState(search);

  const timer = useRef(0);

  const handleClearSearch = () => {
    setState("");
  };

  useEffect(() => {
    clearTimeout(timer.current);
    if (state !== search) {
      const timerId = setTimeout(() => setSearch(state), 300);
      timer.current = timerId;
    }
  }, [state]);

  useEffect(() => {
    if (state !== search) setState(search);
  }, [search]);

  return (
    <div className='search'>
      <InputText
        name={textes["search"] || "search"}
        valueFromParent={state}
        hoistValue={setState}
      />
      {state !== "" && (
        <div className='clear-search'>
          <ActionButton actionWithPayload={handleClearSearch} alert>
            <Cross />
          </ActionButton>
        </div>
      )}
    </div>
  );
}
