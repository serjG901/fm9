import { ReactNode } from "react";
import "./style.css";

interface ContentsComponent {
  children?: ReactNode;
}

export default function Contents({ children = "children" }: ContentsComponent) {
  return <div className='contents'>{children}</div>;
}
