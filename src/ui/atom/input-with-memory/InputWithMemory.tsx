import { useEffect, useState } from "react";
import "./style.css";

interface InputWithMemoryComponent {
  id?: string;
  name?: string;
  valueFromParent?: string;
  hoistValue?: (value: string) => void;
  lettersInWordForRemember?: number;
}

export default function InputWithMemory({
  id = "input-with-memmory",
  name = "input-with-memmory",
  valueFromParent = "",
  hoistValue = () => {},
  lettersInWordForRemember = 5,
}: InputWithMemoryComponent) {
  const [state, setState] = useState(valueFromParent);
  const [memory, setMemory] = useState<string[]>([]);
  const [timer, setTimer] = useState<number>(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setState(value);
    hoistValue(value);
  };

  useEffect(() => {
    setState(valueFromParent);
  }, [valueFromParent]);

  useEffect(() => {
    if (timer) clearTimeout(timer);
    const newTimer = setTimeout(
      () =>
        setMemory((s) =>
          s.find((s) => s === state)
            ? s
            : state.length < lettersInWordForRemember
            ? s
            : [...s, state]
        ),
      1000
    );
    setTimer(newTimer);
  }, [state]);

  return (
    <div className='input-with-memmory'>
      <label htmlFor={id}>
        <span>{name}</span>
        <input
          id={id}
          name={name}
          type='text'
          value={state}
          onChange={handleChange}
          list={memory && memory.length ? `datalist-for-${id}` : undefined}
        />
        {memory && memory.length ? (
          <datalist id={`datalist-for-${id}`}>
            {memory
              .sort((a, b) => b.length - a.length)
              .map((mem) => {
                return (
                  <option key={mem} value={mem}>
                    {mem}
                  </option>
                );
              })}
          </datalist>
        ) : null}
      </label>
    </div>
  );
}
