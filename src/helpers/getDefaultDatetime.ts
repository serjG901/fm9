export default function getDefaultDatetime() {
  return new Date(Date.now())
    .toLocaleDateString("ru-RU", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    })
    .split(", ")
    .map((t, i) => (i == 0 ? t.split(".").reverse().join("-") : t))
    .join("T");
}
