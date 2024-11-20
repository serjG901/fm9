/*export default function plus(...args: string[]) {
  const pairs = args.map((a) =>
    a
      .split(".")
      .map((a, i, arr) =>
        i === 0
          ? +a
          : a.length === 1
          ? +((arr[0][0] === "-" ? "-" : "") + (a + "0"))
          : +((arr[0][0] === "-" ? "-" : "") + a)
      )
  );

  let [integer, fractional] = pairs.reduce(
    (acc, pair) => {
      const integer = pair[0] ? acc[0] + pair[0] : acc[0];
      const fractional = pair[1] ? acc[1] + pair[1] : acc[1];
      return [integer, fractional];
    },
    [0, 0]
  );

  const addInteger = Math.trunc(fractional / 100);
  if (addInteger) {
    integer += addInteger;
    fractional = fractional % 100;
  }

  const fractionalString = fractional < 10 ? "0" + fractional : fractional + "";

  const result = fractional ? integer + "." + fractionalString : integer + "";

  return result;
}*/

export default function plus(...args: string[]) {
  return "" + Math.round(args.reduce((acc, a) => acc + +a, 0) * 100) / 100;
}
/*
console.log(plus("5.47", "22.33", "33.09", "0.04"));
console.log(plus2("5.47", "22.33", "33.09", "0.04"));

console.log(plus("31115.47", "22.33", "33.09", "0.04"));
console.log(plus2("31115.47", "22.33", "33.09", "0.04"));

console.log(plus("31115.47", "22222222.33", "33.09", "0.04"));
console.log(plus2("31115.47", "22222222.33", "33.09", "0.04"));

console.log(plus("0.47", "0.33", "0.09", "0.04"));
console.log(plus2("0.47", "0.33", "0.09", "0.04"));

console.log(plus("0.05", "0.03", "0.09", "0.04"));
console.log(plus2("0.05", "0.03", "0.09", "0.04"));

console.log(plus("0.05", "0.03", "0.99", "0.99"));
console.log(plus2("0.05", "0.03", "0.99", "0.99"));

console.log(plus("0.99", "0.03", "0.99", "0.99"));
console.log(plus2("0.99", "0.03", "0.99", "0.99"));

console.log(plus("0.99", "-0.03", "-0.99", "-0.99"));
console.log(plus2("0.99", "-0.03", "-0.99", "-0.99"));
*/
