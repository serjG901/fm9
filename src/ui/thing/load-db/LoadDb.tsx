import { ChangeEvent, useEffect, useState } from "react";
import { useBuysStore } from "../../../store/buysStore";
import { useCreditsStore } from "../../../store/creditsStore";
import { useDebetsStore } from "../../../store/debetsStore";
import { usePaysStore } from "../../../store/paysStore";
import ActionButton from "../../atom/action-button/ActionButton";
import "./style.css";
import { useBasesStore } from "../../../store/basesStore";
import { name as appName } from "../../../../package.json";

export default function LoadDb() {
  const [stateBuys, setStateBuys] = useBuysStore((state) => [
    state,
    state.setState,
  ]);
  const [statePays, setStatePays] = usePaysStore((state) => [
    state,
    state.setState,
  ]);
  const [stateDebets, setStateDebets] = useDebetsStore((state) => [
    state,
    state.setState,
  ]);
  const [stateCredits, setStateCredits] = useCreditsStore((state) => [
    state,
    state.setState,
  ]);

  const [currentBase] = useBasesStore((state) => [state.currentBase]);

  const [uploadStatus, setUploadStatus] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    setClickCount(clickCount + 1);
  };

  const fm9DB = {
    [`${appName}-buys`]: stateBuys,
    [`${appName}-pays`]: statePays,
    [`${appName}-debets`]: stateDebets,
    [`${appName}-credits`]: stateCredits,
  };

  function saveAsLegacy() {
    const aDownloadFile: HTMLAnchorElement = document.getElementById(
      "aDownloadFile"
    ) as HTMLAnchorElement;
    const opts = { type: "application/json" };
    const file = new File([JSON.stringify(fm9DB, null, 4)], "", opts);

    aDownloadFile!.href = window.URL.createObjectURL(file);
    aDownloadFile!.setAttribute("download", `fm9${Date.now()}.json`);
    aDownloadFile!.click();
  }

  const handleDownloadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    handleClick();
    const file = e.target.files![0];
    const contents = await file.text();
    const fm9DB = JSON.parse(contents);
    Object.keys(fm9DB).forEach((key: string) => {
      if (key === `${appName}-buys`) setStateBuys(fm9DB[key]);
      if (key === `${appName}-pays`) setStatePays(fm9DB[key]);
      if (key === `${appName}-debets`) setStateDebets(fm9DB[key]);
      if (key === `${appName}-credits`) setStateCredits(fm9DB[key]);
    });
    setUploadStatus(true);
  };

  useEffect(() => {
    setUploadStatus(false);
  }, [clickCount]);

  useEffect(() => {
    let timer = 0;
    if (uploadStatus) timer = setTimeout(() => setUploadStatus(false), 5000);
    return () => clearTimeout(timer);
  }, [uploadStatus]);

  return (
    <div className='load-db'>
      <h2>Load DB</h2>
      <div>
        <ActionButton actionWithPayload={saveAsLegacy}>
          download DB{currentBase && ` from ${currentBase.name}`}
        </ActionButton>
        <a id='aDownloadFile' download></a>
      </div>
      <div className='input-file'>
        <label htmlFor='oldOpenFile'>
          <span>upload DB{currentBase && ` for ${currentBase.name}`}</span>
          <input
            name='oldOpenFile'
            type='file'
            title='file'
            accept='.json'
            onChange={handleDownloadFile}
          />
        </label>
      </div>
      {uploadStatus ? (
        <div className='load-db-upload-status'>
          <hr color='lime' />
          <div>DB uploaded</div>
        </div>
      ) : null}
    </div>
  );
}
