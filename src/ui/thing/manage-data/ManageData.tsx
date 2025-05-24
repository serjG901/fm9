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
import { TextesByLanguage } from "../../../interfaces";
import upperFirstLetter from "../../../helpers/upperFirstLetter";
import getDefaultDatetime from "../../../helpers/getDefaultDatetime";
import InputRange from "../../atom/input-range/InputRange";
import Checked from "../../atom/checked/Checked";

export default function ManageData({ textes = {} }: TextesByLanguage) {
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
  const [
    getStateSettings,
    setStateSettings,
    autoBackup,
    setAutoBackup,
    backupWhenStart,
    setBackupWhenStart,
  ] = useSettingsStore((state) => [
    state.getState,
    state.setState,
    state.autoBackup,
    state.setAutoBackup,
    state.backupWhenStart,
    state.setBackupWhenStart,
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
      `${appName}-${
        currentBase?.name || "default"
      }-${getDefaultDatetime()}.json`
    );
    aDownloadFile!.click();
  }

  const handleUploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
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
      <div>
        <Checked
          valueFromParent={backupWhenStart}
          hoistValue={setBackupWhenStart}
          name={
            textes["set_auto_backup_when_start"] ||
            "auto backup data when start app"
          }
        />
      </div>
      <div>
        <InputRange
          id='change-autobackup'
          name={
            textes["change_auto_backup_timer"] ||
            "change auto backup data timer"
          }
          min={0}
          max={120}
          step={10}
          valueFromParent={autoBackup}
          hoistValue={setAutoBackup}
        />
        <div>
          {textes["auto_backup_timeout"] || "auto backup timeout"}:{" "}
          {autoBackup !== "0"
            ? `${autoBackup} ${textes["minutes"] || "minutes"}`
            : textes["not"] || "not"}
        </div>
      </div>

      <div>
        <ActionButton actionWithPayload={saveAsLegacy}>
          {textes["download_data"] || "download data"}{" "}
          <span className='load-db-base-name'>
            {currentBase && currentBase.name}
          </span>
        </ActionButton>
        <a id='aDownloadFile' download></a>
      </div>

      {uploadStatus ? (
        <div className='load-db-upload-status'>
          <hr color='lime' />
          <div>
            {textes["data_uploaded"]
              ? upperFirstLetter(textes["data_uploaded"])
              : "Data uploaded"}
          </div>
        </div>
      ) : (
        <div className='input-file'>
          <label htmlFor='oldOpenFile'>
            <span>
              {textes["upload_data"] || "upload data"}{" "}
              {currentBase && (
                <>
                  <span>{textes["for"] || "for"}</span>{" "}
                  <span className='input-file-base-name'>
                    {currentBase.name}
                  </span>
                </>
              )}
            </span>
            <input
              id='oldOpenFile'
              name='oldOpenFile'
              type='file'
              title='file'
              accept='.json'
              onChange={handleUploadFile}
            />
          </label>
        </div>
      )}
    </div>
  );
}
