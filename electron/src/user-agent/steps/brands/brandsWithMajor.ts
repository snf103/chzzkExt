import { UAConfig } from "../../types";
import extractBrands from "./extractBrands";

export default function brandsWithMajor(config: UAConfig) {
  return extractBrands(config, config.version.browser.major);
}
