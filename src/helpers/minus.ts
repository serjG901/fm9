/*export default function minus(...args: string[]) {
  const pairs = args.map((a) =>
    a
      .split(".")
      .map((a, i) => (i === 0 ? +a : a.length === 1 ? +(a + "0") : +a))
  );

  let [integer, fractional] = pairs.reduce(
    (acc, pair, index) => {
      const integer =
        index === 0 && pair[0] ? pair[0] : pair[0] ? acc[0] - pair[0] : acc[0];
      const fractional =
        index === 0 && pair[1] ? pair[1] : pair[1] ? acc[1] - pair[1] : acc[1];
      return [integer, fractional];
    },
    [0, 0]
  );

  if (integer > 0) {
    if (fractional < 0) {
      fractional += 100;
      integer -= 1;
    }
  }
  if (integer < 0) {
    if (fractional > 0) {
      fractional = 100 - fractional;
      integer += 1;
    }
  }

  const addInteger = Math.abs(Math.trunc(fractional / 100));
  if (addInteger) {
    integer -= addInteger;
    fractional = fractional % 100;
  }
  const fractionalAbs = Math.abs(fractional);
  const fractionalString =
    fractionalAbs < 10 ? "0" + fractionalAbs : fractionalAbs + "";

  const result = !fractional
    ? integer + ""
    : fractional < 0 && integer === 0
    ? "-" + integer + "." + fractionalString
    : integer + "." + fractionalString;
  return result;
}
*/
export default function minus(...args: string[]) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  return "" + Math.round(+args.reduce((acc, a) => +acc - +a) * 100) / 100;
}
/*
console.log(minus("5.47", "22.33", "33.09", "0.04"));
console.log(minus2("5.47", "22.33", "33.09", "0.04"));

console.log(minus("31115.47", "22.33", "33.09", "0.04"));
console.log(minus2("31115.47", "22.33", "33.09", "0.04"));

console.log(minus("31115.47", "22222222.33", "33.09", "0.04"));
console.log(minus2("31115.47", "22222222.33", "33.09", "0.04"));

console.log(minus("0.47", "0.33", "0.09", "0.04"));
console.log(minus2("0.47", "0.33", "0.09", "0.04"));

console.log(minus("0.46", "0.33", "0.09", "0.04"));
console.log(minus2("0.46", "0.33", "0.09", "0.04"));

console.log(minus("0.45", "0.33", "0.09", "0.04"));
console.log(minus2("0.45", "0.33", "0.09", "0.04"));

console.log(minus("0.05", "0.03", "0.09", "0.04"));
console.log(minus2("0.05", "0.03", "0.09", "0.04"));

console.log(minus("0.05", "0.03", "0.99", "0.99"));
console.log(minus2("0.05", "0.03", "0.99", "0.99"));
*/
