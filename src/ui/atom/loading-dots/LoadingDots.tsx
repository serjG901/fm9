import "./style.css";

interface LoadingDotsComponent {
  children?: React.ReactNode;
}

export default function LoadingDots({ children = "children" }: LoadingDotsComponent) {
  return <h1 className='loading-dots'>{children}</h1>;
}
