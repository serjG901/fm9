import { Tag } from "../interfaces";

const smartSensitivity = 3;

export default function getUniqTags(tags: Tag[], smart?: boolean) {
  const uniqTags = tags.reduce(
    (acc: Map<string, { value: Tag; count: number }>, tag) => {
      const key = JSON.stringify(tag);
      const count = acc.get(key)?.count || 0;
      acc.set(key, { value: tag, count: count + 1 });
      return acc;
    },
    new Map()
  );

  const sortedTags = [...uniqTags]
    .map((v) => ({ tag: v[1].value, count: v[1].count }))
    .toSorted((a, b) => b.count - a.count);

  let withSmart = sortedTags;

  if (smart) {
    const index = sortedTags.findIndex((v, i, arr) =>
      i ? smartSensitivity * v.count < arr[i - 1].count : false
    );
    if (index > 0) {
      withSmart = sortedTags.slice(0, index);
    }
  }

  return withSmart.map((v) => v.tag);
}
