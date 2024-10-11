import ActionButton from "../../atom/action-button/ActionButton";
import "./style.css";

interface PaginatePageButtonComponent {
  pageNumber?: string | number;
  action?: (totalPages?: number) => void;
  pageActive?: number | number;
  direction?: "left" | "right" | "";
  disabled?: boolean;
}

export default function PaginatePageButton({
  pageNumber = "",
  action = () => {},
  pageActive = 1,
  direction = "",
  disabled = false,
}: PaginatePageButtonComponent) {
  const actionWithScroll = () => {
    setTimeout(() => window.scrollTo(0, 0), 300);
    action();
  };
  return (
    <div
      className={`paginate-page-button ${
        pageActive && pageActive === pageNumber
          ? "paginate-page-button_active"
          : ""
      } ${disabled ? "paginate-page-button_disabled" : ""}`}
    >
      <ActionButton
        actionWithPayload={actionWithScroll}
        disabled={disabled || (!!pageActive && pageActive === pageNumber)}
      >
        {!direction ? (
          pageNumber
        ) : direction === "left" ? (
          <span>&#11207;</span>
        ) : (
          <span>&#11208;</span>
        )}
      </ActionButton>
    </div>
  );
}
