import "./style.css";
import Page from "../../ui/atom/page/Page";
import AddSource from "../../ui/substance/add-source/AddSource";
import SourceCard from "../../ui/thing/source-card/SourceCard";
import FlexWrap from "../../ui/atom/flex-wrap/FlexWrap";
import plus from "../../helpers/plus";
import { Source, SourcesStore, StorePersist, Write } from "../../interfaces";
import { StoreApi, UseBoundStore } from "zustand";

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
  const [sources, addSource, updateSource, deleteSource] = useSourcesStore(
    (state: SourcesStore) => [
      state.sources,
      state.addSource,
      state.updateSource,
      state.deleteSource,
    ]
  );

  const byCurrency = Object.groupBy(sources, (a) => a.currency);
  const amountsByCurrency = Object.keys(byCurrency).map((c) => [
    c,
    byCurrency![c]!.map((p) => p.amount),
  ]);
  return (
    <Page>
      <div className='sources-view'>
        <h1>{sourcesType}</h1>

        {amountsByCurrency.map((pair) => (
          <div key={pair[0].toString()}>
            {pair[0]}: <span className='sum'>{plus(...pair[1])}</span>
          </div>
        ))}

        <AddSource addSource={addSource} />
        <FlexWrap
          childrenArray={sources
            .sort((a, b) => (+a.amount < +b.amount ? 1 : -1))
            .map((source: Source) => {
              return (
                <SourceCard
                  key={source.id}
                  source={source}
                  updateSource={updateSource}
                  deleteSource={deleteSource}
                />
              );
            })}
        ></FlexWrap>
      </div>
    </Page>
  );
}
