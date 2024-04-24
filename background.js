const listeners = {};

chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (var key in changes) {
    var storageChange = changes[key];
    console.log(
      'Storage key "%s" in namespace "%s" changed. ' +
        'Old value was "%s", new value is "%s".',
      key,
      namespace,
      storageChange.oldValue,
      storageChange.newValue
    );
    if (typeof listeners[key] != "undefined")
      listeners[key].forEach((callback) => callback(storageChange.newValue));
  }
});

const addListener = (key, callback) => {
  if (typeof listeners[key] == "undefined") listeners[key] = [];
  listeners[key].push(callback);
};
const removeListener = (key, callback) => {
  if (typeof listeners[key] == "undefined") return;
  listeners[key] = listeners[key].filter((cb) => cb !== callback);
};

const applyAdBlock = () => {
  const apply = (value) => {
    if (value)
      chrome.declarativeNetRequest.updateDynamicRules({
        addRules: [
          {
            id: 1001,
            priority: 1,
            action: {
              type: "block",
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

  addListener("block.ad", apply);
};

const main = () => {
  applyAdBlock();
};

main();
