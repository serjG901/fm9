/* eslint-disable @typescript-eslint/no-explicit-any */
import "./style.css";
import { ReactNode } from "react";

interface ActionButtonComponent {
  actionWithPayload?: (payload?: any) => void;
  payload?: any;
  children?: ReactNode;
}

export default function ActionButton({
  actionWithPayload = () => {},
  payload = "payload",
  children,
}: ActionButtonComponent) {
  const handleClick = () => {
    actionWithPayload(payload);
  };

  return (
    <button type='button' className='action-button' onClick={handleClick}>
      {children || payload}
    </button>
  );
}
