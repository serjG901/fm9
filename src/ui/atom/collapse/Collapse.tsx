import { ReactNode, useState } from "react";
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
  const [state, setState] = useState(0);
  return (
    <details
      className='collapse'
      name={collapseLevel}
      onClick={() => setState((s) => s + 1)}
    >
      <summary>{title}</summary>
      {state % 2 ? <div className='collapse-content'>{children}</div> : null}
    </details>
  );
}
