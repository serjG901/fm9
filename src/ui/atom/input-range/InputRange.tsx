import { useEffect, useState } from "react";
import "./style.css";

interface InputRangeComponent {
  id?: string;
  name?: string;
  valueFromParent?: string;
  hoistValue?: (value: string) => void;
  min?: number;
  max?: number;
  step?: number;
  onlySelfChange?: boolean;
}

export default function InputRange({
  id = "input-range",
  name = "input-range",
  valueFromParent = "",
  hoistValue = () => {},
  min = 0,
  max = 100,
  step = 1,
}: InputRangeComponent) {
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
    <div
      className='input-range'
    >
      <label htmlFor={id}>
        <span>{name}</span>
        <input
          id={id}
          name={name}
          type='range'
          step={step}
          min={min}
          max={max}
          value={state}
          onChange={handleChange}
        />
      </label>
    </div>
  );
}
