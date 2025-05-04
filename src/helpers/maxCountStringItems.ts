export default function maxCountStringItems(items: string[]) {
  const statItems = items.reduce(
    (acc: { [key: string]: number }, p) => (
      acc[p] ? (acc[p] += 1) : (acc[p] = 1), acc
    ),
    {}
  );
  const itemWithMaxCount: [string, number] = Object.keys(statItems).reduce(
    (acc, k) => (statItems[k] > +acc[1] ? [k, statItems[k]] : acc),
    ["", 0]
  );
  return itemWithMaxCount[0];
}
