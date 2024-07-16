import { request } from "@/utils/connection";

const media = window.matchMedia("(prefers-color-scheme: dark)");
let enabled = false;
const load = () => {
  if (!enabled) return;
  request(
    "/getLogoURL_" + document.querySelector("html")!.style.colorScheme,
  ).then((v) => {
    const lo = document.querySelector(`[class*=header_logo_chzzk]`);
    if (!lo) return;
    lo.setAttribute("src", v);
  });
};
const loadInterval = setInterval(load, 1000);
export default function initStaticLogo(enable: boolean) {
  enabled = enable;
}
