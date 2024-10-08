import "./style.css";

interface LoadingDotsComponent {
  children?: React.ReactNode;
}

export default function LoadingDots({ children = "children" }: LoadingDotsComponent) {
  return <div className='loading-dots'>{children}</div>;
}
