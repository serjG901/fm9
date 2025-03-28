const compareDesc = (a: string | number | boolean, b: string | number | boolean) =>
  +a > +b ? -1 : +a === +b ? 0 : 1;

export const sortDescByAmountAndPriority = (
  arr: { [key: string]: number | string | boolean }[],
  propAmount: string,
  propPriority: string
) =>
  arr.sort((a, b) =>
    a[propPriority] && b[propPriority]
      ? compareDesc(a[propAmount], b[propAmount])
      : !(a[propPriority] || b[propPriority])
      ? compareDesc(a[propAmount], b[propAmount])
      : a[propPriority]
      ? -1
      : 1
  );
