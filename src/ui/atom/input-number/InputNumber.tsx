import { useEffect, useState } from "react";
import "./style.css";

interface InputNumberComponent {
  id?: string;
  name?: string;
  valueFromParent?: string;
  hoistValue?: (value: string) => void;
  numberAfterZero?: number;
}

export default function InputNumber({
  id = "input-number",
  name = "input-number",
  valueFromParent = "",
  hoistValue = () => {},
  numberAfterZero = 2,
}: InputNumberComponent) {
  const [state, setState] = useState(valueFromParent);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const arr = e.target.value.split(".");
    const value =
      arr[0] +
      (arr[1] !== undefined ? "." + arr[1].slice(0, numberAfterZero) : "");
    setState(value);
    hoistValue(value);
  };

  useEffect(() => {
    setState(valueFromParent);
  }, [valueFromParent]);

  useEffect(() => {
    if (isNaN(+state) || +state < 0) {
      document.getElementById(id)?.classList.add("invalid");
    } else {
      document.getElementById(id)?.classList.remove("invalid");
    }
  }, [state]);

  return (
    <div className='input-number'>
      <label htmlFor={id}>
        <span>{name}</span>
        <input
          id={id}
          name={name}
          type='number'
          step={0.01}
          min={10 ** -numberAfterZero}
          value={state}
          onChange={handleChange}
        />
      </label>
    </div>
  );
}
