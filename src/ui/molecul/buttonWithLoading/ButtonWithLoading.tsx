/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useRef } from "react";
import ActionButton from "../../atom/action-button/ActionButton";
import "./style.css";
import LoadingDots from "../../atom/loading-dots/LoadingDots";
import useActionWithLoading from "../../../helpers/useLoadingDots";

interface ButtonWithLoadingComponent {
  children?: ReactNode;
  action?: (totalPages?: number) => void;
  disabled?: boolean;
  bgColor?: string;
}

export default function ButtonWithLoading({
  children = "action",
  action = () => {},
  disabled = false,
  bgColor = "",
}: ButtonWithLoadingComponent) {
  const { isLoading, actionWithLoading } = useActionWithLoading(action);

  const button = useRef<null | any>(null);

  return (
    <ActionButton
      refer={button}
      actionWithPayload={actionWithLoading}
      disabled={disabled || isLoading}
      bgColor={bgColor}
    >
      {isLoading ? <LoadingDots>{children}</LoadingDots> : children}
    </ActionButton>
  );
}
