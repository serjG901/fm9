import { useEffect, useState } from "react";
import "./style.css";
import Colorpicker from "../../atom/colorpicker/Colorpicker";
import ActionButton from "../../atom/action-button/ActionButton";
import Collapse from "../../atom/collapse/Collapse";
import FlexColumnCenter from "../../atom/flex-column-center/FlexColumnCenter";
import { Tag, TextesByLanguage } from "../../../interfaces";
import FlexWrap from "../../atom/flex-wrap/FlexWrap";
import InputText from "../../atom/input-text/InputText";

interface AddTagsComponent extends TextesByLanguage {
  tagsFromParrent?: Tag[];
  maybeTags?: Tag[];
  hoistTags?: (tags: Tag[]) => void;
  onlyMaybeTags?: boolean;
}

export default function AddTags({
  textes = {},
  tagsFromParrent = [],
  maybeTags = [],
  hoistTags = () => {},
  onlyMaybeTags = false,
}: AddTagsComponent) {
  const [tags, setTags] = useState<Tag[]>(tagsFromParrent);
  const [value, setValue] = useState<string>("");
  const [color, setColor] = useState<string>("#000000");

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

  const handleAddTag = (tag: Tag) => {
    setTags((state) => [...state, tag]);
  };

  useEffect(() => {
    if (JSON.stringify(tags) !== JSON.stringify(tagsFromParrent))
      hoistTags(tags);
  }, [tags]);

  useEffect(() => {
    if (JSON.stringify(tags) !== JSON.stringify(tagsFromParrent))
      setTags(tagsFromParrent);
  }, [tagsFromParrent]);

  return (
    <div className='add-tags'>
      <FlexColumnCenter>
        <Collapse collapseLevel='tags' title={textes["tags"] || "tags"}>
          <div className='input-add-tags'>
            <FlexColumnCenter>
              {!onlyMaybeTags && (
                <>
                  <div>
                    <InputText
                      id='add-tag-value'
                      name={textes["tag"] || "tag"}
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
                      {textes["add_tag"] || "add tag"}
                    </ActionButton>
                  </div>
                </>
              )}

              {maybeTags.filter(
                (tag) =>
                  !tags.find(
                    (t) => t.value === tag.value && t.color === tag.color
                  )
              ).length ? (
                <FlexWrap
                  childrenArray={maybeTags
                    .filter(
                      (tag) =>
                        !tags.find(
                          (t) => t.value === tag.value && t.color === tag.color
                        )
                    )
                    .map((tag) => (
                      <ActionButton
                        key={tag.value + tag.color}
                        actionWithPayload={handleAddTag}
                        payload={{ value: tag.value, color: tag.color }}
                        bgColor={tag.color}
                      >
                        {tag.value}
                      </ActionButton>
                    ))}
                />
              ) : null}
            </FlexColumnCenter>
          </div>
        </Collapse>
        <div className='tags-add-tags'>
          {tags.length
            ? tags.map((tag) => (
                <ActionButton
                  key={tag.value + tag.color}
                  actionWithPayload={handleDeleteTag}
                  payload={{ value: tag.value, color: tag.color }}
                  bgColor={tag.color}
                >
                  {tag.value}
                </ActionButton>
              ))
            : null}
        </div>
      </FlexColumnCenter>
    </div>
  );
}
