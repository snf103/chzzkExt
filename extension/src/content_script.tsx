import initAdBlock from "./components/initAdBlock";
import initAdSkip from "./components/initAdSkip";
import initautoShowChat from "./components/initautoShowChat";
import intiChatFix from "./components/initChatFix";
import initHideDonation from "./components/initHideDonation";
import initLatencyView from "./components/initLatencyView";
import initReverseChat from "./components/initReverseChat";
import initUI_ED from "./components/initUI_ed";
import initVod from "./components/initVod";
import initVodLoc from "./components/initVodLoc";
import initVote from "./components/initVote";
import initVoteOpenButton from "./components/initVoteOpenButton";
import configInstance, { defaultConfig } from "./constants/config";
import log from "./log";
import { initModal } from "./ui/modal";
let recvconfig = false;

window.addEventListener("message", (event) => {
  if (typeof event.data !== "string") return;
  if (event.data.indexOf("chzzkExt~") != 0) return;
  const data = JSON.parse(atob(event.data.substr(9)));
  if (data.type == "config") {
    recvconfig = true;
    log("MessageListener", "Received config", data.config);
    configInstance.load(data.config);
    window.chzzkExt.config = data.config;
    window.dispatchEvent(new Event("chzzkExtConfig"));
  }
});

declare global {
  interface Window {
    chzzkExt: any;
    __getLiveInfo: () => {
      // ex : 1080p
      resolution: string;
      // ex : 8000
      bitrate: number;
      // ex : 60.0
      fps: string;
      // milisecond
      latency: number;
    };

    gladsdk: {
      displayAd: () => void;
      destroyAdSlots: () => void;
    };
  }
}

async function main() {
  window.chzzkExt = window.chzzkExt || {
    lastConfig: "",
    configInstance,
  };
  const apply = () => {
    initModal();
    if (!recvconfig) return;
    if (configInstance.get("bypassNaver", defaultConfig.bypassNaver)) {
      try {
        Object.defineProperty(navigator, "userAgent", {
          get: () => {
            return "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) <ChzzkExt>";
          },
        });
      } catch (e) {}
    }
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
      window.chzzkExt.lastAppliedConfig == JSON.stringify(configInstance.config)
    )
      return;

    log(
      "Main",
      "Apply",
      window.location.href,
      "with config",
      configInstance.config
    );
    window.chzzkExt.lastAppliedURL = window.location.href;
    window.chzzkExt.lastAppliedConfig = JSON.stringify(configInstance.config);

    // ======================== 여기에 적용할 기능을 추가하세요 ========================
    initVote(
      configInstance.get("voteTool", defaultConfig.voteTool) &&
        comparePath("/live/*/chat") &&
        sp.get("ext") != null
    );
    initAdSkip(configInstance.get("adskip", defaultConfig.adskip));
    initVoteOpenButton(
      configInstance.get("voteTool", defaultConfig.voteTool) &&
        comparePath("/live/*")
    );
    initAdBlock(configInstance.get("adblock", defaultConfig.adblock));
    initHideDonation(
      configInstance.get("hideDonation", defaultConfig.hideDonation)
    );
    initReverseChat(
      configInstance.get("reversedChat", defaultConfig.reversedChat)
    );
    initautoShowChat(
      configInstance.get("autoShowChat", defaultConfig.autoShowChat)
    );
    initLatencyView(
      configInstance.get("latencyView", defaultConfig.latencyView),
      configInstance.get("showBuffer", defaultConfig.showBuffer)
    );
    initVod(
      configInstance.get("vodDownload", defaultConfig.vodDownload) &&
        comparePath("/video/*")
    );
    initVodLoc(
      configInstance.get("saveVodLoc", defaultConfig.saveVodLoc) &&
        comparePath("/video/*")
    );
    intiChatFix(configInstance.get("chat_nfo", defaultConfig.chat_nfo));
    initUI_ED();
    // UI fetch후 다시 적용
    setTimeout(initUI_ED, 500);
    setTimeout(initUI_ED, 1000);
    setTimeout(initUI_ED, 1500);
    setTimeout(initUI_ED, 2000);
    // ======================= /여기에 적용할 기능을 추가하세요/ =======================
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
