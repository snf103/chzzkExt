import initVote from "./components/initVote";
import initVoteOpenButton from "./components/initVoteOpenButton";
import defaultConfig from "./constants/defaultConfig";
import log from "./log";

let config: typeof defaultConfig = defaultConfig;
let recvconfig = false;
window.addEventListener("message", (event) => {
  if (typeof event.data !== "string") return;
  if (event.data.indexOf("chzzkExt~") != 0) return;
  var data = JSON.parse(atob(event.data.substr(9)));
  if (data.type == "config") {
    recvconfig = true;
    log("MessageListener", "Received config", data.config);
    config = data.config;
    window.chzzkExt.config = config;
    window.dispatchEvent(new Event("chzzkExtConfig"));
  }
});

declare global {
  interface Window {
    chzzkExt: any;
  }
}

async function main() {
  window.chzzkExt = window.chzzkExt || {};

  const apply = () => {
    if (!recvconfig) return;

    const nowPath = window.location.pathname;
    const sp = new URLSearchParams(window.location.search);

    log("Main", "Apply", window.location.href, "with config", config);

    if (window.chzzkExt.lastAppliedURL == window.location.href) return;
    window.chzzkExt.lastAppliedURL = window.location.href;

    if (config.voteTool) {
      if (/live\/.*\/chat/.test(nowPath)) {
        if (sp.has("ext")) initVote();
      } else if (/live\/.*/.test(nowPath)) initVoteOpenButton();
    }

    if (config.adblock) {
      if (typeof window.chzzkExt.adblock !== "undefined")
        clearInterval(window.chzzkExt.adblock);
      window.chzzkExt.adblock = setInterval(() => {
        document
          .querySelectorAll(`iframe[title="AD"]`)
          .forEach((x) => x.remove());
      }, 1000);
    }
  };

  // on path change
  window.addEventListener("popstate", apply);
  window.addEventListener("hashchange", apply);
  window.addEventListener("locationchange", apply);
  window.addEventListener("pushstate", apply);
  window.addEventListener("replacestate", apply);
  window.addEventListener("chzzkExtConfig", apply);

  (() => {
    let oldPushState = history.pushState;
    history.pushState = function pushState() {
      // @ts-ignore
      let ret = oldPushState.apply(this, arguments);
      window.dispatchEvent(new Event("pushstate"));
      window.dispatchEvent(new Event("locationchange"));
      return ret;
    };

    let oldReplaceState = history.replaceState;
    history.replaceState = function replaceState() {
      // @ts-ignore
      let ret = oldReplaceState.apply(this, arguments);
      window.dispatchEvent(new Event("replacestate"));
      window.dispatchEvent(new Event("locationchange"));
      return ret;
    };

    window.addEventListener("popstate", () => {
      window.dispatchEvent(new Event("locationchange"));
    });
  })();

  apply();
}
main();
