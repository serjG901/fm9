import React, { ReactNode } from "react";
import "./style.css";

interface HighlightTextComponent {
  color?: string;
  children?: ReactNode;
  padding?: boolean;
}

export default function HighlightText({
  color = "yellow",
  children = "children",
  padding = false,
}: HighlightTextComponent) {
  return (
    <span
      className='highlight-text'
      style={{ ["--color-bg-self"]: color } as React.CSSProperties}
      data-padding={padding ? "padding" : ""}
    >
      {children}
    </span>
  );
}
