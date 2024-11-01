import { ReactNode, useState } from "react";
import "./style.css";

interface CollapseComponent {
  collapseLevel?: string;
  title?: string | ReactNode;
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
    if (e.target.open) {
      const { y } = e.target.getBoundingClientRect();
      const scrollY = window.scrollY;
      alert(`${y}, ${scrollY}`);
      if (y < 0) window.scrollTo(0, scrollY + y - 150);
    }
    e.stopPropagation();
  };

  return (
    <details className='collapse' name={collapseLevel} onToggle={handleToggle}>
      <summary>{title}</summary>
      {open ? <div className='collapse-content'>{children}</div> : null}
    </details>
  );
}
