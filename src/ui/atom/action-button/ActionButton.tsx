/* eslint-disable @typescript-eslint/no-explicit-any */
import "./style.css";
import { ReactNode, useEffect } from "react";

interface ActionButtonComponent {
  refer?: null | any;
  actionWithPayload?: (payload?: any, e?: any) => void;
  payload?: any;
  children?: ReactNode;
  alert?: boolean;
  attention?: boolean;
  bgColor?: string;
  disabled?: boolean;
  onDown?: () => void;
  showBorder?: boolean;
}

export default function ActionButton({
  refer = null,
  actionWithPayload = () => {},
  payload = null,
  children = "children",
  alert = false,
  attention = false,
  bgColor = "",
  disabled = false,
  onDown = () => {},
  showBorder = false,
}: ActionButtonComponent) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    actionWithPayload(payload, e);
  };
  useEffect(() => {
    if (showBorder)
      document
        .getElementById(`action-button${handleClick.toString() + payload}`)
        ?.focus();
  }, [showBorder]);
  return (
    <button
      ref={refer}
      id={`action-button${handleClick.toString() + payload}`}
      type='button'
      className='action-button'
      onClick={handleClick}
      data-alert={alert ? "alert" : ""}
      data-attention={attention ? "attention" : ""}
      style={{ ["--self-color-bg"]: bgColor } as React.CSSProperties}
      disabled={disabled}
      onMouseDown={onDown}
      onTouchStart={onDown}
      data-show-border={showBorder ? "show" : ""}
    >
      {children || payload}
    </button>
  );
}
