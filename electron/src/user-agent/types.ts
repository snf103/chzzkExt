const exampleUAConfig = {
  browser: "chrome",
  os: "macOS",
  userAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 12.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.6287.218 Safari/537.36",
  version: {
    browser: {
      full: "124.0.6287.218",
      major: 124,
    },
  },
};
export type UAConfig = typeof exampleUAConfig;
export type Brand = { brand: string; version: string };
