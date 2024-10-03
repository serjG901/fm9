export default function multy(a: string, b: string) {
  const aa = a.split(".");
  const bb = b.split(".");
  const integer =
    +aa[0].concat(aa[1] ? aa[1] : "") * +bb[0].concat(bb[1] ? bb[1] : "");
  const tailA = aa[1] ? aa[1].length : 0;
  const tailB = bb[1] ? bb[1].length : 0;
  const tail = tailA + tailB;
  let str = integer + "";
  let startTail = str.length - tail;
  const startZero = startTail <= 0 ? "0" : "";
  if (startTail < 0) {
    str = "0".repeat(-startTail).concat(integer + "");
    startTail = str.length - tail;
  }
  const result = startZero.concat(
    str.slice(0, startTail).concat(tail ? "." + str.slice(startTail) : "")
  );
  return result;
}
