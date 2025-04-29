import "./style.css";

interface InputRadioComponent {
  id?: string;
  name?: string;
  valueFromParent?: string;
  hoistValue?: (value: string) => void;
  defaultValue?: string;
  setValue?: (value: string) => void;
}

export default function InputRadio({
  id = "input-radio",
  name = "input-radio",
  defaultValue = "input-radio",
  setValue = () => {},
}: InputRadioComponent) {
  return (
    <div className='input-radio'>
      <label
        htmlFor={id}
        tabIndex={0}
        onKeyDown={(e) => e.code === "Space" && e.preventDefault()}
        onKeyUp={(e) =>
          e.code === "Space" && (e.preventDefault(), setValue(id))
        }
      >
        <span>{id}</span>
        <input
          type='radio'
          id={id}
          name={name}
          checked={id === defaultValue}
          onChange={() => setValue(id)}
        />
      </label>
    </div>
  );
}
