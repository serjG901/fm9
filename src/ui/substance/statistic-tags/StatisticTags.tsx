import plus from "../../../helpers/plus";
import { Payment, Tag, TextesByLanguage } from "../../../interfaces";
import Collapse from "../../atom/collapse/Collapse";
import Contents from "../../atom/contents/Contents";
import HighlightText from "../../atom/highlight-text/HighlightText";
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
      const sum = payments.reduce(
        (acc, p) =>
          p.tags.find((t) => t.value + t.color === tag.value + tag.color)
            ? plus(acc, p.amount)
            : acc,
        "0"
      );
      return { tag, sum };
    })
    .sort((a, b) => +b.sum - +a.sum);

  return (
    <Collapse
      title={`${currency} ${textes["stat_tags"] || "stat tags"}`}
      collapseLevel='stat'
    >
      <div className='statistic-tags'>
        {tagsWithSum.map((ts) => (
          <Contents>
            <div>
              <HighlightText bgColor={ts.tag.color} padding>
                {ts.tag.value}:
              </HighlightText>
            </div>
            <div> {ts.sum}</div>
          </Contents>
        ))}
      </div>
    </Collapse>
  );
}
