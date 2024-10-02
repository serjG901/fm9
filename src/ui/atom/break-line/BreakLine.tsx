import { ReactNode } from "react";
import "./style.css";

interface BreakLineComponent {
  children?: ReactNode;
}

export default function BreakLine({
  children = "break line",
}: BreakLineComponent) {
  return (
    <div key={children?.toString()} className='break-line'>
      {children}
    </div>
  );
}
