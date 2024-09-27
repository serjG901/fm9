/* eslint-disable @typescript-eslint/no-explicit-any */
import "./style.css";
import { ReactNode } from "react";

interface ActionButtonComponent {
  actionWithPayload?: (payload?: any) => void;
  payload?: any;
  children?: ReactNode;
  alert?: boolean;
}

export default function ActionButton({
  actionWithPayload = () => {},
  payload = null,
  children = "children",
  alert = false,
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
    >
      {children || payload}
    </button>
  );
}
