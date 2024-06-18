import { UAConfig } from "@n/types";
import extractBrands from "./extractBrands";

export default function brandsWithMajor(config: UAConfig) {
  return extractBrands(config, config.version.browser.major);
}
