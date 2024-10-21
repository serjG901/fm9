import { Source } from "../../../interfaces";
import FlexColumnCenter from "../../atom/flex-column-center/FlexColumnCenter";
import UpdateSource from "../../substance/update-source/UpdateSource";
import "./style.css";

interface SourceCardComponent {
  source?: Source;
  updateSource?: (source: Source) => void;
  deleteSource?: (source: Source) => void;
  sources?: Source[];
  currencies?: string[];
}

export default function SourceCard({
  source = { id: 0, name: "source", amount: "0", currency: "BYN" },
  updateSource = () => {},
  deleteSource = () => {},
  sources = [],
  currencies = [],
}: SourceCardComponent) {
  const showModal = () => {
    const modalId = document.getElementById(`update-source-${source.id}`);
    modalId?.showPopover();
  };
  return (
    <div className='source-card' key={source.id} onClick={showModal}>
      <FlexColumnCenter>
        <div className='source-card-name'>{source.name}</div>
        <div className='source-card-amount'>{source.amount}</div>
        <div className='source-card-currency'>{source.currency}</div>
        <UpdateSource
          source={source}
          updateSource={updateSource}
          deleteSource={deleteSource}
          sources={sources}
          currencies={currencies}
        />
      </FlexColumnCenter>
    </div>
  );
}
