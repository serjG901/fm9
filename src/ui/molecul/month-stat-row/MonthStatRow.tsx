import HighlightText from "../../atom/highlight-text/HighlightText";
import "./style.css";

interface MonthStatRowComponent {
  title?: string;
  color?: string;
  data?: string[];
}

export default function MonthStatRow({
  title = "title",
  color = "#000000",
  data = [
    "100",
    "200",
    "300",
    "400",
    "100",
    "200",
    "300",
    "100",
    "200",
    "300",
    "200",
    "300",
  ],
}: MonthStatRowComponent) {
  const max = Math.max(...data.map((d) => +d));
  return (
    <div className='mounth-stat-row'>
      <hr />
      <div className='mounth-stat-row-title'>
        <HighlightText bgColor={color} padding>
          {title}
        </HighlightText>
      </div>
      <div className='mounth-stat-row-graf'>
        {data.map((d) => (
          <div
            style={
              {
                "--self-color-bg": color,
                "--percent": `${Math.round((100 * +d) / max)}%`,
              } as React.CSSProperties
            }
          >
           {d}
          </div>
        ))}
      </div>
    </div>
  );
}
