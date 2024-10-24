import { useEffect, useState } from "react";
import ActionButton from "../../atom/action-button/ActionButton";
import Collapse from "../../atom/collapse/Collapse";
import Datepicker from "../../atom/datepicker/Datepicker";
import FlexColumnCenter from "../../atom/flex-column-center/FlexColumnCenter";
import "./style.css";
import { TextesByLanguage } from "../../../interfaces";

interface FormDateRangeComponent extends TextesByLanguage {
  period?: { start: string; end: string };
  setPeriod?: (start: string, end: string) => void;
}

export default function FormDateRange({
  textes = {},
  period = { start: "", end: "" },
  setPeriod = () => {},
}: FormDateRangeComponent) {
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
    <div className='form-date-range'>
      <FlexColumnCenter>
        <Collapse collapseLevel='menu' title={textes["period"] || "period"}>
          <FlexColumnCenter>
            <Datepicker
              key='start'
              name={textes["start"] || "start"}
              valueFromParent={start}
              hoistValue={setStart}
            />
            <Datepicker
              key='end'
              name={textes["end"] || "end"}
              valueFromParent={end}
              hoistValue={setEnd}
            />
          </FlexColumnCenter>
        </Collapse>
        {start && end && (
          <div className='reset'>
            <ActionButton actionWithPayload={handleResetPeriod} alert>
              {textes["reset_period"] || "reset period"}
            </ActionButton>
          </div>
        )}
      </FlexColumnCenter>
    </div>
  );
}
