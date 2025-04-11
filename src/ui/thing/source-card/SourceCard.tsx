import { useState } from "react";
import { defaultSource, Source, TextesByLanguage } from "../../../interfaces";
import Contents from "../../atom/contents/Contents";
import FlexColumnCenter from "../../atom/flex-column-center/FlexColumnCenter";
import UpdateSource from "../../substance/update-source/UpdateSource";
import "./style.css";

interface SourceCardComponent extends TextesByLanguage {
  source?: Source;
  updateSource?: (source: Source) => void;
  deleteSource?: (source: Source) => void;
  sources?: Source[];
  currencies?: string[];
  defaultHue?: string;
}

export default function SourceCard({
  textes = {},
  source = defaultSource,
  updateSource = () => {},
  deleteSource = () => {},
  sources = [],
  currencies = [],
  defaultHue = "",
}: SourceCardComponent) {
  const [isShow, setIsShow] = useState(false);
  const showModal = () => {
    const modalId = document.getElementById(`update-source-${source.id}`);
    modalId?.showPopover();
    setIsShow(true);
  };
  return (
    <Contents
      style={
        {
          "--hue-self": source.hueAsDefault ? defaultHue : source.hue,
        } as React.CSSProperties
      }
    >
      <button className='source-card' key={source.id} onClick={showModal}>
        <FlexColumnCenter>
          <div className='source-card-name'>{source.name}</div>
          <div className='source-card-amount'>{source.amount}</div>
          <div className='source-card-currency'>{source.currency}</div>
          <UpdateSource
            textes={textes}
            source={source}
            updateSource={updateSource}
            deleteSource={deleteSource}
            sources={sources}
            currencies={currencies}
            defaultHue={defaultHue}
            isShow={isShow}
            setIsShow={setIsShow}
          />
        </FlexColumnCenter>
      </button>
    </Contents>
  );
}
