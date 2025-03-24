import plus from "../../../helpers/plus";
import { Payment, Tag, TextesByLanguage } from "../../../interfaces";
import Collapse from "../../atom/collapse/Collapse";
import Contents from "../../atom/contents/Contents";
import HighlightText from "../../atom/highlight-text/HighlightText";
import SumPerMonth from "../../molecul/sum-per-month/SumPerMonth";
import "./style.css";
interface StatisticTagsComponent extends TextesByLanguage {
  currency?: string;
  payments?: Payment[];
}
export default function StatisticTags({
  textes = {},
  currency = "",
  payments = [],
}: StatisticTagsComponent) {
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

  const tagsWithSum = tags
    .map((tag) => {
      const p = payments.filter((p) =>
        p.tags.find((t) => t.value + t.color === tag.value + tag.color)
      );
      const amounts = p.map((p) => ({
        amount: p.amount,
        datetime: p.datetime,
      }));
      const sum = amounts.reduce((acc, a) => plus(acc, a.amount), "0");

      return {
        tag,
        amounts,
        sum,
      };
    })
    .sort((a, b) => +b.sum - +a.sum);

  return (
    <Collapse
      title={`${currency} ${textes["tags"] || "tags"}`}
      collapseLevel='stat'
    >
      <div className='statistic-tags'>
        {tagsWithSum.map((ts) => (
          <Contents key={ts.tag.value + ts.tag.color}>
            <div>
              <HighlightText bgColor={ts.tag.color} padding>
                {ts.tag.value}
              </HighlightText>
            </div>
            <div>
              <div className='statistic-tags-sum'>{ts.sum}</div>
              <SumPerMonth color={ts.tag.color} amounts={ts.amounts} />
            </div>
          </Contents>
        ))}
      </div>
    </Collapse>
  );
}
