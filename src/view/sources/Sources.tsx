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
import { sortDescByAmountAndPriority } from "../../helpers/sortDescByAmountAndPriority";

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

  const [defaultCurrency, currencies, hue] = useSettingsStore((state) => [
    state.defaultCurrency,
    state.currencies,
    state.hue,
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
          defaultHue={hue}
        />
        {byCurrency
          ? Object.keys(byCurrency)
              .sort(
                (a, b) =>
                  +plus(...byCurrency[b]!.map((s) => s.amount)) -
                  +plus(...byCurrency[a]!.map((s) => s.amount))
              )
              .map((currency) => {
                return (
                  <Contents key={currency}>
                    <div>
                      {currency}:{" "}
                      <span className='sum'>
                        {plus(...byCurrency[currency]!.map((s) => s.amount))}
                      </span>
                    </div>
                    <FlexWrap>
                      {(
                        sortDescByAmountAndPriority(
                          byCurrency[currency]!,
                          "amount",
                          "alwaysOnTop"
                        ) as Source[]
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
                            defaultHue={hue}
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
