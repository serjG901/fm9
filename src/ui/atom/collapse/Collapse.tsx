import { ReactNode, useState } from "react";
import "./style.css";
import correctionScrollPosition from "../../../helpers/correctionScrollPosition";

interface CollapseComponent {
  collapseLevel?: string;
  title?: string | ReactNode;
  children?: ReactNode;
  setHueByDefault?: () => void;
}

export default function Collapse({
  collapseLevel = "collapse",
  title = "collapse",
  children = "children",
  setHueByDefault = () => {},
}: CollapseComponent) {
  const [open, setOpen] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleToggle = (e: any) => {
    setOpen(e.target.open);
    if (e.target.open) {
      correctionScrollPosition(e.target);
    } else {
      setHueByDefault();
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
