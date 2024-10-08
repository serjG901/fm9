import { ReactNode, Suspense, useState } from "react";
import "./App.css";
import Menu from "./ui/molecul/menu/Menu";
import Ui from "./pages/ui/Ui";
import Debets from "./pages/debets/Debets";
import Credits from "./pages/credits/Credits";
//import Buys from "./pages/buys/Buys";
import Pays from "./pages/pays/Pays";
import LoadingDots from "./ui/atom/loading-dots/LoadingDots";
import React from "react";
//import Transactions from "./pages/transactions/Transactions";
const Buys = React.lazy(() => import("./pages/buys/Buys"));

function App() {
  const [page, setPage] = useState<string>("buys");

  const pages: { [key: string]: ReactNode } = {
    buys: (
      <Suspense fallback={<LoadingDots>Buys loading</LoadingDots>}>
        <Buys />
      </Suspense>
    ),
    pays: (
      <Suspense fallback={<LoadingDots>Pays loading</LoadingDots>}>
        <Pays />
      </Suspense>
    ),
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
