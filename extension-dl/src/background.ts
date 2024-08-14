import vod from "@/backgrounds/vod";

import configInstance, { defaultConfig } from "@config";
import log from "@log";

const main = async () => {
  log("Main", "Run with config", configInstance.config);
};

vod();
configInstance.addConditionListener(
  (changes) => {
    return changes.some((key) => {
      return key in defaultConfig;
    });
  },
  () => {
    main();
  }
);
configInstance.loadFromStorage().then(main);
chrome.runtime.onInstalled.addListener(function () {
  log("Oninstall", "Thank you for installing!");
  main();
});
