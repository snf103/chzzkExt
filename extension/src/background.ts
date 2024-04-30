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

const main = () => {
  log("Main", "Run with config", configInstance.config);
  applyAdBlock();
};

main();
configInstance.addAnyListener(main);
