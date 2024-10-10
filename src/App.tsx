import { ReactNode, Suspense, useState } from "react";
import "./App.css";
import Menu from "./ui/molecul/menu/Menu";
import Ui from "./pages/ui/Ui";
import Debets from "./pages/debets/Debets";
import Credits from "./pages/credits/Credits";
//import Buys from "./pages/buys/Buys";
//import Pays from "./pages/pays/Pays";
import LoadingDots from "./ui/atom/loading-dots/LoadingDots";
import React from "react";
import SelfLoadDb from "./pages/self-load-db/SelfLoadDb";
//import SelfTransactions from "./pages/self-transactions/SelfTransactions";

function App() {
  const Buys = React.lazy(() => import("./pages/buys/Buys"));
  const Pays = React.lazy(() => import("./pages/pays/Pays"));
  const [page, setPage] = useState<string>("buys");

  const pages: { [key: string]: ReactNode } = {
    buys: (
      <Suspense
        fallback={
          <LoadingDots>
            <h1>Buys</h1>
          </LoadingDots>
        }
      >
        <Buys />
      </Suspense>
    ),
    pays: (
      <Suspense
        fallback={
          <LoadingDots>
            <h1>Pays</h1>
          </LoadingDots>
        }
      >
        <Pays />
      </Suspense>
    ),
    //transactions: <SelfTransactions />,
    debets: <Debets />,
    credits: <Credits />,
    ui: <Ui />,
    db: <SelfLoadDb />,
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
