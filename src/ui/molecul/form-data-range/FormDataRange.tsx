import { useEffect, useState } from "react";
import ActionButton from "../../atom/action-button/ActionButton";
import Collapse from "../../atom/collapse/Collapse";
import Datepicker from "../../atom/datepicker/Datepicker";
import FlexColumnCenter from "../../atom/flex-column-center/FlexColumnCenter";
import "./style.css";

interface FormDataRangeComponent {
  period?: { start: string; end: string };
  setPeriod?: (start: string, end: string) => void;
}

export default function FormDataRange({
  period = { start: "", end: "" },
  setPeriod = () => {},
}: FormDataRangeComponent) {
  const [start, setStart] = useState(period.start);
  const [end, setEnd] = useState(period.end);

  const handleResetPeriod = () => {
    setStart("");
    setEnd("");
    setPeriod("", "");
  };

  useEffect(() => {
    if (start && end) setPeriod(start, end);
  }, [start, end]);

  useEffect(() => {
    if (start !== period.start) setStart(period.start);
  }, [period.start]);

  useEffect(() => {
    if (end !== period.end) setStart(period.end);
  }, [period.end]);

  return (
    <div>
      <Collapse collapseLevel='menu' title='period'>
        <FlexColumnCenter>
          <Datepicker
            key='start'
            name='start'
            valueFromParent={start}
            hoistValue={setStart}
          />
          <Datepicker
            key='end'
            name='end'
            valueFromParent={end}
            hoistValue={setEnd}
          />
        </FlexColumnCenter>
      </Collapse>
      {start && end && (
        <div>
          <div>
            {start} === {end}
          </div>
          <ActionButton actionWithPayload={handleResetPeriod} alert>
            reset period
          </ActionButton>
        </div>
      )}
    </div>
  );
}
