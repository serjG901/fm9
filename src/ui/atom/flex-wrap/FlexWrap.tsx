import "./style.css";
import { ReactNode } from "react";

interface FlexWrapComponent {
  childrenArray?: ReactNode[];
}

export default function FlexWrap({
  childrenArray = ["children1", "children2"],
}: FlexWrapComponent) {
  return (
    <div className='flex-wrap'>
      {childrenArray.map((children, index) => (
        <div key={index}>{children}</div>
      ))}
    </div>
  );
}
