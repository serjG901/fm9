import { ReactNode, Suspense, useEffect, useState } from "react";
import "./App.css";
import Menu from "./ui/molecul/menu/Menu";
import Ui from "./pages/ui/Ui";
import Debits from "./pages/debits/Debits";
import Credits from "./pages/credits/Credits";
//import Buys from "./pages/buys/Buys";
//import Pays from "./pages/pays/Pays";
import LoadingDots from "./ui/atom/loading-dots/LoadingDots";
import React from "react";
import SettingsApp from "./pages/settings-app/SettingsApp";
import { useSettingsStore } from "./store/settingsStore";
//import SelfTransactions from "./pages/self-transactions/SelfTransactions";
const API_IS_PROD = import.meta.env.VITE_API_IS_PROD;
import { name as appName } from "../package.json";
import { useLanguageStore } from "./store/languageStore";
import PWABadge from "./PWABadge";
import HelpApp from "./pages/help-app/HelpApp";

const lastHref = window.location.href.split("/").at(-1);
console.log(lastHref);
if (lastHref === "assetlinks.json")
  window.location.replace(`/${appName}/.well-known/assetlinks.json`);
else if (lastHref !== "") window.location.replace(`/${appName}/`);

function App() {
  const pageHref = (window.location.href.split("/").at(-1) as string) || "buys";

  const Buys = React.lazy(() => import("./pages/buys/Buys"));
  const Pays = React.lazy(() => import("./pages/pays/Pays"));
  const [page, setPage] = useState<string>(pageHref);
  const [hue] = useSettingsStore((state) => [state.hue]);
  const [textes] = useLanguageStore((state) => [state.textes()]);

  let pages: { [key: string]: ReactNode } = {
    buys: (
      <Suspense
        fallback={
          <LoadingDots>
            <h1></h1>
          </LoadingDots>
        }
      >
        <Buys textes={textes} />
      </Suspense>
    ),
    pays: (
      <Suspense
        fallback={
          <LoadingDots>
            <h1></h1>
          </LoadingDots>
        }
      >
        <Pays textes={textes} />
      </Suspense>
    ),
    //transactions: <SelfTransactions />,
    debits: <Debits textes={textes} />,
    credits: <Credits textes={textes} />,
    settings: <SettingsApp textes={textes} />,
    help: <HelpApp textes={textes} />,
  };

  if (API_IS_PROD === "0") pages = { ...pages, ui: <Ui textes={textes} /> };

  const handleActionMenu = (payload: string) => {
    setPage(payload);
    window.history.pushState({ page: payload }, "", `/${appName}/${payload}`);
  };

  useEffect(() => {
    const controller = new AbortController();
    window.addEventListener(
      "popstate",
      (event) => {
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
        title={<span>&#9776;</span>}
        options={Object.keys(pages)}
        actionWithPayload={handleActionMenu}
        textes={textes}
      />
      {pages[page] || null}
      <PWABadge />
    </div>
  );
}
export default App;
