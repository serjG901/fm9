import { ReactNode, useState } from "react";
import "./App.css";
import Menu from "./ui/molecul/menu/Menu";
import Ui from "./pages/ui/Ui";

function App() {
  const [page, setPage] = useState<string>("ui");

  const pages: { [key: string]: ReactNode } = {
    ui: <Ui />,
  };

  const handleActionMenu = (payload: string) => {
    setPage(payload);
  };

  return (
    <>
      <Menu
        collapseLevel='menu'
        title='pages'
        options={Object.keys(pages)}
        actionWithPayload={handleActionMenu}
      />
      {pages[page] || null}
    </>
  );
}

export default App;
