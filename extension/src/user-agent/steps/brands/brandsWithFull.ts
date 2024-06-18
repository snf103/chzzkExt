import { UAConfig } from "@n/types";
import extractBrands from "./extractBrands";

export default function brandsWithFull(config: UAConfig) {
  return extractBrands(config, config.version.browser.full);
}
