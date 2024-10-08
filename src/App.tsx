import { ReactNode, useState } from "react";
import "./App.css";
import Menu from "./ui/molecul/menu/Menu";
import Ui from "./pages/ui/Ui";
import Debets from "./pages/debets/Debets";
import Credits from "./pages/credits/Credits";
import Buys from "./pages/buys/Buys";
import Pays from "./pages/pays/Pays";
//import Transactions from "./pages/transactions/Transactions";

function App() {
  const [page, setPage] = useState<string>("buys");

  const pages: { [key: string]: ReactNode } = {
    buys: <Buys />,
    pays: <Pays />,
    //transactions: <Transactions />,
    debets: <Debets />,
    credits: <Credits />,
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
