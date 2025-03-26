import { ReactNode } from "react";
import "./style.css";

interface ContentsComponent {
  children?: ReactNode;
  style?: React.CSSProperties;
}

export default function Contents({
  children = "children",
  style,
}: ContentsComponent) {
  return (
    <div className='contents' style={style}>
      {children}
    </div>
  );
}
