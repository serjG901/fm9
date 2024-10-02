import "./style.css";
import { useDebetsStore } from "../../store/debetsStore";
import Sources from "../../view/sources/Sources";

export default function Debets() {
  return <Sources sourcesType='Debets' useSourcesStore={useDebetsStore} />;
}
