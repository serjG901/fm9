import plus from "../../../helpers/plus";
import { Payment, Tag } from "../../../interfaces";
import Collapse from "../../atom/collapse/Collapse";
import HighlightText from "../../atom/highlight-text/HighlightText";
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
            {name.split(search).map((part, i) =>
              i === 0 ? (
                part
              ) : (
                <>
                  <HighlightText>{search}</HighlightText>
                  {part}
                </>
              )
            )}
            <div>
              {payments
                ?.reduce((acc: Tag[], p) => [...acc, ...p.tags], [])
                .map((tag) => (
                  <HighlightText color={tag.color} padding>
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
