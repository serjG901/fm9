import plus from "../../../helpers/plus";
import Contents from "../../atom/contents/Contents";
import "./style.css";

interface SumPerMonthComponent {
  amounts?: { amount: string; datetime: string }[];
  color?: string;
}

export default function SumPerMonth({
  amounts = [],
  color = "",
}: SumPerMonthComponent) {
  const sumPerMonth = Object.entries(
    Object.groupBy(amounts, ({ datetime }) => {
      const date = new Date(datetime);
      const year = date.getFullYear() % 100;
      const month = date.getMonth() + 1;
      return `${month}/${year}`;
    })
  ).map((a) => ({
    monthAndYear: a[0],
    sum: a[1]?.reduce((acc, a) => plus(acc, a.amount), "0") || "0",
  }));

  const max = Math.max(...sumPerMonth.map((s) => +s.sum));
  return (
    <div className='sum-per-month'>
      {sumPerMonth.map((spm) => {
        return spm.sum !== "0" ? (
          <Contents>
            <div className='sum-per-month-month'>{spm.monthAndYear}</div>
            <div
              className='sum-per-month-graf'
              style={
                {
                  "--self-color-bg": color,
                  "--percent": `${Math.round((100 * +spm.sum) / max)}%`,
                } as React.CSSProperties
              }
            >
              {spm.sum}
            </div>
          </Contents>
        ) : null;
      })}
    </div>
  );
}
