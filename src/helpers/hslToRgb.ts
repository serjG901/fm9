export default function hslToRgb(h: number, s: number, l: number) {
  if (h < 0) h = 0;
  if (s < 0) s = 0;
  if (l < 0) l = 0;
  if (h >= 360) h = 359;
  if (s > 100) s = 100;
  if (l > 100) l = 100;
  s /= 100;
  l /= 100;
  const C = (1 - Math.abs(2 * l - 1)) * s;
  const hh = h / 60;
  const X = C * (1 - Math.abs((hh % 2) - 1));
  let r = 0;
  let g = 0;
  let b = 0;
  if (hh >= 0 && hh < 1) {
    r = C;
    g = X;
  } else if (hh >= 1 && hh < 2) {
    r = X;
    g = C;
  } else if (hh >= 2 && hh < 3) {
    g = C;
    b = X;
  } else if (hh >= 3 && hh < 4) {
    g = X;
    b = C;
  } else if (hh >= 4 && hh < 5) {
    r = X;
    b = C;
  } else {
    r = C;
    b = X;
  }
  const m = l - C / 2;
  r += m;
  g += m;
  b += m;
  r *= 255.0;
  g *= 255.0;
  b *= 255.0;
  r = Math.round(r);
  g = Math.round(g);
  b = Math.round(b);
  const hex = r * 65536 + g * 256 + b;
  let hexString = hex.toString(16);
  const len = hexString.length;
  if (len < 6) for (let i = 0; i < 6 - len; i++) hexString = "0" + hexString;
  return "#" + hexString.toUpperCase();
}
