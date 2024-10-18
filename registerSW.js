if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/fm9/sw.js", { scope: "/fm9/" });
  });
}
