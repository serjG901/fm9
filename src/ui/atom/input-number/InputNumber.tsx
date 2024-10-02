import { useEffect, useState } from "react";
import "./style.css";

interface InputNumberComponent {
  id?: string;
  name?: string;
  valueFromParent?: string;
  hoistValue?: (value: string) => void;
}

export default function InputNumber({
  id = "input-number",
  name = "input-number",
  valueFromParent = "",
  hoistValue = () => {},
}: InputNumberComponent) {
  const [state, setState] = useState(valueFromParent);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    const arr = e.target.value.split(".");
    const value =
      arr[0] + (arr[1] !== undefined ? "." + arr[1].slice(0, 2) : "");
    setState(value);
    hoistValue(value);
  };

  useEffect(() => {
    setState(valueFromParent);
  }, [valueFromParent]);

  return (
    <div className='input-number'>
      <label htmlFor={id}>
        <span>{name}</span>
        <input
          id={id}
          name={name}
          type='number'
          step={0.01}
          min={0.01}
          value={state}
          onChange={handleChange}
        />
      </label>
    </div>
  );
}
