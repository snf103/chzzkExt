import { Brand, UAConfig } from "../../types";

export default function extractBrands(
  config: UAConfig,
  version: string | number
) {
  const extractMajor = (full: string | number): string => {
    if (typeof full !== "string") {
      return Math.max(Math.floor(full === Infinity ? 0 : full), 0).toString();
    }

    const asNumber = parseInt(full.split(".")[0]);

    return isNaN(asNumber) ? "0" : Math.max(asNumber, 0).toString();
  };

  const result: Array<Brand> = [
    {
      brand: "(Not(A:Brand",
      version: typeof version === "string" ? "99.0.0.0" : "99",
    }, // for every case
  ];

  const chromeVersion: string = extractMajor(version);

  result.push(
    { brand: "Google Chrome", version: chromeVersion },
    { brand: "Chromium", version: chromeVersion }
  );

  return result;
}
