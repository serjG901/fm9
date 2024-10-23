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
  const [state, setState] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleToggle = (e: any) => {
    setState(e.target.open);
    e.stopPropagation();
  };
  return (
    <div className='collapse-wrap'>
      <details
        className='collapse'
        name={collapseLevel}
        onToggle={handleToggle}
      >
        <summary>{title}</summary>
        {state ? <div className='collapse-content'>{children}</div> : null}
      </details>
      
    </div>
  );
}
