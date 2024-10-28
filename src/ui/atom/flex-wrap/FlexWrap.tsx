import "./style.css";
import { ReactNode } from "react";

interface FlexWrapComponent {
  children?: ReactNode;
}

export default function FlexWrap({
  children = ["children1", "children2"],
}: FlexWrapComponent) {
  return <div className='flex-wrap'>{children}</div>;
}
