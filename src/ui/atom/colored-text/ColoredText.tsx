import React, { ReactNode } from "react";
import "./style.css";

interface ColoredTextComponent {
  color?: string;
  children?: ReactNode;
  padding?: boolean;
  bold?: boolean;
}

export default function ColoredText({
  color = "yellow",
  children = "children",
  padding = false,
  bold = false,
}: ColoredTextComponent) {
  return (
    <span
      className='colored-text'
      style={{ ["--self-color"]: color } as React.CSSProperties}
      data-padding={padding ? "padding" : ""}
      data-bold={bold ? "bold" : ""}
    >
      {children}
    </span>
  );
}
