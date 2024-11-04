/* eslint-disable @typescript-eslint/no-explicit-any */
export default function correctionScrollPosition(target: any) {
  const { y } = target.getBoundingClientRect();
  const scrollY = window.scrollY;
  const maxY = window.innerHeight;
  if (y < 0 || y > maxY) window.scrollTo(0, scrollY + y - maxY / 3);
}
