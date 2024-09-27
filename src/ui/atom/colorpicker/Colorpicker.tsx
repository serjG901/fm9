import { useEffect, useState } from "react";
import "./style.css";

interface ColorpickerComponent {
  id?: string;
  name?: string;
  valueFromParent?: string;
  hoistValue?: (value: string) => void;
}

export default function Colorpicker({
  id = "colorpicker",
  name = "colorpicker",
  valueFromParent = "#000000",
  hoistValue = () => {},
}: ColorpickerComponent) {
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
    <div className='colorpicker'>
      <label htmlFor={id}>
        <span>{name}</span>
        <input
          id={id}
          name={name}
          type='color'
          value={state}
          onChange={handleChange}
        />
      </label>
    </div>
  );
}
