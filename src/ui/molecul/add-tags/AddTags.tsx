import { useEffect, useState } from "react";
import "./style.css";
import ActionButton from "../../atom/action-button/ActionButton";
import Collapse from "../../atom/collapse/Collapse";
import FlexColumnCenter from "../../atom/flex-column-center/FlexColumnCenter";
import { Tag, TextesByLanguage } from "../../../interfaces";
import FlexWrap from "../../atom/flex-wrap/FlexWrap";
import FormTag from "../form-tag/FormTag";

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

  const handleSetTag = (newTag: Tag) => {
    if (
      tags.find((t) => t.value === newTag.value && t.color === newTag.color)
    ) {
      return;
    }
    setTags((state) => [...state, newTag]);
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
                <Collapse
                  title={textes["add_tag"] || "add tag"}
                  collapseLevel='form'
                >
                  <FormTag textes={textes} hoistTag={handleSetTag} />
                </Collapse>
              )}
              {maybeTags.filter(
                (maybeTag) =>
                  !tags.find(
                    (t) =>
                      t.value === maybeTag.value && t.color === maybeTag.color
                  )
              ).length ? (
                <FlexWrap>
                  {maybeTags
                    .filter(
                      (maybeTag) =>
                        !tags.find(
                          (t) =>
                            t.value === maybeTag.value &&
                            t.color === maybeTag.color
                        )
                    )
                    .map((maybeTag) => (
                      <ActionButton
                        key={maybeTag.value + maybeTag.color}
                        actionWithPayload={handleAddTag}
                        payload={{
                          value: maybeTag.value,
                          color: maybeTag.color,
                        }}
                        bgColor={maybeTag.color}
                      >
                        {maybeTag.value}
                      </ActionButton>
                    ))}
                </FlexWrap>
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
