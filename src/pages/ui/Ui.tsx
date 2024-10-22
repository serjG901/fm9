import "./style.css";
import { useState } from "react";
import Menu from "../../ui/molecul/menu/Menu";
import Page from "../../ui/atom/page/Page";
import components from "../../ui/components";
import { TextesByLanguage } from "../../interfaces";

export default function Ui({ textes = {} }: TextesByLanguage) {
  const [component, setComponent] = useState<string>("");

  const handleActionMenu = (payload: string) => {
    setComponent(payload);
  };

  return (
    <Page>
      <div className='ui-page'>
        <h1>UI</h1>
        <Menu
          collapseLevel='menu'
          title={textes["components"] || "components"}
          options={Object.keys(components)}
          actionWithPayload={handleActionMenu}
        />
        {!components[component]
          ? null
          : !Array.isArray(components[component])
          ? components[component]
          : components[component].map((c) => c)}
      </div>
    </Page>
  );
}
