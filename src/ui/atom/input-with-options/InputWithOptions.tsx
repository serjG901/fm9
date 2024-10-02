import { useEffect, useState } from "react";
import "./style.css";

interface InputWithOptionsComponent {
  options?: string[];
  id?: string;
  name?: string;
  valueFromParent?: string;
  hoistValue?: (value: string) => void;
}

export default function InputWithOptions({
  options = ["option1", "option2", "option3"],
  id = "input-with-options",
  name = "input-with-options",
  valueFromParent = "",
  hoistValue = () => {},
}: InputWithOptionsComponent) {
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
    <div className='input-with-options'>
      <label htmlFor={id}>
        <span>{name}</span>
        <input
          id={id}
          name={name}
          type='text'
          maxLength={32}
          value={state}
          onChange={handleChange}
          list={options && options.length ? `datalist-for-${id}` : undefined}
        />
        {options && options.length ? (
          <datalist id={`datalist-for-${id}`}>
            {options.map((opt) => {
              return (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              );
            })}
          </datalist>
        ) : null}
      </label>
    </div>
  );
}
