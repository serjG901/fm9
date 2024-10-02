import React, { ReactNode } from "react";
import "./style.css";

interface HighlightTextComponent {
  bgColor?: string;
  children?: ReactNode;
  padding?: boolean;
}

export default function HighlightText({
  bgColor = "yellow",
  children = "children",
  padding = false,
}: HighlightTextComponent) {
  return (
    <span
      className='highlight-text'
      style={{ ["--self-color-bg"]: bgColor } as React.CSSProperties}
      data-padding={padding ? "padding" : ""}
    >
      {children}
    </span>
  );
}
