import plus from "../../../helpers/plus";
import { Payment, Tag } from "../../../interfaces";
import Collapse from "../../atom/collapse/Collapse";
import HighlightText from "../../atom/highlight-text/HighlightText";
import SearchedName from "../searched-name/SearchedName";
import "./style.css";

interface StatisticsComponent {
  payments?: Payment[];
  search?: string;
}

export default function Statistics({
  payments = [],
  search = "",
}: StatisticsComponent) {
  const statItems = Object.entries(Object.groupBy(payments, ({ name }) => name))
    .sort((nameA, nameB) => {
      const a = (nameA[0] as string).toUpperCase();
      const b = (nameB[0] as string).toUpperCase();
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    })
    .map(([name, payments]) => {
      return (
        <div key={name}>
          <div>
            <SearchedName name={name} search={search} />

            <div>
              {payments
                ?.reduce((acc: Tag[], p) => [...acc, ...p.tags], [])
                .reduce(
                  (acc: Tag[], tag) =>
                    acc.find((t) => JSON.stringify(t) === JSON.stringify(tag))
                      ? acc
                      : [...acc, tag],
                  []
                )
                .map((tag) => (
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
          <div>{payments?.map((p) => p.amount).join(", ")}</div>
          <div>
            {payments
              ?.map((p) => p.amount)
              .reduce((acc, amount) => plus(acc, amount), "0")}
          </div>
        </div>
      );
    });
  return (

      <Collapse title='statistics' collapseLevel='menu'>
        <div className='statistics'>
          <div>
            <div>name</div>
            <div>amounts</div>
            <div>sum</div>
          </div>
          {statItems}
          <div>
            <div>all</div>
            <div>{payments.length}</div>
            <div>{plus(...payments.map((p) => p.amount))}</div>
          </div>
        </div>
      </Collapse>

  );
}
