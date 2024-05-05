import vod from "./backgrounds/vod";
import configInstance, { defaultConfig } from "./constants/config";
import log from "./log";

const applyAdBlock = () => {
  const apply = (enable: boolean) => {
    if (enable)
      chrome.declarativeNetRequest.updateDynamicRules({
        addRules: [
          {
            id: 1001,
            priority: 1,
            action: {
              type: chrome.declarativeNetRequest.RuleActionType.BLOCK,
            },
            condition: {
              urlFilter: "*://nam.veta.naver.com/vas*",
            },
          },
        ],
        removeRuleIds: [1001],
      });
    else
      chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [1001],
      });
  };

  apply(configInstance.get("adblock", defaultConfig.adblock));
};
const applyTrackerBlock = () => {
  // https://apis.naver.com/mcollector/mcollector/qoe
  const apply = (enable: boolean) => {
    if (enable)
      chrome.declarativeNetRequest.updateDynamicRules({
        addRules: [
          {
            id: 1002,
            priority: 1,
            action: {
              type: chrome.declarativeNetRequest.RuleActionType.BLOCK,
            },
            condition: {
              urlFilter: "*://apis.naver.com/mcollector/mcollector/qoe",
            },
          },

          {
            id: 1003,
            priority: 1,
            action: {
              type: chrome.declarativeNetRequest.RuleActionType.BLOCK,
            },
            condition: {
              urlFilter: "*://apis.naver.com/mcollector/mcollector/qoe*",
            },
          },

          {
            id: 1004,
            priority: 1,
            action: {
              type: chrome.declarativeNetRequest.RuleActionType.BLOCK,
            },
            condition: {
              urlFilter: "*://localhost:17080/api/v1/qoe",
            },
          },

          {
            id: 1005,
            priority: 1,
            action: {
              type: chrome.declarativeNetRequest.RuleActionType.BLOCK,
            },
            condition: {
              urlFilter: "*://localhost:17080/api/v1/qoe*",
            },
          },

          {
            id: 1006,
            priority: 1,
            action: {
              type: chrome.declarativeNetRequest.RuleActionType.BLOCK,
            },
            condition: {
              urlFilter: "*://lcs.naver.com/m*",
            },
          },
        ],
        removeRuleIds: [1002, 1003, 1004, 1005, 1006],
      });
    else
      chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [1002, 1003, 1004, 1005, 1006],
      });
  };

  apply(configInstance.get("blocktracker", defaultConfig.blocktracker));
};

const main = () => {
  log("Main", "Run with config", configInstance.config);
  applyAdBlock();
  applyTrackerBlock();
};

vod();
configInstance.addAnyListener(main);
configInstance.loadFromStorage().then(main);
chrome.runtime.onInstalled.addListener(function (details) {
  log("Oninstall", "Thank you for installing!");
  main();
});
