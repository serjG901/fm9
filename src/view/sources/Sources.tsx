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
  return (
    <Page>
      <div className='sources-view'>
        <h1>{sourcesType}</h1>
        <h2>
          balance:{" "}
          <span className='sum'>
            {plus(...sources.map((s: Source) => s.amount))}
          </span>
        </h2>
        <AddSource addSource={addSource} />
        <FlexWrap
          childrenArray={sources.map((source: Source) => {
            return (
              <SourceCard
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
