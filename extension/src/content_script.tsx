import initAdBlock from "./components/initAdBlock";
import initHideDonation from "./components/initHideDonation";
import initReverseChat from "./components/initReverseChat";
import initVote from "./components/initVote";
import initVoteOpenButton from "./components/initVoteOpenButton";
import defaultConfig from "./constants/defaultConfig";
import log from "./log";

let config: typeof defaultConfig = defaultConfig;
let recvconfig = false;

window.addEventListener("message", (event) => {
  if (typeof event.data !== "string") return;
  if (event.data.indexOf("chzzkExt~") != 0) return;
  const data = JSON.parse(atob(event.data.substr(9)));
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
  window.chzzkExt = window.chzzkExt || {
    lastConfig: "",
  };

  const apply = () => {
    if (!recvconfig) return;

    const nowPath = window.location.pathname;
    const npsp = nowPath.split("/");
    const sp = new URLSearchParams(window.location.search);

    const comparePath = (p: string) => {
      const psp = p.split("/");
      if (psp.length != npsp.length) return false;
      for (let i = 0; i < psp.length; i++) {
        if (psp[i] == "*") continue;
        if (psp[i] != npsp[i]) return false;
      }
      return true;
    };

    if (
      window.chzzkExt.lastAppliedURL == window.location.href &&
      window.chzzkExt.lastAppliedConfig == JSON.stringify(config)
    )
      return;

    log("Main", "Apply", window.location.href, "with config", config);
    window.chzzkExt.lastAppliedURL = window.location.href;
    window.chzzkExt.lastAppliedConfig = JSON.stringify(config);

    initVote(
      config.voteTool && comparePath("/live/*/chat") && sp.get("ext") != null
    );
    initVoteOpenButton(config.voteTool && comparePath("/live/*"));
    initAdBlock(config.adblock);
    initHideDonation(config.hideDonation);
    initReverseChat(config.reversedChat);
  };

  // on path change
  window.addEventListener("popstate", apply);
  window.addEventListener("hashchange", apply);
  window.addEventListener("locationchange", apply);
  window.addEventListener("pushstate", apply);
  window.addEventListener("replacestate", apply);
  window.addEventListener("chzzkExtConfig", apply);

  (() => {
    const oldPushState = history.pushState;
    history.pushState = function pushState(...args) {
      const ret = oldPushState.apply(this, args);
      window.dispatchEvent(new Event("pushstate"));
      window.dispatchEvent(new Event("locationchange"));
      return ret;
    };

    const oldReplaceState = history.replaceState;
    history.replaceState = function replaceState(...args) {
      const ret = oldReplaceState.apply(this, args);
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
