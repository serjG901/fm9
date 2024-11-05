import { Tag } from "../../../interfaces";
import Contents from "../../atom/contents/Contents";
import HighlightText from "../../atom/highlight-text/HighlightText";
import SearchedName from "../searched-name/SearchedName";
import SumPerMonth from "../sum-per-month/SumPerMonth";
import "./style.css";

interface StatRowComponent {
  search?: string;
  name?: string;
  tags?: Tag[];
  amounts?: { amount: string; datetime: string }[];
  sum?: string;
}

export default function StatRow({
  search = "",
  name = "name",
  tags = [],
  amounts = [],
  sum = "0",
}: StatRowComponent) {
  const sortAmounts = amounts.sort((a, b) => +a.datetime - +b.datetime);

  const everyAmounts = sortAmounts.map((a) => a.amount);

  const EveryAmounts = ({ everyAmounts }: { everyAmounts: string[] }) => {
    return <div>{everyAmounts.join(", ")}</div>;
  };

  return (
    <Contents key={name}>
      <div>
        <SearchedName name={name} search={search} />
        <div>
          {tags.map((tag) => (
            <HighlightText
              key={tag.value + tag.color}
              bgColor={tag.color}
              padding
            >
              {tag.value}
            </HighlightText>
          ))}
        </div>
      </div>
      <div>
        <EveryAmounts everyAmounts={everyAmounts} />
        <SumPerMonth amounts={sortAmounts} />
      </div>
      <div>{sum}</div>
    </Contents>
  );
}
