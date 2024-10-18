import { ChangeEvent, useEffect, useState } from "react";
import { useBuysStore } from "../../../store/buysStore";
import { useCreditsStore } from "../../../store/creditsStore";
import { useDebetsStore } from "../../../store/debetsStore";
import { usePaysStore } from "../../../store/paysStore";
import ActionButton from "../../atom/action-button/ActionButton";
import "./style.css";
import { useBasesStore } from "../../../store/basesStore";
import { name as appName } from "../../../../package.json";
import { useSettingsStore } from "../../../store/settingsStore";

export default function LoadDb() {
  const [getStateBuys, setStateBuys] = useBuysStore((state) => [
    state.getState,
    state.setState,
  ]);
  const [getStatePays, setStatePays] = usePaysStore((state) => [
    state.getState,
    state.setState,
  ]);
  const [getStateDebets, setStateDebets] = useDebetsStore((state) => [
    state.getState,
    state.setState,
  ]);
  const [getStateCredits, setStateCredits] = useCreditsStore((state) => [
    state.getState,
    state.setState,
  ]);
  const [getStateSettings, setStateSettings] = useSettingsStore((state) => [
    state.getState,
    state.setState,
  ]);

  const [currentBase] = useBasesStore((state) => [state.currentBase]);

  const [uploadStatus, setUploadStatus] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    setClickCount(clickCount + 1);
  };

  const getExistDB = () => ({
    [`${appName}-buys`]: getStateBuys(),
    [`${appName}-pays`]: getStatePays(),
    [`${appName}-debets`]: getStateDebets(),
    [`${appName}-credits`]: getStateCredits(),
    [`${appName}-settings`]: getStateSettings(),
  });

  function saveAsLegacy() {
    const aDownloadFile: HTMLAnchorElement = document.getElementById(
      "aDownloadFile"
    ) as HTMLAnchorElement;
    const opts = { type: "application/fm9" };
    const file = new File([JSON.stringify(getExistDB(), null, 4)], "", opts);

    aDownloadFile!.href = window.URL.createObjectURL(file);
    aDownloadFile!.setAttribute(
      "download",
      `fm9-${currentBase?.name || "default"}-${Date.now()}.fm9`
    );
    aDownloadFile!.click();
  }

  const handleDownloadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    handleClick();
    const file = e.target.files![0];
    const contents = await file.text();
    const db = JSON.parse(contents);
    Object.keys(db).forEach((key: string) => {
      if (key === `${appName}-buys`) setStateBuys(db[key]);
      if (key === `${appName}-pays`) setStatePays(db[key]);
      if (key === `${appName}-debets`) setStateDebets(db[key]);
      if (key === `${appName}-credits`) setStateCredits(db[key]);
      if (key === `${appName}-settings`) setStateSettings(db[key]);
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

      {uploadStatus ? (
        <div className='load-db-upload-status'>
          <hr color='lime' />
          <div>DB uploaded</div>
        </div>
      ) : (
        <div className='input-file'>
          <label htmlFor='oldOpenFile'>
            <span>upload DB{currentBase && ` for ${currentBase.name}`}</span>
            <input
              name='oldOpenFile'
              type='file'
              title='file'
              accept='.fm9'
              onChange={handleDownloadFile}
            />
          </label>
        </div>
      )}
    </div>
  );
}
