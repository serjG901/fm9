import { ReactNode } from "react";
import "./style.css";

interface CollapseComponent {
  collapseLevel?: string;
  title?: string;
  children?: ReactNode;
}

export default function Collapse({
  collapseLevel = "collapse",
  title = "collapse",
  children = "children",
}: CollapseComponent) {
  return (
    <details className='collapse' name={collapseLevel}>
      <summary>{title}</summary>
      <div className='collapse-content'>{children}</div>
    </details>
  );
}
