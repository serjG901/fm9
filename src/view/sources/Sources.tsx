import "./style.css";
import Page from "../../ui/atom/page/Page";
import AddSource from "../../ui/substance/add-source/AddSource";
import SourceCard from "../../ui/thing/source-card/SourceCard";
import FlexWrap from "../../ui/atom/flex-wrap/FlexWrap";
import plus from "../../helpers/plus";
import { Source, SourcesStore, StorePersist, Write } from "../../interfaces";
import { StoreApi, UseBoundStore } from "zustand";
import { useSettingsStore } from "../../store/settingsStore";

interface SourcesComponent {
  sourcesType: string;
  useSourcesStore: UseBoundStore<
    Write<StoreApi<SourcesStore>, StorePersist<SourcesStore, SourcesStore>>
  >;
}

export default function Sources({
  sourcesType,
  useSourcesStore,
}: SourcesComponent) {
  const [sources, addSource, updateSource, deleteSource, getSources] =
    useSourcesStore((state: SourcesStore) => [
      state.sources,
      state.addSource,
      state.updateSource,
      state.deleteSource,
      state.getSources,
    ]);

  const [defaultCurrency, currencies] = useSettingsStore((state) => [
    state.defaultCurrency,
    state.currencies,
  ]);

  const byCurrency = Object.groupBy(sources, (a) => a.currency);

  return (
    <Page>
      <div className='sources-view'>
        <h1>{sourcesType}</h1>

        <AddSource
          addSource={addSource}
          sources={getSources()}
          defaultCurrency={defaultCurrency}
          currencies={currencies}
        />
        {byCurrency
          ? Object.keys(byCurrency).map((currency) => {
              return (
                <>
                  <div key={currency}>
                    {currency}:{" "}
                    <span className='sum'>
                      {plus(...byCurrency[currency]!.map((s) => s.amount))}
                    </span>
                  </div>
                  <FlexWrap
                    childrenArray={byCurrency[currency]!.sort((a, b) =>
                      +a.amount < +b.amount ? 1 : -1
                    ).map((source: Source) => {
                      return (
                        <SourceCard
                          key={source.id}
                          source={source}
                          updateSource={updateSource}
                          deleteSource={deleteSource}
                          sources={getSources()}
                          currencies={currencies}
                        />
                      );
                    })}
                  ></FlexWrap>
                </>
              );
            })
          : null}
      </div>
    </Page>
  );
}
