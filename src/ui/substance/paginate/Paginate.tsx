import "./style.css";
import calculatePaginationRenderPage from "../../../helpers/calculatePaginationRenderPage";
import PaginatePageButton from "../../molecul/paginate-page-button/PaginatePageButton";

interface PaginateComponent {
  dublicate?: boolean;
  pageActive?: number;
  pages?: number;
  setPageActive?: (value: number) => void;
  setPreviousPage?: () => void;
  setNextPage?: (totalPages?: number) => void;
}

export default function Paginate({
  dublicate = false,
  pageActive = 1,
  pages = 20,
  setPageActive = () => {},
  /*setPreviousPage = () => {},
  setNextPage = () => {},*/
}: PaginateComponent) {
  if (pages < 2) return null;
  const pageActiveRender = pageActive;
  const renderPages = calculatePaginationRenderPage(pageActiveRender, pages);
  return (
    <div className='paginate'>
     
      {renderPages.map((pageNumber: number | string, index) => {
        if (typeof pageNumber == "string")
          return (
            <div className='paginate-dots' key={pageNumber + index}>
              ..
            </div>
          );
        if (typeof pageNumber == "number")
          return (
            <PaginatePageButton
              dublicate={dublicate}
              key={pageNumber}
              pageNumber={pageNumber}
              action={() => setPageActive(pageNumber)}
              pageActive={pageActiveRender}
            />
          );
      })}
     
    </div>
  );
}
/* <PaginatePageButton
        action={setPreviousPage}
        direction='left'
        disabled={pageActiveRender === 1}
      /> <PaginatePageButton
        action={setNextPage}
        direction='right'
        disabled={pageActiveRender === pages}
      />*/