import plus from "../../../helpers/plus";
import { Payment, Tag, TextesByLanguage } from "../../../interfaces";
import Collapse from "../../atom/collapse/Collapse";
import MonthStatRow from "../../molecul/month-stat-row/MonthStatRow";
import "./style.css";

interface MonthStatComponent extends TextesByLanguage {
  payments?: Payment[];
  currency?: string;
  type?: string;
}

export default function MonthStat({
  //textes = {},
  currency = "",
  type = "name",
  payments = [],
}: MonthStatComponent) {
  let stat: { title: string; color: string; sumPerMonth: string[] }[] = [
    { title: "title", color: "", sumPerMonth: ["0"] },
  ];

  if (type === "name") {
    stat = Object.entries(Object.groupBy(payments, ({ name }) => name))
      .sort((nameA, nameB) => {
        const amountsA =
          nameA[1]
            ?.map((p) => p.amount)
            .reduce((acc, amount) => plus(acc, amount), "0") || 0;
        const amountsB =
          nameB[1]
            ?.map((p) => p.amount)
            .reduce((acc, amount) => plus(acc, amount), "0") || 0;

        return +amountsB - +amountsA;
      })
      .map(([name, payments]) => {
        return {
          title: name,
          color: "",
          sumPerMonth: Object.entries(
            Object.groupBy(payments || [], ({ datetime }) =>
              new Date(datetime).getMonth()
            )
          )
            .sort((dateA, dateB) => +dateA[0] - +dateB[0])
            ?.map((p) =>
              p[1] ? p[1].reduce((acc, p) => plus(acc, p.amount), "0") : "0"
            ),
        };
      });
  }
  if (type === "tag") {
    const tags = payments
      .flatMap((p) => p.tags)
      .reduce(
        (acc: Tag[], tag) =>
          acc.find((t) => t.value + t.color === tag.value + tag.color)
            ? acc
            : [...acc, tag],
        []
      )
      .sort((a, b) => (a.value > b.value ? 1 : -1));

    stat = tags
      .map((tag) => {
        const p = payments.filter((payment) =>
          payment.tags.find((t) => t.value + t.color === tag.value + tag.color)
        );
        const sum = p.reduce(
          (acc, p) =>
            p.tags.find((t) => t.value + t.color === tag.value + tag.color)
              ? plus(acc, p.amount)
              : acc,
          "0"
        );
        const sumPerMonth = Object.entries(
          Object.groupBy(p || [], ({ datetime }) =>
            new Date(datetime).getMonth()
          )
        )
          .sort((dateA, dateB) => +dateA[0] - +dateB[0])
          ?.map((p) =>
            p[1] ? p[1].reduce((acc, p) => plus(acc, p.amount), "0") : "0"
          );
        return { title: tag.value, color: tag.color, sumPerMonth, sum };
      })
      .sort((a, b) => +b.sum - +a.sum)
      .map(({ title, color, sumPerMonth }) => ({
        title,
        color,
        sumPerMonth,
      }));
  }
  console.dir(stat);
  return (
    <Collapse
      title={`${currency} ${type === "name" ? "" : "tag"} by month`}
      collapseLevel='stat'
    >
      {stat.map((s) => (
        <MonthStatRow
          key={s.title}
          title={s.title}
          data={s.sumPerMonth}
          color={s.color}
        />
      ))}
    </Collapse>
  );
}
