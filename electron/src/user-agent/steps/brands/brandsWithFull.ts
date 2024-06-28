import { UAConfig } from "../../types";
import extractBrands from "./extractBrands";

export default function brandsWithFull(config: UAConfig) {
  return extractBrands(config, config.version.browser.full);
}
