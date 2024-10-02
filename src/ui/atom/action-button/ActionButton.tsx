/* eslint-disable @typescript-eslint/no-explicit-any */
import "./style.css";
import { ReactNode } from "react";

interface ActionButtonComponent {
  actionWithPayload?: (payload?: any) => void;
  payload?: any;
  children?: ReactNode;
  alert?: boolean;
  bgColor?: string;
}

export default function ActionButton({
  actionWithPayload = () => {},
  payload = null,
  children = "children",
  alert = false,
  bgColor = "",
}: ActionButtonComponent) {
  const handleClick = () => {
    actionWithPayload(payload);
  };

  return (
    <button
      type='button'
      className='action-button'
      onClick={handleClick}
      data-alert={alert ? "alert" : ""}
      style={{ ["--self-color-bg"]: bgColor } as React.CSSProperties}
    >
      {children || payload}
    </button>
  );
}
