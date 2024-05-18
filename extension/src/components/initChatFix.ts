import { _before950 } from "../ui/chatFix";

export default function intiChatFix(enable: boolean) {
  if (!enable) {
    if (window.chzzkExt.cfix) {
      clearInterval(window.chzzkExt.cfix);
      delete window.chzzkExt.cfix;
    }
    const chat950 = document.querySelector('style[chzzkExt="chat950"]');
    if (chat950) chat950.remove();
    return;
  }

  window.chzzkExt.cfix = setInterval(() => {
    const chat950 = document.querySelector('style[chzzkExt="chat950"]');
    if (chat950) return;

    const style = document.createElement("style");
    style.setAttribute("chzzkExt", "chat950");
    style.innerHTML = _before950;
    document.head.appendChild(style);
  }, 1000);
}
