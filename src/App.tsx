import { ReactNode, Suspense, useEffect, useState } from "react";
import "./App.css";
import Menu from "./ui/molecul/menu/Menu";
import Ui from "./pages/ui/Ui";
import Debets from "./pages/debets/Debets";
import Credits from "./pages/credits/Credits";
//import Buys from "./pages/buys/Buys";
//import Pays from "./pages/pays/Pays";
import LoadingDots from "./ui/atom/loading-dots/LoadingDots";
import React from "react";
import SettingsApp from "./pages/settings-app/SettingsApp";
import { useSettingsStore } from "./store/settingsStore";
//import ToTop from "./ui/molecul/to-top/ToTop";
//import SelfTransactions from "./pages/self-transactions/SelfTransactions";
const API_IS_PROD = import.meta.env.VITE_API_IS_PROD;
import { name as appName } from "../package.json";

if (window.location.href.split("/").at(-1) !== "") window.location.replace("/");

function App() {
  const pageHref = (window.location.href.split("/").at(-1) as string) || "buys";

  const Buys = React.lazy(() => import("./pages/buys/Buys"));
  const Pays = React.lazy(() => import("./pages/pays/Pays"));
  const [page, setPage] = useState<string>(pageHref);
  const [hue] = useSettingsStore((state) => [state.hue]);

  let pages: { [key: string]: ReactNode } = {
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
    settings: <SettingsApp />,
  };

  if (API_IS_PROD === "0") pages = { ...pages, ui: <Ui /> };

  const handleActionMenu = (payload: string) => {
    setPage(payload);
    window.history.pushState({ page: payload }, "", `/${appName}/${payload}`);
  };

  useEffect(() => {
    const controller = new AbortController();
    window.addEventListener(
      "popstate",
      (event) => {
        console.log("State received: ", event.state);
        setPage(event.state && event.state.page ? event.state?.page : "buys");
      },
      {
        signal: controller.signal,
      }
    );
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className='app' style={{ "--hue": hue } as React.CSSProperties}>
      <Menu
        choisedOption={page}
        collapseLevel='menu'
        title='pages'
        options={Object.keys(pages)}
        actionWithPayload={handleActionMenu}
      />
      {pages[page] || null}
    </div>
  );
}
//<ToTop />
export default App;
