import { UAConfig } from "../types";
import extractBrandsWithMajor from "./brands/brandsWithMajor";
import extractBrandsWithFull from "./brands/brandsWithFull";

// copy-paste of chrome.declarativeNetRequest.RuleActionType type (FireFox v124 does not have it)
// https://developer.chrome.com/docs/extensions/reference/api/declarativeNetRequest#type-RuleActionType
enum RuleActionType {
  BLOCK = "block", // Block the network request
  REDIRECT = "redirect", // Redirect the network request
  ALLOW = "allow", // Allow the network request. The request won't be intercepted if there is an allow rule which matches it
  UPGRADE_SCHEME = "upgradeScheme", // Upgrade the network request url's scheme to https if the request is http or ftp
  MODIFY_HEADERS = "modifyHeaders", // Modify request/response headers from the network request
  ALLOW_ALL_REQUESTS = "allowAllRequests", // Allow all requests within a frame hierarchy, including the frame request itself
}

// copy-paste of chrome.declarativeNetRequest.HeaderOperation type (FireFox v124 does not have it)
// https://developer.chrome.com/docs/extensions/reference/api/declarativeNetRequest#type-HeaderOperation
enum HeaderOperation {
  SET = "set", // Sets a new value for the specified header, removing any existing headers with the same name
  REMOVE = "remove", // Removes all entries for the specified header
}

// Note: the rule IDs must be unique, and do not change them after the extension is published.
// The rule IDs are used to remove the existing rules before adding new ones.
const RuleIDs: {
  readonly [_ in
    | "ReplaceUserAgent"
    | "ReplaceClientHints"
    | "ProvidePayload"
    | "Cond2ReplaceUserAgent"
    | "Cond2ReplaceClientHints"
    | "Cond2ProvidePayload"]: number;
} = {
  ReplaceUserAgent: 1,
  ReplaceClientHints: 2,
  ProvidePayload: 3,
  Cond2ReplaceUserAgent: 4,
  Cond2ReplaceClientHints: 5,
  Cond2ProvidePayload: 6,
};

enum HeaderNames {
  USER_AGENT = "User-Agent",
  CLIENT_HINT_FULL_VERSION = "Sec-CH-UA-Full-Version", // deprecated, https://mzl.la/3g1NzEI
  CLIENT_HINT_PLATFORM_VERSION = "Sec-CH-UA-Platform-Version", // https://mzl.la/3yyNXAY
  CLIENT_HINT_BRAND_MAJOR = "Sec-CH-UA", // https://mzl.la/3EaQyoi
  CLIENT_HINT_BRAND_FULL = "Sec-CH-UA-Full-Version-List", // https://mzl.la/3C3x5TT
  CLIENT_HINT_PLATFORM = "Sec-CH-UA-Platform", // https://mzl.la/3EbrbTj
  CLIENT_HINT_MOBILE = "Sec-CH-UA-Mobile", // https://mzl.la/3SYTA3f
  SERVER_TIMING = "server-timing", // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Server-Timing
}

export default function apply(config: UAConfig) {
  const brandsWithMajor = extractBrandsWithMajor(config);
  const brandsWithFull = extractBrandsWithFull(config);

  const rules = [
    {
      id: RuleIDs.ReplaceUserAgent,
      action: {
        type: RuleActionType.MODIFY_HEADERS,
        requestHeaders: [
          {
            operation: HeaderOperation.SET,
            header: HeaderNames.USER_AGENT,
            value: config.userAgent,
          },
        ],
      },
      priority: 1,
    },
    {
      id: RuleIDs.ReplaceClientHints,
      priority: 1,
      action: {
        type: RuleActionType.MODIFY_HEADERS,
        requestHeaders: [
          brandsWithMajor.length
            ? {
                operation: HeaderOperation.SET,
                header: HeaderNames.CLIENT_HINT_BRAND_MAJOR,
                value: brandsWithMajor
                  .map((b) => `"${b.brand}";v="${b.version}"`)
                  .join(", "),
              }
            : {
                operation: HeaderOperation.REMOVE,
                header: HeaderNames.CLIENT_HINT_BRAND_MAJOR,
              },
          brandsWithFull.length
            ? {
                operation: HeaderOperation.SET,
                header: HeaderNames.CLIENT_HINT_BRAND_FULL,
                value: brandsWithFull
                  .map((b) => `"${b.brand}";v="${b.version}"`)
                  .join(", "),
              }
            : {
                operation: HeaderOperation.REMOVE,
                header: HeaderNames.CLIENT_HINT_BRAND_FULL,
              },
          {
            operation: HeaderOperation.SET,
            header: HeaderNames.CLIENT_HINT_PLATFORM,
            value: `"macOS"`,
          },
          {
            operation: HeaderOperation.SET,
            header: HeaderNames.CLIENT_HINT_MOBILE,
            value: "?0",
          },
          {
            operation: HeaderOperation.REMOVE,
            header: HeaderNames.CLIENT_HINT_FULL_VERSION,
          },
          {
            operation: HeaderOperation.REMOVE,
            header: HeaderNames.CLIENT_HINT_PLATFORM_VERSION,
          },
        ],
      },
    },
  ];

  return rules;
}
