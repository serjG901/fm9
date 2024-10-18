import { useEffect, useState } from "react";
import "./style.css";

interface InputTextComponent {
  id?: string;
  name?: string;
  valueFromParent?: string;
  hoistValue?: (value: string) => void;
  noValidValues?: string[];
}

export default function InputText({
  id = "input-text",
  name = "input-text",
  valueFromParent = "",
  hoistValue = () => {},
  noValidValues = [],
}: InputTextComponent) {
  const [state, setState] = useState(valueFromParent);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setState(value);
    hoistValue(value);

    if (noValidValues.find((v) => v === value)) {
      document.getElementById(id)?.classList.add("invalid");
    } else {
      document.getElementById(id)?.classList.remove("invalid");
    }
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
          maxLength={32}
          value={state}
          onChange={handleChange}
          onFocus={handleChange}
        />
      </label>
    </div>
  );
}
