/* eslint-disable @typescript-eslint/no-explicit-any */
import "./style.css";
import { ReactNode, useEffect } from "react";

interface ActionButtonComponent {
  actionWithPayload?: (payload?: any, e?: any) => void;
  payload?: any;
  children?: ReactNode;
  alert?: boolean;
  bgColor?: string;
  disabled?: boolean;
  onDown?: () => void;
  showBorder?: boolean;
}

export default function ActionButton({
  actionWithPayload = () => {},
  payload = null,
  children = "children",
  alert = false,
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
      id={`action-button${handleClick.toString() + payload}`}
      type='button'
      className='action-button'
      onClick={handleClick}
      data-alert={alert ? "alert" : ""}
      style={{ ["--self-color-bg"]: bgColor } as React.CSSProperties}
      disabled={disabled}
      onMouseDown={onDown}
      data-show-border={showBorder ? "show" : ""}
    >
      {children || payload}
    </button>
  );
}
