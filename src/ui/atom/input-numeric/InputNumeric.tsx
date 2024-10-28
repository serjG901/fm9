import { useEffect, useState } from "react";
import "./style.css";

interface InputNumericComponent {
  id?: string;
  name?: string;
  valueFromParent?: string;
  hoistValue?: (value: string) => void;
  numberAfterZero?: number;
}

export default function InputNumeric({
  id = "input-numeric",
  name = "input-numeric",
  valueFromParent = "",
  hoistValue = () => {},
  numberAfterZero = 2,
}: InputNumericComponent) {
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
    <div className='input-numeric'>
      <label htmlFor={id}>
        <span>{name}</span>
        <input
          id={id}
          name={name}
          type='text'
          inputMode="decimal"
          pattern="[0\.]{1}[0-9]{1,2}|[0-9]*([0\.]{1}[0-9]{1,2})?"
          min={1 / 10 ** -numberAfterZero}
          value={state}
          onChange={handleChange}
        />
      </label>
    </div>
  );
}
