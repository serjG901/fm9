import FlexColumnCenter from "../../atom/flex-column-center/FlexColumnCenter";
import UpdateSource from "../../substance/update-source/UpdateSource";
import "./style.css";

interface SourceCardComponent {
  name?: string;
  amount?: string;
  currency?: string;
  updateSource?: (name: string, amount: string, currency: string) => void;
}

export default function SourceCard({
  name = "source",
  amount = '0',
  currency = "BYN",
  updateSource = () => {},
}: SourceCardComponent) {
  return (
    <div className='source-card'>
      <FlexColumnCenter>
        <div className='source-card-name'>{name}</div>
        <div className='source-card-amount'>{amount}</div>
        <div className='source-card-currency'>{currency}</div>
        <UpdateSource
          source={{
            name: "source",
            amount: "0",
            currency: "BYN",
          }}
          updateSource={updateSource}
        />
      </FlexColumnCenter>
    </div>
  );
}
