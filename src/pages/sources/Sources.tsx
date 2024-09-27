import "./style.css";
import Page from "../../ui/atom/page/Page";
import AddSource from "../../ui/substance/add-source/AddSource";
import SourceCard from "../../ui/thing/source-card/SourceCard";
import { useSourcesStore } from "../../store/sourcesStore";
import FlexWrap from "../../ui/atom/flex-wrap/FlexWrap";

export default function Sources() {
  const [sources, addSource, updateSource, deleteSource] = useSourcesStore((state) => [
    state.sources,
    state.addSource,
    state.updateSource,
    state.deleteSource
  ]);
  return (
    <Page>
      <div className='sources-page'>
        <h1>Sources</h1>
        <AddSource addSource={addSource} />
        <FlexWrap childrenArray={sources.map((source) => {
            return <SourceCard source={source} updateSource={updateSource} deleteSource={deleteSource}/>;
          })}>
        </FlexWrap>
      </div>
    </Page>
  );
}
