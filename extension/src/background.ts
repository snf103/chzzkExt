import defaultConfig from "./constants/defaultConfig";
import log from "./log";

let config: typeof defaultConfig = defaultConfig;

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
              urlFilter:
                "https://nam.veta.naver.com/vas?vsi=LIVE_CHZZK_NDP_SCH&vcl=-1&so=0&rl=pre%3A1%2Cmid%3A1%2Cpost%3A1&ct=web",
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

  apply(config.adblock);
};

const main = () => {
  if (config == undefined) {
    return;
  }
  log("Main", "Run with config", config);
  applyAdBlock();
};

const readConfig = () => {
  chrome.storage.local.get("config", (data) => {
    if (data.config) {
      const requiredKey = Object.keys(defaultConfig);
      let need2save = false;
      let nconf = data.config || {};
      for (const key of requiredKey) {
        if (typeof nconf[key] == "undefined") {
          log(
            "Read config",
            "Set default config",
            key,
            "as",
            (defaultConfig as any)[key]
          );
          nconf[key] = (defaultConfig as any)[key];
          need2save = true;
        }
      }
      if (need2save) {
        chrome.storage.local.set({ config: nconf });
        return;
      } else config = data.config;
    } else {
      chrome.storage.local.set({ config: defaultConfig });
      config = defaultConfig;
    }
    main();
  });
};

chrome.storage.onChanged.addListener((changes) => {
  for (const key in changes) {
    if (key == "config") readConfig();
  }
});
