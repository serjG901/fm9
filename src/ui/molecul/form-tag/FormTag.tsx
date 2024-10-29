import { useEffect, useState } from "react";
import ActionButton from "../../atom/action-button/ActionButton";
import Colorpicker from "../../atom/colorpicker/Colorpicker";
import FlexColumnCenter from "../../atom/flex-column-center/FlexColumnCenter";
import InputText from "../../atom/input-text/InputText";
import "./style.css";
import { Tag, TextesByLanguage } from "../../../interfaces";

interface FormTagComponent extends TextesByLanguage {
  hoistTag?: (newTag: Tag, oldTag?: Tag) => void;
  valueFromParent?: string;
  colorFromParent?: string;
  typeAction?: "add" | "update";
}

export default function FormTag({
  textes = {},
  hoistTag = () => {},
  valueFromParent = "",
  colorFromParent = "#000000",
  typeAction = "add",
}: FormTagComponent) {
  const [value, setValue] = useState<string>(valueFromParent);
  const [color, setColor] = useState<string>(colorFromParent);

  const handleSetValue = (value: string) => {
    setValue(value);
  };

  const handleSetColor = (color: string) => {
    setColor(color);
  };

  const handleSetTag = () => {
    if (valueFromParent + colorFromParent !== value + color) {
      const oldTag = { value: valueFromParent, color: colorFromParent };
      const newTag = { value, color };
      hoistTag(newTag, oldTag);
    }
  };

  useEffect(() => {
    if (value !== valueFromParent) setValue(valueFromParent);
  }, [valueFromParent]);

  useEffect(() => {
    if (color !== colorFromParent) setColor(colorFromParent);
  }, [colorFromParent]);

  return (
    <FlexColumnCenter>
      <div>
        <InputText
          id='add-tag-value'
          name={textes["name"] || "name"}
          valueFromParent={value}
          hoistValue={handleSetValue}
        />
      </div>
      <div>
        <Colorpicker
          id='add-tag-color'
          name={textes["color"] || "color"}
          valueFromParent={color}
          hoistValue={handleSetColor}
        />
      </div>
      <div>
        <ActionButton actionWithPayload={handleSetTag}>
          {typeAction === "update"
            ? textes["update_tag"] || "update tag"
            : textes["add_tag"] || "add tag"}
        </ActionButton>
      </div>
    </FlexColumnCenter>
  );
}
