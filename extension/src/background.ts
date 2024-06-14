import vod from "@/backgrounds/vod";
import applyBypassNaver from "@/backgrounds/bypassNaver";

import configInstance, { defaultConfig } from "@config";
import log from "@log";

/*
10__ => trackblock
11__ => adblock
12__ => recblock(not working), bannerblock
13__ => sidebarblock
*/
const enableRules: string[] = [];
const disableRules: string[] = [];
const clearRule = () => {
  enableRules.length = 0;
};
const enableRule = (ruleId: string) => {
  enableRules.push(ruleId);
};
const disableRule = (ruleId: string) => {
  disableRules.push(ruleId);
};
const applyRule = async () => {
  await chrome.declarativeNetRequest.updateEnabledRulesets({
    enableRulesetIds: enableRules,
    disableRulesetIds: disableRules,
  });
  log("ApplyRule", "Apply rules", {
    enableRules,
    disableRules,
  });
};
const applyAdBlock = () => {
  const apply = (enable: boolean) => {
    if (enable) enableRule("adblock");
    else disableRule("adblock");
  };

  apply(configInstance.get("adblock", defaultConfig.adblock));
};
const applyTrackerBlock = () => {
  // https://apis.naver.com/mcollector/mcollector/qoe
  const apply = (enable: boolean) => {
    if (enable) enableRule("trackerblock");
    else disableRule("trackerblock");
  };

  apply(configInstance.get("blocktracker", defaultConfig.blocktracker));
};
const applyBannerBlock = () => {
  const apply = (enable: boolean) => {
    if (enable) enableRule("bannerblock");
    else disableRule("bannerblock");
  };

  apply(configInstance.get("ed_mi_ban", defaultConfig.ed_mi_ban));
};
const applySidebarBlock = () => {
  // 추천 스트리머
  (() => {
    const apply = (enable: boolean) => {
      if (enable) enableRule("main_recstr");
      else disableRule("main_recstr");
    };

    apply(configInstance.get("ed_sc_rc", defaultConfig.ed_sc_rc));
  })();
  // 파트너 스트리머
  (() => {
    const apply = (enable: boolean) => {
      if (enable) enableRule("main_recptn");
      else disableRule("main_recptn");
    };

    apply(configInstance.get("ed_sc_pt", defaultConfig.ed_sc_pt));
  })();
  // 팔로우 스트리머
  (() => {
    const apply = (enable: boolean) => {
      if (enable) enableRule("main_recflw");
      else disableRule("main_recflw");
    };

    apply(configInstance.get("ed_sc_fl", defaultConfig.ed_sc_fl));
  })();
};

const main = () => {
  log("Main", "Run with config", configInstance.config);
  clearRule();
  // ===============================
  applyAdBlock();
  applyTrackerBlock();
  applyBannerBlock();
  applySidebarBlock();
  applyBypassNaver();
  // ===============================
  applyRule();
};

vod();
configInstance.addAnyListener(main);
configInstance.loadFromStorage().then(main);
chrome.runtime.onInstalled.addListener(function () {
  log("Oninstall", "Thank you for installing!");
  main();
});
