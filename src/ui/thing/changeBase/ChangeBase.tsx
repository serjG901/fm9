import { useEffect, useState } from "react";
import { useBuysStore } from "../../../store/buysStore";
import { useCreditsStore } from "../../../store/creditsStore";
import { useDebetsStore } from "../../../store/debetsStore";
import { usePaysStore } from "../../../store/paysStore";
import ActionButton from "../../atom/action-button/ActionButton";
import "./style.css";
import { useBasesStore } from "../../../store/basesStore";
import { Base, PaymentsStore, SourcesStore } from "../../../interfaces";
import InputText from "../../atom/input-text/InputText";
import FlexColumnCenter from "../../atom/flex-column-center/FlexColumnCenter";
import { defaultDB } from "../../../store/defaultState";
import FlexWrap from "../../atom/flex-wrap/FlexWrap";
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

  const [
    bases,
    addBase,
    updateBase,
    currentBase,
    setCurrentBase,
    getCurrentBase,
  ] = useBasesStore((state) => [
    state.bases,
    state.addBase,
    state.updateBase,
    state.currentBase,
    state.setCurrentBase,
    state.getCurrentBase,
  ]);

  const [uploadStatus, setUploadStatus] = useState(false);
  const [newBaseName, setNewBaseName] = useState("");

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

  const handleChangeBase = (base: Base) => {
    handleClick();
    updateBase({
      ...currentBase,
      name: currentBase?.name || "default",
      id: currentBase?.id || 0,
      db: fm9DB,
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
      });
    } else {
      localStorage.removeItem(`${appName}-buys`);
      localStorage.removeItem(`${appName}-pays`);
      localStorage.removeItem(`${appName}-debets`);
      localStorage.removeItem(`${appName}-credits`);
      Object.keys(defaultDB).forEach((key) => {
        if (key === `${appName}-buys`)
          setStateBuys(defaultDB[key] as PaymentsStore);
        if (key === `${appName}-pays`)
          setStatePays(defaultDB[key] as PaymentsStore);
        if (key === `${appName}-debets`)
          setStateDebets(defaultDB[key] as SourcesStore);
        if (key === `${appName}-credits`)
          setStateCredits(defaultDB[key] as SourcesStore);
      });
    }
    setUploadStatus(true);
  };

  const handleAddBase = () => {
    if (newBaseName) addBase(newBaseName);
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
      <h2>Change Base</h2>
      {bases.length ? (
        <ActionButton
          key={"default"}
          actionWithPayload={(base: Base) => {
            handleClick();
            handleChangeBase(base);
          }}
          payload={bases.find((b) => b.name === "default")}
          bgColor={currentBase?.name === "default" ? "#33ff33" : ""}
        >
          default
        </ActionButton>
      ) : null}

      {bases.length ? (
        <FlexWrap
          childrenArray={bases
            .filter((b) => b.name !== "default")
            .sort((a, b) => (a.name > b.name ? 1 : -1))
            .map((base) => (
              <ActionButton
                key={base.name}
                actionWithPayload={handleChangeBase}
                payload={base}
                bgColor={currentBase?.name === base.name ? "#33ff33" : ""}
              >
                {base.name}
              </ActionButton>
            ))}
        />
      ) : null}
      {uploadStatus ? (
        <div className='load-db-upload-status'>
          <hr color='lime' />
          <div>Base changed</div>
        </div>
      ) : null}
      <FlexColumnCenter>
        <InputText valueFromParent={newBaseName} hoistValue={setNewBaseName} />
        <ActionButton actionWithPayload={handleAddBase}>
          add new base
        </ActionButton>
      </FlexColumnCenter>
    </div>
  );
}
