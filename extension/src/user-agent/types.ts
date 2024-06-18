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

/*
{
    "current": {
        "browser": "chrome",
        "os": "macOS",
        "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6345.203 Safari/537.36",
        "version": {
            "browser": {
                "full": "125.0.6345.203",
                "major": 125
            }
        }
    },
    "brands": {
        "major": [
            {
                "brand": "(Not(A:Brand",
                "version": "99"
            },
            {
                "brand": "Google Chrome",
                "version": "125"
            },
            {
                "brand": "Chromium",
                "version": "125"
            }
        ],
        "full": [
            {
                "brand": "(Not(A:Brand",
                "version": "99.0.0.0"
            },
            {
                "brand": "Google Chrome",
                "version": "125"
            },
            {
                "brand": "Chromium",
                "version": "125"
            }
        ]
    },
    "platform": "macOS",
    "isMobile": false
}*/
