import { ReactNode } from "react";
import "./style.css";

interface ViewAndPathComponent {
  children?: ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
function getComponentPath(Component: { type: Function }) {
  if (!Component?.type) return "this is not component";
  return Component?.type.toString().match(/(?<=src).*\.tsx/);
}

//{children.length ? children[0].type.name : children.type.name}

export default function ViewAndPath({
  children,
}: ViewAndPathComponent) {
  const childrenForPath = Array.isArray(children) ? children[0] : children;
  return (
    <div className='view-and-path'>
      <div>{getComponentPath(childrenForPath)}</div>
      <div className='show-content-border'>{children}</div>
    </div>
  );
}
