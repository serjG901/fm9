import { useState } from "react";
import plus from "../../../helpers/plus";
import { Payment, Tag, TextesByLanguage } from "../../../interfaces";
import ActionButton from "../../atom/action-button/ActionButton";
import Collapse from "../../atom/collapse/Collapse";
import HighlightText from "../../atom/highlight-text/HighlightText";
import SearchedName from "../../molecul/searched-name/SearchedName";
import "./style.css";

interface StatisticsComponent extends TextesByLanguage {
  currency?: string;
  payments?: Payment[];
  search?: string;
}

export default function Statistics({
  textes = {},
  currency,
  payments = [],
  search = "",
}: StatisticsComponent) {
  const [typeOfSort, setTypeOfSort] = useState("name");
  const [directionOfSort, setDirectionOfSort] = useState(true);
  const statItems = Object.entries(Object.groupBy(payments, ({ name }) => name))
    .sort((nameA, nameB) => {
      if (typeOfSort === "amounts") {
        const amountsA = nameA[1]?.length || 0;
        const amountsB = nameB[1]?.length || 0;
        if (directionOfSort) return amountsA - amountsB;
        return amountsB - amountsA;
      }
      if (typeOfSort === "sum") {
        const amountsA =
          nameA[1]
            ?.map((p) => p.amount)
            .reduce((acc, amount) => plus(acc, amount), "0") || 0;
        const amountsB =
          nameB[1]
            ?.map((p) => p.amount)
            .reduce((acc, amount) => plus(acc, amount), "0") || 0;
        if (directionOfSort) return +amountsA - +amountsB;
        return +amountsB - +amountsA;
      }
      const a = (nameA[0] as string).toUpperCase();
      const b = (nameB[0] as string).toUpperCase();
      if (a < b) {
        return directionOfSort ? -1 : 1;
      }
      if (a > b) {
        return directionOfSort ? 1 : -1;
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

  const handleClickSort = (type: string) => {
    setTypeOfSort(type);
    setDirectionOfSort(!directionOfSort);
  };
  return (
    <Collapse
      title={`${currency} ${textes["stat"] || "stat"}`}
      collapseLevel='menu'
    >
      <div className='statistics'>
        <div>
          <ActionButton actionWithPayload={handleClickSort} payload={"name"}>
            {textes["name"] || "name"}
            {typeOfSort !== "name" ? (
              ""
            ) : directionOfSort ? (
              <span>&#8593;</span>
            ) : (
              <span>&#8595;</span>
            )}
          </ActionButton>
          <ActionButton actionWithPayload={handleClickSort} payload={"amounts"}>
            {textes["amount"] || "amount"}
            {typeOfSort !== "amounts" ? (
              ""
            ) : directionOfSort ? (
              <span>&#8593;</span>
            ) : (
              <span>&#8595;</span>
            )}
          </ActionButton>
          <ActionButton actionWithPayload={handleClickSort} payload={"sum"}>
            {textes["sum"] || "sum"}
            {typeOfSort !== "sum" ? (
              ""
            ) : directionOfSort ? (
              <span>&#8593;</span>
            ) : (
              <span>&#8595;</span>
            )}
          </ActionButton>
        </div>
        <div>
          <div>{textes["all"] || "all"}</div>
          <div>{payments.length}</div>
          <div>{plus(...payments.map((p) => p.amount))}</div>
        </div>
        {statItems}
      </div>
    </Collapse>
  );
}
