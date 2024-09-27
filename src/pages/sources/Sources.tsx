import "./style.css";
import Page from "../../ui/atom/page/Page";
import AddSource from "../../ui/substance/add-source/AddSource";

export default function Sources() {
  return (
    <Page>
      <div className='sources-page'>
        <h1>Sources</h1>
        <AddSource addSource={() => {}} />
      </div>
    </Page>
  );
}
