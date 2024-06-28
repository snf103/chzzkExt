import applyComponents from "#c/index";
import bypassNaver from "#c/bypassNaver";
import { setupGlobalReciver, request, addGlobalListener } from "#u/connection";

import configInstance, { defaultConfig } from "@config";
import log from "@log";
import { isElectron } from "./utils/browserInfo";

async function main() {
  log("Main", "Environment", process.env.BUILD_ENV!);
  window.chzzkExt = window.chzzkExt || {
    lastConfig: "",
    configInstance,
  };
  setupGlobalReciver();
  const apply = () => {
    if (
      isElectron ||
      configInstance.get("bypassNaver", defaultConfig.bypassNaver)
    )
      bypassNaver();

    if (
      window.chzzkExt.lastAppliedURL == window.location.href &&
      window.chzzkExt.lastAppliedConfig == JSON.stringify(configInstance.config)
    )
      return;

    applyComponents();

    log(
      "Main",
      "Apply",
      window.location.href,
      "with config",
      configInstance.config
    );
    window.chzzkExt.lastAppliedURL = window.location.href;
    window.chzzkExt.lastAppliedConfig = JSON.stringify(configInstance.config);
  };

  // on path change
  const ael = window.addEventListener.bind(window);
  ael("popstate", apply);
  ael("hashchange", apply);
  ael("locationchange", apply);
  ael("pushstate", apply);
  ael("replacestate", apply);
  ael("chzzkExtConfig", apply);

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

  request("/config").then((v) => {
    configInstance.load(v);
    window.chzzkExt.config = v;
    window.dispatchEvent(new Event("chzzkExtConfig"));
  });
  addGlobalListener(
    "/liveConfig",
    (v) => {
      configInstance.load(v);
      window.chzzkExt.config = v;
      window.dispatchEvent(new Event("chzzkExtConfig"));
    },
    "liveConfig"
  );
}
main();
