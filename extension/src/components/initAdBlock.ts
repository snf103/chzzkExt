export default function initAdBlock(enable: boolean) {
  if (enable) {
    if (typeof window.chzzkExt.adblock !== "undefined")
      clearInterval(window.chzzkExt.adblock);
    window.chzzkExt.adblock = setInterval(() => {
      try {
        document
          .querySelectorAll(`iframe[title="AD"]`)
          .forEach((x) => x.remove());

        if (window.gladsdk) {
          window.gladsdk.displayAd = function () {};
          window.gladsdk.destroyAdSlots();
        }
      } catch (e) {}
    }, 100);
  } else if (typeof window.chzzkExt.adblock !== "undefined") {
    clearInterval(window.chzzkExt.adblock);
    delete window.chzzkExt.adblock;
  }
}
