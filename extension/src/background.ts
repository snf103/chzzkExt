import vod from "./backgrounds/vod";
import configInstance, { defaultConfig } from "./constants/config";
import log from "./log";

/*
10__ => trackblock
11__ => adblock
12__ => recblock(not working), bannerblock
*/

const applyAdBlock = () => {
  const apply = (enable: boolean) => {
    if (enable)
      chrome.declarativeNetRequest.updateDynamicRules({
        addRules: [
          {
            id: 1101,
            priority: 1,
            action: {
              type: chrome.declarativeNetRequest.RuleActionType.BLOCK,
            },
            condition: {
              urlFilter: "*://nam.veta.naver.com/vas*",
            },
          },
        ],
        removeRuleIds: [1101],
      });
    else
      chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [1101],
      });
  };

  apply(configInstance.get("adblock", defaultConfig.adblock));
};
const applyTrackerBlock = () => {
  // https://apis.naver.com/mcollector/mcollector/qoe
  const apply = (enable: boolean) => {
    const trackerQs = [
      "*://apis.naver.com/mcollector/mcollector/qoe",
      "*://apis.naver.com/mcollector/mcollector/qoe*",
      "*://localhost:17080/api/v1/qoe",
      "*://localhost:17080/api/v1/qoe*",
      "*://lcs.naver.com/m*",
      "*://siape.veta.naver.com/openrtb/nurl",
      "*://siape.veta.naver.com/openrtb/nurl*",
      "*://gfp.veta.naver.com/",
      "*://gfp.veta.naver.com/*",
      "*://apis.naver.com/policy/policy/policy",
      "*://apis.naver.com/policy/policy/policy*",
      "*://ssl.pstatic.net/static/nng/resource/p/static/js/lcslog.js",
    ];
    const indexes: number[] = [];
    for (let i = 0; i < trackerQs.length; i++) {
      indexes.push(1002 + i);
    }
    if (enable) {
      chrome.declarativeNetRequest.updateDynamicRules({
        addRules: trackerQs.map((urlFilter, index) => {
          return {
            id: 1002 + index,
            priority: 1,
            action: {
              type: chrome.declarativeNetRequest.RuleActionType.BLOCK,
            },
            condition: {
              urlFilter,
            },
          };
        }),
        removeRuleIds: indexes,
      });
    } else {
      chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: indexes,
      });
    }
  };

  apply(configInstance.get("blocktracker", defaultConfig.blocktracker));
};
// const applyRecBlock = () => {
//   const apply = (enable: boolean) => {
//     if (enable)
//       chrome.declarativeNetRequest.updateDynamicRules({
//         addRules: [
//           {
//             id: 1201,
//             priority: 1,
//             action: {
//               type: chrome.declarativeNetRequest.RuleActionType.BLOCK,
//             },
//             condition: {
//               urlFilter: "*://api.chzzk.naver.com/service/v1/home/recommended*",
//             },
//           },
//         ],
//         removeRuleIds: [1201],
//       });
//     else
//       chrome.declarativeNetRequest.updateDynamicRules({
//         removeRuleIds: [1201],
//       });
//   };

//   apply(configInstance.get("ed_rec_live", defaultConfig.ed_rec_live));
// };
const applyBannerBlock = () => {
  const apply = (enable: boolean) => {
    if (enable)
      chrome.declarativeNetRequest.updateDynamicRules({
        addRules: [
          {
            id: 1202,
            priority: 1,
            action: {
              type: chrome.declarativeNetRequest.RuleActionType.BLOCK,
            },
            condition: {
              urlFilter: "*://api.chzzk.naver.com/service/v1/banners",
            },
          },
        ],
        removeRuleIds: [1202],
      });
    else
      chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [1202],
      });
  };

  apply(configInstance.get("ed_mi_ban", defaultConfig.ed_mi_ban));
};

const main = () => {
  log("Main", "Run with config", configInstance.config);
  applyAdBlock();
  applyTrackerBlock();
  // applyRecBlock();
  applyBannerBlock();
};

vod();
configInstance.addAnyListener(main);
configInstance.loadFromStorage().then(main);
chrome.runtime.onInstalled.addListener(function () {
  log("Oninstall", "Thank you for installing!");
  main();
});
