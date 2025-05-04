import { Payment, Tag } from "../interfaces";

export default function getTagsFromForByPaymentName(
  paymentName: string,
  payments: Payment[]
): [Tag[], string[], string[]] {
  const [tags, froms, fors] = payments.reduce(
    (acc: [Tag[], string[], string[]], p) =>
      p.name === paymentName
        ? [
            [...acc[0], ...p.tags],
            [...acc[1], p.from],
            [...acc[2], p.for],
          ]
        : acc,
    [[], [], []]
  );
  return [tags, froms, fors];
}
