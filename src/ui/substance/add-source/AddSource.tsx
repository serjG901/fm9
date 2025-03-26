import "./style.css";
import { useState } from "react";
import Collapse from "../../atom/collapse/Collapse";
import FormSource from "../../molecul/form-source/FormSource";
import { NewSource, Source, TextesByLanguage } from "../../../interfaces";
import Contents from "../../atom/contents/Contents";

interface AddSourceComponent extends TextesByLanguage {
  addSource?: (newSource: NewSource) => void;
  sources?: Source[];
  defaultCurrency?: string;
  currencies?: string[];
  defaultHue?: string;
}

export default function AddSource({
  textes = {},
  addSource = () => {},
  sources = [],
  defaultCurrency = "",
  currencies = [],
  defaultHue = "",
}: AddSourceComponent) {
  const [hueSelf, setHueSelf] = useState(defaultHue);
  const setHueByDefault = () => setHueSelf(defaultHue);
  return (
    <Contents style={{ "--hue-self": hueSelf } as React.CSSProperties}>
      <Collapse
        collapseLevel='menu'
        title={textes["add"] || "add"}
        setHueByDefault={setHueByDefault}
      >
        <FormSource
          textes={textes}
          actionType='add'
          actionSource={addSource}
          sources={sources}
          defaultCurrency={defaultCurrency}
          currencies={currencies}
          defaultHue={defaultHue}
          setHueSelf={setHueSelf}
        />
      </Collapse>
    </Contents>
  );
}
