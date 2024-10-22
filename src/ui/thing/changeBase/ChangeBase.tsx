import { useEffect, useState } from "react";
import { useBuysStore } from "../../../store/buysStore";
import { useCreditsStore } from "../../../store/creditsStore";
import { useDebetsStore } from "../../../store/debetsStore";
import { usePaysStore } from "../../../store/paysStore";
import ActionButton from "../../atom/action-button/ActionButton";
import "./style.css";
import { useBasesStore } from "../../../store/basesStore";
import {
  Base,
  PaymentsStore,
  SettingsStore,
  SourcesStore,
  TextesByLanguage,
} from "../../../interfaces";
import InputText from "../../atom/input-text/InputText";
import FlexColumnCenter from "../../atom/flex-column-center/FlexColumnCenter";
import { defaultDB } from "../../../store/defaultState";
import FlexWrap from "../../atom/flex-wrap/FlexWrap";
import { name as appName } from "../../../../package.json";
import { useSettingsStore } from "../../../store/settingsStore";
import hslToRgb from "../../../helpers/hslToRgb";
import HighlightText from "../../atom/highlight-text/HighlightText";
import upperFirstLetter from "../../../helpers/upperFirstLetter";
import Collapse from "../../atom/collapse/Collapse";

export default function ChangeBase({ textes = {} }: TextesByLanguage) {
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

  const [
    bases,
    getBases,
    addBase,
    updateBase,
    currentBase,
    setCurrentBase,
    getCurrentBase,
    deleteBase,
  ] = useBasesStore((state) => [
    state.bases,
    state.getBases,
    state.addBase,
    state.updateBase,
    state.currentBase,
    state.setCurrentBase,
    state.getCurrentBase,
    state.deleteBase,
  ]);

  const [uploadStatus, setUploadStatus] = useState(false);
  const [newBaseName, setNewBaseName] = useState("");

  const [clickCount, setClickCount] = useState(0);

  const handleDown = () => {
    setClickCount(clickCount + 1);
  };

  const getExistDB = () => ({
    [`${appName}-buys`]: getStateBuys(),
    [`${appName}-pays`]: getStatePays(),
    [`${appName}-debets`]: getStateDebets(),
    [`${appName}-credits`]: getStateCredits(),
    [`${appName}-settings`]: getStateSettings(),
  });

  const handleChangeBase = (base: Base) => {
    updateBase({
      ...currentBase,
      name: currentBase?.name || "default",
      id: currentBase?.id || 0,
      db: getExistDB(),
    });
    setCurrentBase(base);
    const currentDB = getCurrentBase()?.db || null;
    if (currentDB !== null) {
      Object.keys(currentDB).forEach((key) => {
        if (key === `${appName}-buys`) {
          setStateBuys(currentDB[key] as PaymentsStore);
        }
        if (key === `${appName}-pays`) {
          setStatePays(currentDB[key] as PaymentsStore);
        }
        if (key === `${appName}-debets`) {
          setStateDebets(currentDB[key] as SourcesStore);
        }
        if (key === `${appName}-credits`) {
          setStateCredits(currentDB[key] as SourcesStore);
        }
        if (key === `${appName}-settings`)
          setStateSettings(currentDB[key] as SettingsStore);
      });
    } else {
      localStorage.removeItem(`${appName}-buys`);
      localStorage.removeItem(`${appName}-pays`);
      localStorage.removeItem(`${appName}-debets`);
      localStorage.removeItem(`${appName}-credits`);
      localStorage.removeItem(`${appName}-settings`);
      Object.keys(defaultDB).forEach((key) => {
        if (key === `${appName}-buys`)
          setStateBuys(defaultDB[key] as PaymentsStore);
        if (key === `${appName}-pays`)
          setStatePays(defaultDB[key] as PaymentsStore);
        if (key === `${appName}-debets`)
          setStateDebets(defaultDB[key] as SourcesStore);
        if (key === `${appName}-credits`)
          setStateCredits(defaultDB[key] as SourcesStore);
        if (key === `${appName}-settings`)
          setStateSettings(defaultDB[key] as SettingsStore);
      });
    }

    setUploadStatus(true);
  };

  const handleAddBase = () => {
    if (newBaseName) {
      if (!currentBase) {
        updateBase({
          name: "default",
          id: 0,
          db: getExistDB(),
        });
        setCurrentBase(getBases().find((b) => b.name === "default") || null);
      }

      addBase(newBaseName);
    }
  };

  const handleSetDefaultBase = () => {
    const defaultBase = getBases().find((b) => b.name === "default");
    if (defaultBase) {
      setCurrentBase(defaultBase);
      const currentDB = getCurrentBase()?.db || null;
      if (currentDB !== null) {
        Object.keys(currentDB).forEach((key) => {
          if (key === `${appName}-buys`) {
            setStateBuys(currentDB[key] as PaymentsStore);
          }
          if (key === `${appName}-pays`) {
            setStatePays(currentDB[key] as PaymentsStore);
          }
          if (key === `${appName}-debets`) {
            setStateDebets(currentDB[key] as SourcesStore);
          }
          if (key === `${appName}-credits`) {
            setStateCredits(currentDB[key] as SourcesStore);
          }
          if (key === `${appName}-settings`)
            setStateSettings(currentDB[key] as SettingsStore);
        });
      }

      setUploadStatus(true);
    }
  };

  const handleDeleteBase = () => {
    if (currentBase && currentBase.name !== "default") {
      const agree = confirm(
        `${
          textes["delete_base"]
            ? upperFirstLetter(textes["delete_base"])
            : "Delete base"
        } ${currentBase.name}?`
      );
      if (agree) {
        deleteBase(currentBase);
        handleSetDefaultBase();
      }
    }
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
    <div className='change-base'>
      {bases.length ? (
        <FlexWrap
          childrenArray={[
            <div className='description'>
              {textes["current_base"]
                ? upperFirstLetter(textes["current_base"])
                : "Current base"}
              :
            </div>,
            <HighlightText
              key={getCurrentBase()?.name}
              bgColor={hslToRgb(+getStateSettings().hue, 100, 20) || ""}
              padding
            >
              {getCurrentBase()?.name}
            </HighlightText>,
            currentBase && currentBase.name !== "default" ? (
              <ActionButton actionWithPayload={handleDeleteBase} alert>
                {textes["delete"] || "delete"}
              </ActionButton>
            ) : null,
          ]}
        />
      ) : null}
      {bases.length > 1 ? (
        <FlexWrap
          childrenArray={[
            <div className='description'>
              {textes["exist_bases"]
                ? upperFirstLetter(textes["exist_bases"])
                : "Exist bases"}
              :
            </div>,
            ...bases
              .filter((b) => b.name !== getCurrentBase()?.name)
              .sort((a, b) => (a.name > b.name ? 1 : -1))
              .map((base) => (
                <ActionButton
                  key={base.name}
                  actionWithPayload={handleChangeBase}
                  payload={base}
                  bgColor={hslToRgb(
                    +(base?.db[`${appName}-settings`] as SettingsStore).hue,
                    100,
                    20
                  )}
                  onDown={handleDown}
                >
                  {base.name}
                </ActionButton>
              )),
          ]}
        />
      ) : null}
      {uploadStatus ? (
        <div className='load-db-upload-status'>
          <hr color='lime' />
          <div>
            {textes["base_changed"]
              ? upperFirstLetter(textes["base_changed"])
              : "Base changed"}
          </div>
        </div>
      ) : null}
      <Collapse
        title={textes["add_base"] || "add base"}
        collapseLevel='settings'
      >
        <FlexColumnCenter>
          <InputText
            id={"name_for_new_base"}
            name={textes["name_for_new_base"] || "name for new base"}
            valueFromParent={newBaseName}
            hoistValue={setNewBaseName}
            noValidValues={bases.map((b) => b.name)}
          />
          <ActionButton actionWithPayload={handleAddBase}>
            {textes["add_base"] || "add base"}
          </ActionButton>
        </FlexColumnCenter>
      </Collapse>
    </div>
  );
}
