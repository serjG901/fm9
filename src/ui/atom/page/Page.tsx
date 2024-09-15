import "./style.css";
import { ReactNode } from "react";

interface PageComponent {
  children?: ReactNode;
}

export default function Page({ children = "children" }: PageComponent) {
  return <div className='page'>{children}</div>;
}
