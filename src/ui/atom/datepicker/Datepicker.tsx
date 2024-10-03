import { useEffect, useState } from "react";
import "./style.css";
import getDefaultDatetime from "../../../helpers/getDefaultDatetime";

interface DatepickerComponent {
  id?: string;
  name?: string;
  valueFromParent?: string;
  hoistValue?: (value: string) => void;
}

export default function Datepicker({
  id = "daterpicker",
  name = "daterpicker",
  valueFromParent = getDefaultDatetime(),
  hoistValue = () => {},
}: DatepickerComponent) {
  const [state, setState] = useState(valueFromParent);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setState(value);
    hoistValue(value);
  };

  useEffect(() => {
    setState(valueFromParent);
  }, [valueFromParent]);

  return (
    <div className='daterpicker'>
      <label htmlFor={id}>
        <span>{name}</span>
        <input
          id={id}
          name={name}
          type='datetime-local'
          value={state}
          onChange={handleChange}
        />
      </label>
    </div>
  );
}
