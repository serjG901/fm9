import "./style.css";

import ActionButton from "../../atom/action-button/ActionButton";
import Collapse from "../../atom/collapse/Collapse";
import { TextesByLanguage } from "../../../interfaces";
import FlexWrap from "../../atom/flex-wrap/FlexWrap";
import { ReactNode } from "react";

interface MenuComponent extends TextesByLanguage {
  choisedOption?: string;
  collapseLevel?: string;
  title?: string | ReactNode;
  options?: string[];
  actionWithPayload?: (payload: string) => void;
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
    <div className='menu'>
      <Collapse collapseLevel={collapseLevel} title={title}>
        <FlexWrap>
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
        </FlexWrap>
      </Collapse>
    </div>
  );
}
