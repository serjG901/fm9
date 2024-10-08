import { useBuysStore } from "../../store/buysStore";
import { useCreditsStore } from "../../store/creditsStore";
import { useDebetsStore } from "../../store/debetsStore";
import { usePaysStore } from "../../store/paysStore";
import ActionButton from "../../ui/atom/action-button/ActionButton";
import Page from "../../ui/atom/page/Page";
import "./style.css";

export default function FileWork() {
  const [stateBuys, setStateBuys] = useBuysStore((state) => [state, state.setState]);
  const [statePays, setStatePays] = usePaysStore((state) => [state, state.setState]);
  const [stateDebets, setStateDebets] = useDebetsStore((state) => [
    state,
    state.setState,
  ]);
  const [stateCredits, setStateCredits] = useCreditsStore((state) => [
    state,
    state.setState,
  ]);

  const fm9DB = {
    ["fm9-buys"]: stateBuys,
    ["fm9-pays"]: statePays,
    ["fm9-debets"]: stateDebets,
    ["fm9-credits"]: stateCredits,
  };

  function saveAsLegacy() {
    const aDownloadFile = document.getElementById("aDownloadFile");
    const opts = { type: "application/json" };
    const file = new File([JSON.stringify(fm9DB, null, 4)], "", opts);
    // @ts-ignore
    aDownloadFile!.href = window.URL.createObjectURL(file);
    aDownloadFile!.setAttribute("download", `fm9${Date.now()}.json`);
    aDownloadFile!.click();
  }
  // @ts-ignore
  const handleDownloadFile = async (e) => {
    const file = e.target.files[0];
    const contents = await file.text();
    const fm9DB = JSON.parse(contents);
    console.log(fm9DB);
    Object.keys(fm9DB).forEach((key: string) => {
      if (key === "fm9-buys") setStateBuys(fm9DB[key]);
      if (key === "fm9-pays") setStatePays(fm9DB[key]);
      if (key === "fm9-debets") setStateDebets(fm9DB[key]);
      if (key === "fm9-credits") setStateCredits(fm9DB[key]);
    });
  };

  return (
    <Page>
      <h1>File work</h1>
      <div>
        <ActionButton actionWithPayload={saveAsLegacy}>save db</ActionButton>
        <a id='aDownloadFile' download></a>
      </div>
      <div>
        <label htmlFor='oldOpenFile'>
          download db
          <input
            name='oldOpenFile'
            type='file'
            title='file'
            onChange={handleDownloadFile}
          />
        </label>
      </div>
    </Page>
  );
}
