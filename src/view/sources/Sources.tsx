import "./style.css";
import Page from "../../ui/atom/page/Page";
import AddSource from "../../ui/substance/add-source/AddSource";
import SourceCard from "../../ui/thing/source-card/SourceCard";
import FlexWrap from "../../ui/atom/flex-wrap/FlexWrap";
import plus from "../../helpers/plus";
import {
  Source,
  SourcesStore,
  StorePersist,
  TextesByLanguage,
  Write,
} from "../../interfaces";
import { StoreApi, UseBoundStore } from "zustand";
import { useSettingsStore } from "../../store/settingsStore";
import Contents from "../../ui/atom/contents/Contents";

interface SourcesComponent extends TextesByLanguage {
  sourcesType: string;
  useSourcesStore: UseBoundStore<
    Write<StoreApi<SourcesStore>, StorePersist<SourcesStore, SourcesStore>>
  >;
}

export default function Sources({
  textes = {},
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
          textes={textes}
          addSource={addSource}
          sources={getSources()}
          defaultCurrency={defaultCurrency}
          currencies={currencies}
        />
        {byCurrency
          ? Object.keys(byCurrency).map((currency) => {
              return (
                <Contents key={currency}>
                  <div>
                    {currency}:{" "}
                    <span className='sum'>
                      {plus(...byCurrency[currency]!.map((s) => s.amount))}
                    </span>
                  </div>
                  <FlexWrap>
                    {byCurrency[currency]!.sort((a, b) =>
                      +a.amount < +b.amount ? 1 : -1
                    ).map((source: Source) => {
                      return (
                        <SourceCard
                          textes={textes}
                          key={source.id}
                          source={source}
                          updateSource={updateSource}
                          deleteSource={deleteSource}
                          sources={getSources()}
                          currencies={currencies}
                        />
                      );
                    })}
                  </FlexWrap>
                </Contents>
              );
            })
          : null}
      </div>
    </Page>
  );
}
