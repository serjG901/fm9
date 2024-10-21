import "./style.css";

import ActionButton from "../../atom/action-button/ActionButton";
import Collapse from "../../atom/collapse/Collapse";

interface MenuComponent {
  choisedOption?: string;
  collapseLevel?: string;
  title?: string;
  options?: string[];
  actionWithPayload?: (payload: string) => void;
  textes?: { [key: string]: string };
}

export default function Menu({
  choisedOption = "one",
  collapseLevel = "component",
  title = "menu",
  options = ["one", "two", "three"],
  actionWithPayload = () => {},
  textes = {},
}: MenuComponent) {
  return (
    <Collapse collapseLevel={collapseLevel} title={title}>
      {options.map((opt) => {
        return (
          <ActionButton
            key={opt}
            actionWithPayload={actionWithPayload}
            payload={opt}
            showBorder={choisedOption === opt}
          >
            {textes[opt] || opt}
          </ActionButton>
        );
      })}
    </Collapse>
  );
}
