import { useState } from "react";
import "./style.css";
import HighlightText from "../../atom/highlight-text/HighlightText";
import InputWithMemory from "../../atom/input-with-memory/InputWithMemory";
import Colorpicker from "../../atom/colorpicker/Colorpicker";
import ActionButton from "../../atom/action-button/ActionButton";
import Collapse from "../../atom/collapse/Collapse";

interface Tag {
  value: string;
  color: string;
}

export default function AddTags() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [value, setValue] = useState<string>("");
  const [color, setColor] = useState<string>("");

  const handleSetValue = (value: string) => {
    setValue(value);
  };

  const handleSetColor = (color: string) => {
    setColor(color);
  };

  const handleSetTag = () => {
    if (tags.find((tag) => tag.value === value && tag.color === color)) {
      return;
    }
    setTags((state) => [...state, { value, color }]);
  };

  const handleDeleteTag = ({ value, color }: Tag) => {
    if (tags.find((tag) => tag.value === value && tag.color === color)) {
      const newTags = tags.filter(
        (tag) => tag.value !== value || tag.color !== color
      );
      setTags(newTags);
    }
  };

  return (
    <div className='add-tags'>
      <Collapse collapseLevel='tags' title='add tags'>
        <div>
          <InputWithMemory
            id='add-tag-value'
            name='tag'
            valueFromParent={value}
            hoistValue={handleSetValue}
          />
        </div>
        <div>
          <Colorpicker
            id='add-tag-color'
            name='color'
            valueFromParent={color}
            hoistValue={handleSetColor}
          />
        </div>
        <div>
          <ActionButton actionWithPayload={handleSetTag}>Add tag</ActionButton>
        </div>
      </Collapse>
      <div>
        {tags.length
          ? tags.map((tag) => (
              <ActionButton
                actionWithPayload={handleDeleteTag}
                payload={{ value: tag.value, color: tag.color }}
              >
                <HighlightText color={tag.color}>{tag.value}</HighlightText>
              </ActionButton>
            ))
          : null}
      </div>
    </div>
  );
}
