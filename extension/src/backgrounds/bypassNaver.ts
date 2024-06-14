import bypassData from "@/constants/bypassData";
import configInstance, { defaultConfig } from "@config";

type Listener = (
  details: chrome.webRequest.WebRequestHeadersDetails
) => chrome.webRequest.BlockingResponse | void;
const listener: Listener = (details) => {
  const headers = details.requestHeaders;
  if (!headers) return;
  console.log(details.url);
  for (let i = 0; i < headers.length; i++) {
    const name = headers[i].name.toLowerCase();
    if (name.toLowerCase() === "user-agent") {
      headers[i].value = bypassData.bypassAgent;
    } else if (name.startsWith("sec-ch-")) {
      headers[i].value = undefined;
    }
  }

  headers.push(
    {
      name: "sec-ch-ua-platform",
      value: '"' + "macOS" + '"',
    },
    {
      name: "sec-ch-ua",
      value: `"Chromium";v="125.0.6422.142", "Not.A/Brand";v="24.0.0.0"`,
    },
    {
      name: "sec-ch-ua-mobile",
      value: "?0",
    },
    {
      name: "user-Agent",
      value: bypassData.bypassAgent,
    }
  );

  return { requestHeaders: headers.filter((i) => i) };
};
export default function applyBypassNaver() {
  const apply = (enable: boolean) => {
    if (!enable) {
      //   chrome.webRequest.onBeforeSendHeaders.removeListener(listener);
      return;
    }
    const urls = [
      "*://*.chzzk.naver.com/*",
      "*://chzzk.naver.com/*",
      "https://apis.naver.com/neonplayer/vodplay/v1/playback/*",
      "*://*.chzzk.naver.com/",
      "*://chzzk.naver.com/",
      "https://apis.naver.com/neonplayer/vodplay/v1/playback/",
    ];
    chrome.declarativeNetRequest.updateDynamicRules({
      addRules: urls.map((x, i) => {
        return {
          id: 1600 + i,
          action: {
            type: chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,
            requestHeaders: [
              {
                header: "user-Agent",
                operation: chrome.declarativeNetRequest.HeaderOperation.SET,
                value: bypassData.bypassAgent,
              },
            ],
          },
          condition: {
            urlFilter: x,
          },
          priority: 1,
        };
      }),
      removeRuleIds: urls.map((_, i) => 1600 + i),
    });
  };
  apply(configInstance.get("bypassNaver", defaultConfig.bypassNaver));
}
