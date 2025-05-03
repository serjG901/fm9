import { Payment, Tag } from "../interfaces";

export default function filtredPaymentsBySort(
  payments: Payment[],
  startPeriod: string,
  endPeriod: string,
  search: string,
  isSearchBySource: boolean,
  filterTags: Tag[]
) {
  const filtredPaymentsByPeriod =
    startPeriod && endPeriod && startPeriod <= endPeriod
      ? payments.filter(
          (p: Payment) => p.datetime >= startPeriod && p.datetime <= endPeriod
        )
      : payments;

  const filtredPaymentsBySearch = !search
    ? filtredPaymentsByPeriod
    : filtredPaymentsByPeriod.filter((p: Payment) =>
        isSearchBySource
          ? p.from.includes(search) || p.for.includes(search)
          : p.name.includes(search)
      );

  const filtredPayments = !filterTags.length
    ? filtredPaymentsBySearch
    : filtredPaymentsBySearch.filter(
        (p) =>
          p.tags
            .map((tag) =>
              filterTags.find(
                (ft) => ft.value + ft.color === tag.value + tag.color
              )
            )
            .filter((b) => b).length === filterTags.length
      );

  const filtredPaymentsBySort = filtredPayments.sort(
    (p1: Payment, p2: Payment) => (p1.datetime > p2.datetime ? -1 : 1)
  );

  return filtredPaymentsBySort;
}
