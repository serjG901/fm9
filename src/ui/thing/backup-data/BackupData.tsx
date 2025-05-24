import "./style.css";
import { useEffect, useState } from "react";
import { useBuysStore } from "../../../store/buysStore";
import { useCreditsStore } from "../../../store/creditsStore";
import { useDebetsStore } from "../../../store/debetsStore";
import { usePaysStore } from "../../../store/paysStore";
import { useBasesStore } from "../../../store/basesStore";
import { name as appName } from "../../../../package.json";
import { useSettingsStore } from "../../../store/settingsStore";
import getDefaultDatetime from "../../../helpers/getDefaultDatetime";

export default function BackupData() {
  const [getStateBuys] = useBuysStore((state) => [state.getState]);
  const [getStatePays] = usePaysStore((state) => [state.getState]);
  const [getStateDebets] = useDebetsStore((state) => [state.getState]);
  const [getStateCredits] = useCreditsStore((state) => [state.getState]);
  const [getStateSettings, autoBackup, backupWhenStart] = useSettingsStore(
    (state) => [state.getState, state.autoBackup, state.backupWhenStart]
  );

  const [currentBase] = useBasesStore((state) => [state.currentBase]);

  const getExistDB = () => ({
    [`${appName}-buys`]: getStateBuys(),
    [`${appName}-pays`]: getStatePays(),
    [`${appName}-debets`]: getStateDebets(),
    [`${appName}-credits`]: getStateCredits(),
    [`${appName}-settings`]: getStateSettings(),
  });

  const [backupTime, setBackupTime] = useState(Date.now());

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
      }-backup-${getDefaultDatetime()}.json`
    );
    aDownloadFile!.click();
  }

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (autoBackup !== "0") {
      setTimeout(
        () => {
          saveAsLegacy();
          setBackupTime(Date.now());
        },
        +autoBackup * 60000,
        { signal }
      );
    }
    return () => {
      controller.abort();
    };
  }, [autoBackup, backupTime]);

  useEffect(() => {
    if (backupWhenStart) {
      saveAsLegacy();
    }
  }, []);

  return (
    <div className='backup-data'>
      <a id='aDownloadFile' download></a>
    </div>
  );
}
