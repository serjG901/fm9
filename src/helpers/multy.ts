export default function multy(...args: string[]) {
  const pairs = args.map((a) =>
    a.split(".").map((a) => [a[0] + a[1], a[1].length])
  );

  const [integer, countAfterZero] = pairs.reduce(
    (acc, pair) => {
      const integer = acc[0] * +pair[0];
      const countAfterZero = acc[1] + +pair[1];
      return [integer, countAfterZero];
    },
    [1, 0]
  );
  const str = integer + "";
  const result =
    str.slice(0, str.length - countAfterZero) + "." + str.slice(countAfterZero);
  return result;
}
/*
  function multy2(...args: string[]) {
    return args.reduce((acc, a) => acc + +a, 0);
  }
  
  console.log(multy("5.47", "22.33", "33.09", "0.04"));
  console.log(multy2("5.47", "22.33", "33.09", "0.04"));
  
  console.log(multy("31115.47", "22.33", "33.09", "0.04"));
  console.log(multy2("31115.47", "22.33", "33.09", "0.04"));
  
  console.log(multy("31115.47", "22222222.33", "33.09", "0.04"));
  console.log(multy2("31115.47", "22222222.33", "33.09", "0.04"));
  
  console.log(multy("0.47", "0.33", "0.09", "0.04"));
  console.log(multy2("0.47", "0.33", "0.09", "0.04"));
  
  console.log(multy("0.05", "0.03", "0.09", "0.04"));
  console.log(multy2("0.05", "0.03", "0.09", "0.04"));
  
  console.log(multy("0.05", "0.03", "0.99", "0.99"));
  console.log(multy2("0.05", "0.03", "0.99", "0.99"));
  
  console.log(multy("0.99", "0.03", "0.99", "0.99"));
  console.log(multy2("0.99", "0.03", "0.99", "0.99"));
  
  console.log(multy("0.99", "-0.03", "-0.99", "-0.99"));
  console.log(multy2("0.99", "-0.03", "-0.99", "-0.99"));
  */
