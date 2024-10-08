//import { ReactNode, useState } from "react";
import "./App.css";
/*import Menu from "./ui/molecul/menu/Menu";
import Ui from "./pages/ui/Ui";
import Debets from "./pages/debets/Debets";
import Credits from "./pages/credits/Credits";
import Buys from "./pages/buys/Buys";
import Pays from "./pages/pays/Pays";*/
import { useBuysStore } from "./store/buysStore";
import { usePaysStore } from "./store/paysStore";
import ActionButton from "./ui/atom/action-button/ActionButton";
//import Transactions from "./pages/transactions/Transactions";

function App() {
 // const [page, setPage] = useState<string>("buys");

  const [updateFromForB] = useBuysStore(state => [state.updateFromFor]);
  const [updateFromForP] = usePaysStore(state => [state.updateFromFor]);
/*
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
  };*/
  const update = () => {
    updateFromForB();
    updateFromForP();
  }
/*  <Menu
        collapseLevel='menu'
        title='pages'
        options={Object.keys(pages)}
        actionWithPayload={handleActionMenu}
      />
      {pages[page] || null }*/
  return (
    <><ActionButton actionWithPayload={update}>update</ActionButton>
    
    </>
  );
}

export default App;
