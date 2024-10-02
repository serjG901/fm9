export default function getDefaultDatetime() {
  return new Date(Date.now())
    .toLocaleDateString("ru-RU", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    })
    .split(".")
    .reverse()
    .join("-");
}
