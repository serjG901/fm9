import "./style.css";

import ActionButton from "../../atom/action-button/ActionButton";
import Collapse from "../../atom/collapse/Collapse";

interface MenuComponent {
  collapseLevel?: string;
  title?: string;
  options?: string[];
  actionWithPayload?: (payload: string) => void;
}

export default function Menu({
  collapseLevel = "component",
  title = "menu",
  options = ["one", "two", "three"],
  actionWithPayload = () => {},
}: MenuComponent) {
  return (
    <Collapse collapseLevel={collapseLevel} title={title}>
      {options.map((opt) => {
        return (
          <ActionButton
            key={opt}
            actionWithPayload={actionWithPayload}
            payload={opt}
          >
            {opt}
          </ActionButton>
        );
      })}
    </Collapse>
  );
}
