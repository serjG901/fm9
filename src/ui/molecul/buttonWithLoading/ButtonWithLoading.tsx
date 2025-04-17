/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useEffect, useRef, useState } from "react";
import ActionButton from "../../atom/action-button/ActionButton";
import "./style.css";
import LoadingDots from "../../atom/loading-dots/LoadingDots";
import correctionScrollPosition from "../../../helpers/correctionScrollPosition";

interface ButtonWithLoadingComponent {
  children?: ReactNode;
  action?: (totalPages?: number) => void;
  disabled?: boolean;
}

export default function ButtonWithLoading({
  children = "action",
  action = () => {},
  disabled = false,
}: ButtonWithLoadingComponent) {
  const [isActionStatus, setIsActionStatus] = useState(1);

  const button = useRef<null | any>(null);

  const actionWithLoading = () => {
    setIsActionStatus(2);
  };
  useEffect(() => {
    let timer = 0;
    if (isActionStatus === 2) {
      setIsActionStatus(3);
    }
    if (isActionStatus === 3) {
      action();

      timer = setTimeout(() => setIsActionStatus(4), 300);
    }
    if (isActionStatus === 4) {
      correctionScrollPosition(button.current);
      clearTimeout(timer);
      timer = setTimeout(() => setIsActionStatus(1), 2000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isActionStatus]);
  return (
    <ActionButton
      refer={button}
      actionWithPayload={actionWithLoading}
      disabled={disabled || isActionStatus === 2 || isActionStatus === 3}
    >
      {isActionStatus === 2 || isActionStatus === 3 ? (
        <LoadingDots>{children}</LoadingDots>
      ) : (
        children
      )}
    </ActionButton>
  );
}
