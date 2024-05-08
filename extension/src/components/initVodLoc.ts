export default function initVodLoc(enable: boolean) {
  if (!enable) {
    if (typeof window.chzzkExt.vodloc !== "undefined") {
      clearInterval(window.chzzkExt.vodloc);
      delete window.chzzkExt.vodloc;
    }
    return;
  }

  if (typeof window.chzzkExt.vodloc !== "undefined")
    clearInterval(window.chzzkExt.vodloc);
  window.chzzkExt.vodloc = setInterval(() => {
    const vod = document.querySelector(
      "video.webplayer-internal-video"
    ) as HTMLVideoElement;
    if (!vod) return;

    const nowtime = vod.currentTime;
    const nowid = location.pathname.split("/")[2];

    const lastLoc = localStorage.getItem(`chzzkExt_vodloc_${nowid}`);
    if (lastLoc && vod.getAttribute("chzzkExt") !== "locloaded") {
      vod.currentTime = parseFloat(lastLoc);
      vod.setAttribute("chzzkExt", "locloaded");
    }

    localStorage.setItem(`chzzkExt_vodloc_${nowid}`, nowtime.toString());
  }, 100);
}
