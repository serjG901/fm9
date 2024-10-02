import "./style.css";
import HighlightText from "../../atom/highlight-text/HighlightText";

interface SearchedNameComponent {
  name?: string;
  search?: string;
}

export default function SearchedName({
  name = "name",
  search = "am",
}: SearchedNameComponent) {
  return (
    <>
      {name === search ? (
        <HighlightText>{search}</HighlightText>
      ) : (
        name.split(search).map((part, i, parts) =>
          part === "" ? (
            <HighlightText key={Math.random()}>{search}</HighlightText>
          ) : i > 0 && parts[i - 1] !== "" && part !== "" ? (
            <span key={Math.random()}>
              <HighlightText>{search}</HighlightText>
              {part}
            </span>
          ) : (
            <span key={Math.random()}>{part}</span>
          )
        )
      )}
    </>
  );
}
