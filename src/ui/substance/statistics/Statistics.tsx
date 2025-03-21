import { useEffect, useState } from "react";
import plus from "../../../helpers/plus";
import { Payment, Tag, TextesByLanguage } from "../../../interfaces";
import ActionButton from "../../atom/action-button/ActionButton";
import Collapse from "../../atom/collapse/Collapse";
import "./style.css";
import Paginate from "../paginate/Paginate";
import Contents from "../../atom/contents/Contents";
import StatRow from "../../molecul/stat-row/StatRow";

interface StatisticsComponent extends TextesByLanguage {
  currency?: string;
  payments?: Payment[];
  search?: string;
}

export default function Statistics({
  textes = {},
  currency = "",
  payments = [],
  search = "",
}: StatisticsComponent) {
  const itemsPerPage = 20;

  const [pageActive, setPageActive] = useState(1);
  const [pages, setPages] = useState(1);

  const setPreviousPage = () => {
    if (pageActive > 1) {
      setPageActive(pageActive - 1);
    }
  };
  const setNextPage = () => {
    if (pageActive < pages) {
      setPageActive(pageActive + 1);
    }
  };

  const [typeOfSort, setTypeOfSort] = useState("name");
  const [directionOfSort, setDirectionOfSort] = useState(true);
  const statItems = Object.entries(Object.groupBy(payments, ({ name }) => name))
    .sort((nameA, nameB) => {
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
      return {
        search,
        name,
        tags: payments
          ?.reduce((acc: Tag[], p) => [...acc, ...p.tags], [])
          .reduce(
            (acc: Tag[], tag) =>
              acc.find((t) => JSON.stringify(t) === JSON.stringify(tag))
                ? acc
                : [...acc, tag],
            []
          ),
        amounts: payments?.map((p) => ({
          amount: p.amount,
          datetime: p.datetime,
        })),
        sum: payments
          ?.map((p) => p.amount)
          .reduce((acc, amount) => plus(acc, amount), "0"),
      };
    });

  useEffect(() => {
    setPageActive(1);
    setPages(Math.ceil(statItems.length / itemsPerPage));
  }, [statItems.length]);

  const handleClickSort = (type: string) => {
    setTypeOfSort(type);
    setDirectionOfSort(!directionOfSort);
  };
  return (
    <Collapse
      title={`${currency} ${textes["stat"] || "stat"}`}
      collapseLevel='stat'
    >
      <Paginate
        dublicate
        pageActive={pageActive}
        pages={pages}
        setPageActive={setPageActive}
        setPreviousPage={setPreviousPage}
        setNextPage={setNextPage}
      />
      <div className='statistics'>
        <Contents>
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
        </Contents>

        <StatRow
          search={search}
          name={textes["all"] || "all"}
          amounts={payments}
          sum={plus(...payments.map((p) => p.amount))}
        />

        {statItems
          .slice(itemsPerPage * (pageActive - 1), itemsPerPage * pageActive)
          .map((item) => (
            <StatRow
              search={search}
              name={item.name}
              tags={item.tags}
              amounts={item.amounts}
              sum={item.sum}
            />
          ))}
      </div>
      <Paginate
        pageActive={pageActive}
        pages={pages}
        setPageActive={setPageActive}
        setPreviousPage={setPreviousPage}
        setNextPage={setNextPage}
      />
    </Collapse>
  );
}
