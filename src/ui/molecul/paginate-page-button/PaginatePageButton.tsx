import { useEffect, useState } from "react";
import ActionButton from "../../atom/action-button/ActionButton";
import "./style.css";
import LoadingDots from "../../atom/loading-dots/LoadingDots";

interface PaginatePageButtonComponent {
  dublicate?: boolean;
  pageNumber?: string | number;
  action?: (totalPages?: number) => void;
  pageActive?: number | number;
  direction?: "left" | "right" | "";
  disabled?: boolean;
}

export default function PaginatePageButton({
  dublicate = false,
  pageNumber = "",
  action = () => {},
  pageActive = 1,
  direction = "",
  disabled = false,
}: PaginatePageButtonComponent) {
  const [isLoading, setIsLoading] = useState(1);
  const actionWithScroll = () => {
   // setTimeout(() => window.scrollTo(0, 0), 300);
    action();
    setIsLoading(3);
  };
  const handleChangePage = () => setIsLoading(2);
  useEffect(() => {
    if (isLoading === 3) setIsLoading(1);
  }, [isLoading]);
  return (
    <div
      className={`paginate-page-button ${
        pageActive && pageActive === pageNumber
          ? "paginate-page-button_active"
          : ""
      } ${disabled ? "paginate-page-button_disabled" : ""}`}
    >
      <ActionButton
        onDown={disabled ? () => {} : handleChangePage}
        actionWithPayload={actionWithScroll}
        disabled={disabled || (!!pageActive && pageActive === pageNumber)}
        showBorder={pageActive === pageNumber}
        payload={
          !dublicate ? pageNumber : !direction ? "dublicate" + pageNumber : direction
        }
      >
        {isLoading === 2 ? (
          <LoadingDots>
            {!direction ? (
              pageNumber
            ) : direction === "left" ? (
              <span>{"<"}</span>
            ) : (
              <span>{">"}</span>
            )}
          </LoadingDots>
        ) : !direction ? (
          pageNumber
        ) : direction === "left" ? (
          <span>{"<"}</span>
        ) : (
          <span>{">"}</span>
        )}
      </ActionButton>
    </div>
  );
}
