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
  const [open, setOpen] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleToggle = (e: any) => {
    setOpen(e.target.open);
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
        {open ? (
          <div key={open ? 1 : Math.random()} className='collapse-content'>
            {children}
          </div>
        ) : null}
      </details>
    </div>
  );
}
