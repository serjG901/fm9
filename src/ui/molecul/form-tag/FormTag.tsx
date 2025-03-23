import { useEffect, useState } from "react";
import ActionButton from "../../atom/action-button/ActionButton";
import Colorpicker from "../../atom/colorpicker/Colorpicker";
import FlexColumnCenter from "../../atom/flex-column-center/FlexColumnCenter";
import InputText from "../../atom/input-text/InputText";
import "./style.css";
import { Tag, TextesByLanguage } from "../../../interfaces";
import LoadingDots from "../../atom/loading-dots/LoadingDots";

interface FormTagComponent extends TextesByLanguage {
  hoistTag?: (newTag: Tag, oldTag?: Tag) => void;
  valueFromParent?: string;
  colorFromParent?: string;
  actionType?: "add" | "update";
  deleteTag?: (tag: Tag) => void;
}

export default function FormTag({
  textes = {},
  hoistTag = () => {},
  valueFromParent = "",
  colorFromParent = "#000000",
  actionType = "add",
  deleteTag = () => {},
}: FormTagComponent) {
  const [value, setValue] = useState<string>(valueFromParent);
  const [color, setColor] = useState<string>(colorFromParent);

  const [isActionStatus, setIsActionStatus] = useState(1);
  const [isDeleteStatus, setIsDeleteStatus] = useState(1);

  const handleSetValue = (value: string) => {
    setValue(value);
  };

  const handleSetColor = (color: string) => {
    setColor(color);
  };

  const handleSetTag = () => {
    if (valueFromParent + colorFromParent !== value + color) {
      setIsActionStatus(2);
    }
  };

  const handleDeleteTag = () => {
    const agree = confirm(`${textes["delete"]}?`);
    if (agree) {
      setIsDeleteStatus(2);
    }
  };

  useEffect(() => {
    if (value !== valueFromParent) setValue(valueFromParent);
  }, [valueFromParent]);

  useEffect(() => {
    if (color !== colorFromParent) setColor(colorFromParent);
  }, [colorFromParent]);

  useEffect(() => {
    let timer = 0;
    if (isActionStatus === 2) {
      setIsActionStatus(3);
    }
    if (isActionStatus === 3) {
      const oldTag = { value: valueFromParent, color: colorFromParent };
      const newTag = { value, color };
      hoistTag(newTag, oldTag);

      timer = setTimeout(() => setIsActionStatus(4), 300);
    }
    if (isActionStatus === 4) {
      clearTimeout(timer);
      timer = setTimeout(() => setIsActionStatus(1), 2000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isActionStatus]);

  useEffect(() => {
    if (isDeleteStatus === 2) {
      setIsDeleteStatus(3);
    }
    if (isDeleteStatus === 3) {
      const tag = { value: valueFromParent, color: colorFromParent };
      deleteTag(tag);
    }
  }, [isDeleteStatus]);

  return (
    <FlexColumnCenter>
      <div>
        <InputText
          id={`add-tag-value-${valueFromParent + colorFromParent}`}
          name={textes["name"] || "name"}
          valueFromParent={value}
          hoistValue={handleSetValue}
        />
      </div>
      <div>
        <Colorpicker
          id={`add-tag-color-${valueFromParent + colorFromParent}`}
          name={textes["color"] || "color"}
          valueFromParent={color}
          hoistValue={handleSetColor}
        />
      </div>
      <div>
        {isActionStatus === 2 || isActionStatus === 3 ? (
          <ActionButton>
            <LoadingDots>
              {actionType === "update"
                ? textes["updating"] || "updating"
                : textes["adding"] || "adding"}
            </LoadingDots>
          </ActionButton>
        ) : isActionStatus === 4 ? (
          <ActionButton>
            <div>{textes["done"] || "done"}</div>
          </ActionButton>
        ) : (
          <ActionButton actionWithPayload={handleSetTag}>
            {textes[actionType] || actionType}
          </ActionButton>
        )}
      </div>

      {actionType === "update" && (
        <div>
          <br />
          {isDeleteStatus === 2 ? (
            <ActionButton alert>
              <LoadingDots>{textes["deleting"] || "deleting"}</LoadingDots>
            </ActionButton>
          ) : (
            <ActionButton actionWithPayload={handleDeleteTag} alert>
              {textes["delete"] || "delete"}
            </ActionButton>
          )}
        </div>
      )}
    </FlexColumnCenter>
  );
}
