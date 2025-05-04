import { Tag } from "../interfaces";

export default function getUniqTags(tags: Tag[]) {
  const uniqTags = tags.reduce(
    (acc: Tag[], tag) =>
      acc.find((t) => JSON.stringify(t) === JSON.stringify(tag))
        ? acc
        : [...acc, tag],
    []
  );
  return uniqTags;
}
