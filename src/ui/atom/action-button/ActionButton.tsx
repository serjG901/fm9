/* eslint-disable @typescript-eslint/no-explicit-any */
import "./style.css";
import { ReactNode } from "react";

interface ActionButtonComponent {
  actionWithPayload?: (payload?: any, e?: any) => void;
  payload?: any;
  children?: ReactNode;
  alert?: boolean;
  bgColor?: string;
  disabled?: boolean;
  onDown?: () => void;
}

export default function ActionButton({
  actionWithPayload = () => {},
  payload = null,
  children = "children",
  alert = false,
  bgColor = "",
  disabled = false,
  onDown = () => {},
}: ActionButtonComponent) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    actionWithPayload(payload, e);
  };

  return (
    <button
      type='button'
      className='action-button'
      onClick={handleClick}
      data-alert={alert ? "alert" : ""}
      style={{ ["--self-color-bg"]: bgColor } as React.CSSProperties}
      disabled={disabled}
      onMouseDown={onDown}
    >
      {children || payload}
    </button>
  );
}
