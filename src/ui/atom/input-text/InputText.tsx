import { useEffect, useState } from "react";
import "./style.css";

interface InputTextComponent {
  id?: string;
  name?: string;
  valueFromParent?: string;
  hoistValue?: (value: string) => void;
}

export default function InputText({
  id = "input-text",
  name = "input-text",
  valueFromParent = "",
  hoistValue = () => {},
}: InputTextComponent) {
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
    <div className='input-text'>
      <label htmlFor={id}>
        <span>{name}</span>
        <input
          id={id}
          name={name}
          type='text'
          value={state}
          onChange={handleChange}
        />
      </label>
    </div>
  );
}
