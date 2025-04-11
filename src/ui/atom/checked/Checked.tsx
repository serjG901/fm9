import { useEffect, useState } from "react";
import "./style.css";

interface CheckedComponent {
  id?: string;
  name?: string;
  valueFromParent?: boolean;
  hoistValue?: (value: boolean) => void;
}

export default function Checked({
  id = "checked",
  name = "checked",
  valueFromParent = true,
  hoistValue = () => {},
}: CheckedComponent) {
  const [state, setState] = useState(valueFromParent);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    setState(value);
    hoistValue(value);
  };

  useEffect(() => {
    setState(valueFromParent);
  }, [valueFromParent]);

  return (
    <div className='checked'>
      <label htmlFor={id}>
        <span>{name}</span>
        <input
          id={id}
          name={name}
          type='checkbox'
          checked={state}
          onChange={handleChange}
          data-checked={state.toString()}
        />
      </label>
    </div>
  );
}
