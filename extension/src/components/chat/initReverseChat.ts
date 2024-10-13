export default function initReverseChat(enable: boolean) {
  const interval = () => {
    const container = document.querySelector(
      `section[class*=live_container] > [class*=live_wrapper]`
    ) as HTMLDivElement;
    if (!container) return;
    if (enable) {
      container.style.flexDirection = "row-reverse";
    } else {
      container.style.flexDirection = "row";
    }
  };

  if (typeof window.chzzkExt.revchat != "undefined") {
    clearInterval(window.chzzkExt.revchat);
  }

  window.chzzkExt.revchat = setInterval(interval, 1000);
}
