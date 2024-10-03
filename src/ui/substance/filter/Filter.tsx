import { Tag } from "../../../interfaces";
import ActionButton from "../../atom/action-button/ActionButton";
import Collapse from "../../atom/collapse/Collapse";
import FlexColumnCenter from "../../atom/flex-column-center/FlexColumnCenter";
import AddTags from "../../molecul/add-tags/AddTags";
import Search from "../../molecul/search/Search";
import "./style.css";

interface FilterComponent {
  search?: string;
  setSearch?: (earch: string) => void;
  filterTags?: Tag[];
  setFilterTags?: (filterTags: Tag[]) => void;
  maybeTags?: Tag[];
}

export default function Filter({
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
      <Collapse title='filter' collapseLevel='menu'>
        <FlexColumnCenter>
          <Search search={search} setSearch={setSearch} />
          <div>
            <AddTags
              tagsFromParrent={filterTags}
              hoistTags={setFilterTags}
              maybeTags={maybeTags}
              onlyMaybeTags
            />
          </div>
        </FlexColumnCenter>
      </Collapse>
      {search !== "" || filterTags.length !== 0 ? (
        <ActionButton actionWithPayload={resetFilter} alert>
          reset filter
        </ActionButton>
      ) : null}
    </div>
  );
}
