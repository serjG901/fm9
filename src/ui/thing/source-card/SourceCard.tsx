import { Source } from "../../../interfaces";
import FlexColumnCenter from "../../atom/flex-column-center/FlexColumnCenter";
import UpdateSource from "../../substance/update-source/UpdateSource";
import "./style.css";

interface SourceCardComponent {
  source?: Source;
  updateSource?: (source: Source) => void;
  deleteSource?: (source: Source) => void;
}

export default function SourceCard({
  source = { id: 0, name: "source", amount: "0", currency: "BYN" },
  updateSource = () => {},
  deleteSource = () => {},
}: SourceCardComponent) {
  const showModal = (e:React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
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
        />
      </FlexColumnCenter>
    </div>
  );
}
