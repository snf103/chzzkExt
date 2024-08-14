export default function initShortsDL(enable: boolean) {
  if (typeof window.chzzkExt.shortsint != "undefined")
    clearInterval(window.chzzkExt.shortsint);

  const interval = setInterval(() => {
    const cw = document.querySelector(`iframe[title="CHZZK Clip Player"]`);
    if (!cw) return;
    const window = (cw as any).contentWindow;
    if (!window) return;
    window.postMessage({ shorts: enable }, "*");
  }, 100);

  window.chzzkExt.shortsint = interval;
}
