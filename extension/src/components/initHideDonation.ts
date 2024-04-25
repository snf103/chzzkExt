export default function initHideDonation(enable: boolean) {
  if (typeof window.chzzkExt.hideDonation !== "undefined")
    clearInterval(window.chzzkExt.hideDonation);
  if (enable) {
    window.chzzkExt.hideDonation = setInterval(() => {
      document
        .querySelectorAll(`[class*="live_chatting_list_donation"]`)
        .forEach((x) => ((x as HTMLDivElement).style.display = "none"));
    }, 100);
  } else {
    window.chzzkExt.hideDonation = setInterval(() => {
      document
        .querySelectorAll(`[class*="live_chatting_list_donation"]`)
        .forEach((x) => ((x as HTMLDivElement).style.display = "unset"));
    }, 100);
  }
}
