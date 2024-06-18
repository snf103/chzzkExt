import apply from "@n/steps/apply";
const fromRange = (min: number, max: number): number => {
  min = Math.ceil(min);

  return Math.floor(Math.random() * (Math.floor(max) - min + 1)) + min;
};
export async function applyRandomAgent() {
  const macOSVersions = [
    "14.6",
    "14.5",
    "14.4",
    "14.3",
    "14.2",
    "14.1",
    "14",
    "13.7",
    "13.6",
    "13.5",
    "13.4",
    "13.3",
    "13.2",
    "13.1",
    "13",
    "12.6",
    "12.5",
    "12.4",
    "12.3",
    "12.2",
    "12.1",
    "12.0",
    "11.3",
    "11.2",
    "11.1",
    "11",
    "10_13",
    "10",
  ];
  const genChromeVersion = (
    maxMajor?: number,
    majorDelta: number = 2
  ): [major: number, full: string] => {
    const variants = {
      major: { min: 122, max: 124 }, // 👈 periodically we should update those values
      patch: { min: 6261, max: 6356 }, // 👈 same here
      build: { min: 194, max: 226 }, // 👈 and here
    };

    if (maxMajor) {
      variants.major.max = Math.max(maxMajor, 0);
      variants.major.min = Math.max(maxMajor - majorDelta, 0);
    }

    const major = fromRange(variants.major.min, variants.major.max);

    return [
      major,
      `${major}.0.${fromRange(
        variants.patch.min,
        variants.patch.max
      )}.${fromRange(variants.build.min, variants.build.max)}`,
    ];
  };
  const chromeVersion = genChromeVersion();
  const ua = [
    "Mozilla/5.0",
    `(Macintosh; Intel Mac OS X ${
      macOSVersions[fromRange(0, macOSVersions.length - 1)]
    })`,
    "AppleWebKit/537.36",
    "(KHTML, like Gecko)",
    `Chrome/${chromeVersion[1]}`,
    "Safari/537.36",
  ].join(" ");

  console.log("Apply random user agent", ua);

  await apply({
    browser: "chrome",
    os: "macOS",
    userAgent: ua,
    version: {
      browser: {
        full: chromeVersion[1],
        major: chromeVersion[0],
      },
    },
  });

  return ua;
}
