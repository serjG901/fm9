import "./style.css";
import { useCreditsStore } from "../../store/creditsStore";
import Sources from "../../view/sources/Sources";

export default function Credits() {
  return <Sources sourcesType='Credits' useSourcesStore={useCreditsStore} />;
}
