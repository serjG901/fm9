import { ReactNode, useState } from "react";
import "./App.css";
import Menu from "./ui/molecul/menu/Menu";
import Ui from "./pages/ui/Ui";
import Sources from "./pages/sources/Sources";
import Credits from "./pages/credits/Credits";
import Buys from "./pages/buys/Buys";
import Pays from "./pages/pays/Pays";

function App() {
  const [page, setPage] = useState<string>("ui");

  const pages: { [key: string]: ReactNode } = {
    ui: <Ui />,
    buys: <Buys />,
    pays: <Pays />,
    sources: <Sources />,
    credits: <Credits />,
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
