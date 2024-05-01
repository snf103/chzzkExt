export default function initAdSkip(enable: boolean) {
  if (!enable) {
    if (typeof window.chzzkExt.adskip != "undefined") {
      clearInterval(window.chzzkExt.adskip);
      delete window.chzzkExt.adskip;
    }
    return;
  }

  if (typeof window.chzzkExt.adskip != "undefined") return;
  let repsk = false;
  window.chzzkExt.adskip = setInterval(() => {
    const elem = document.querySelector(
      `div[data-role="countDownEl"].skip_area.hide`
    );
    if (elem) {
      if (!repsk) {
        repsk = true;
        return;
      }
      const btn = document.querySelector(
        `button[data-role="skipBtn"]`
      ) as HTMLButtonElement;
      if (btn) btn.click();
    } else repsk = false;
  }, 200);
}
