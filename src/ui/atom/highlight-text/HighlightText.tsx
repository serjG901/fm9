import React, { ReactNode } from "react";
import "./style.css";

interface HighlightTextComponent {
  color?: string;
  children?: ReactNode;
}

export default function HighlightText({
  color = "yellow",
  children = "children",
}: HighlightTextComponent) {
  return (
    <span
      className='highlight-text'
      style={{ ["--color-bg-self"]: color } as React.CSSProperties}
    >
      {children}
    </span>
  );
}
