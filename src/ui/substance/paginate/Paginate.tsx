import "./style.css";
import calculatePaginationRenderPage from "../../../helpers/calculatePaginationRenderPage";
import PaginatePageButton from "../../molecul/paginate-page-button/PaginatePageButton";
import ActionButton from "../../atom/action-button/ActionButton";

interface PaginateComponent {
  pageActive?: number;
  pages?: number;
  setPageActive?: (value: number) => void;
  setPreviousPage?: () => void;
  setNextPage?: (totalPages?: number) => void;
}

export default function Paginate({
  pageActive = 1,
  pages = 20,
  setPageActive = () => {},
  setPreviousPage = () => {},
  setNextPage = () => {},
}: PaginateComponent) {
  if (pages < 2) return null;
  const pageActiveRender = pageActive;
  const renderPages = calculatePaginationRenderPage(pageActiveRender, pages);
  return (
    <div className='paginate'>
      <PaginatePageButton
        action={setPreviousPage}
        direction='left'
        disabled={pageActiveRender === 1}
      />
      {renderPages.map((pageNumber: number | string, index) => {
        if (typeof pageNumber == "string")
          return (
            <div className='paginate-dots' key={pageNumber + index}>
              <ActionButton disabled>..</ActionButton>
            </div>
          );
        if (typeof pageNumber == "number")
          return (
            <PaginatePageButton
              key={pageNumber}
              pageNumber={pageNumber}
              action={() => setPageActive(pageNumber)}
              pageActive={pageActiveRender}
            />
          );
      })}
      <PaginatePageButton
        action={setNextPage}
        direction='right'
        disabled={pageActiveRender === pages}
      />
    </div>
  );
}
