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
    const arr = e.target.value.split(".");
    console.log(arr);
    const value =
      parseInt(arr[0]).toString() +
      (arr[1] !== undefined ? "." + arr[1].slice(0, 2) : "");
    console.log(value);
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
          value={state}
          onChange={handleChange}
        />
      </label>
    </div>
  );
}
