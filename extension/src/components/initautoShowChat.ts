export default function initautoShowChat(enable: boolean) {
  if (typeof window.chzzkExt.autoShowChat !== "undefined")
    clearInterval(window.chzzkExt.autoShowChat);
  if (enable) {
    window.chzzkExt.autoShowChat = setInterval(() => {
      document
        .querySelectorAll(
          `div[class*="no_content_type_chat"] > button[class*="no_content_button"]`
        )
        .forEach((x) => (x as HTMLButtonElement).click());
    }, 100);
  }
}
