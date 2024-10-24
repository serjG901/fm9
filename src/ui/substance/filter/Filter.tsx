import { Tag, TextesByLanguage } from "../../../interfaces";
import ActionButton from "../../atom/action-button/ActionButton";
import Collapse from "../../atom/collapse/Collapse";
import FlexColumnCenter from "../../atom/flex-column-center/FlexColumnCenter";
import AddTags from "../../molecul/add-tags/AddTags";
import Search from "../../molecul/search/Search";
import "./style.css";

interface FilterComponent extends TextesByLanguage {
  search?: string;
  setSearch?: (earch: string) => void;
  filterTags?: Tag[];
  setFilterTags?: (filterTags: Tag[]) => void;
  maybeTags?: Tag[];
}

export default function Filter({
  textes = {},
  search = "",
  setSearch = () => {},
  filterTags = [],
  setFilterTags = () => {},
  maybeTags = [],
}: FilterComponent) {
  const resetFilter = () => {
    setSearch("");
    setFilterTags([]);
  };

  return (
    <div className='filter'>
      <FlexColumnCenter>
        <Collapse title={textes["filter"] || "filter"} collapseLevel='menu'>
          <FlexColumnCenter>
            <Search search={search} setSearch={setSearch} />
            <div>
              <AddTags
                textes={textes}
                tagsFromParrent={filterTags}
                hoistTags={setFilterTags}
                maybeTags={maybeTags}
                onlyMaybeTags
              />
            </div>
          </FlexColumnCenter>
        </Collapse>
        {search !== "" || filterTags.length !== 0 ? (
          <div className='reset'>
            <ActionButton actionWithPayload={resetFilter} alert>
              {textes["reset_filter"] || "reset filter"}
            </ActionButton>
          </div>
        ) : null}
      </FlexColumnCenter>
    </div>
  );
}
