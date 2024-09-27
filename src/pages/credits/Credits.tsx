import "./style.css";
import Page from "../../ui/atom/page/Page";
import AddSource from "../../ui/substance/add-source/AddSource";
import { useCreditsStore } from "../../store/creditsStore";
import FlexWrap from "../../ui/atom/flex-wrap/FlexWrap";
import SourceCard from "../../ui/thing/source-card/SourceCard";

export default function Credits() {
  const [sources, addSource, updateSource, deleteSource] = useCreditsStore(
    (state) => [
      state.sources,
      state.addSource,
      state.updateSource,
      state.deleteSource,
    ]
  );
  return (
    <Page>
      <div className='credits-page'>
        <h1>Credits</h1>
        <AddSource addSource={addSource} />
        <FlexWrap
          childrenArray={sources.map((source) => {
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
