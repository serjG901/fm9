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
  //const [state, setState] = useState({});
  const [open, setOpen] = useState(false);
  //const [height, setHeight] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleToggle = (e: any) => {
    // setState(e.target);
    setOpen(e.target.open);
    // console.log(e.target.lastChild.getBoundingClientRect());
    e.stopPropagation();
  };
  /*
  useEffect(() => {
    if (open) {
      console.log(state.lastChild.getBoundingClientRect());
      const h = state.lastChild.getBoundingClientRect();
      setHeight(h);
    }
  }, [open]);style={{ "--height-content": height + "px" } as React.CSSProperties}
  */
  return (
    <div className='collapse-wrap'>
      <details
        className='collapse'
        name={collapseLevel}
        onToggle={handleToggle}
      >
        <summary>{title}</summary>
        {open ? <div className='collapse-content'>{children}</div> : null}
      </details>
      <div className='collapse-content-hide'>{children}</div>
    </div>
  );
}
