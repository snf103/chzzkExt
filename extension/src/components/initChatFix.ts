import _before950 from "#s/chatFix.static.css";

export default function intiChatFix(enable: boolean, nff: boolean) {
  if (!enable) {
    if (window.chzzkExt.cfix) {
      clearInterval(window.chzzkExt.cfix);
      delete window.chzzkExt.cfix;
    }
    const chat950 = document.querySelector('[chzzkExt="chat950"]');
    if (chat950) chat950.remove();
  }

  if (!nff) {
    if (window.chzzkExt.cfnf) {
      clearInterval(window.chzzkExt.cfnf);
      delete window.chzzkExt.cfnf;
    }
    const chat950 = document.querySelector('[chzzkExt="chatnff"]');
    if (chat950) chat950.remove();
  }

  if (nff)
    window.chzzkExt.cfnf = setInterval(() => {
      if (!nff) return;
      const chat950 = document.querySelector('style[chzzkExt="chatnff"]');
      if (chat950) return;

      const style = document.createElement("style");
      style.setAttribute("chzzkExt", "chatnff");
      style.innerHTML = _before950
        .replace("@media (max-width: 950px) {", "")
        .replace("@media (max-width: 950px){", "")
        .trim()
        .slice(0, -1);
      document.head.appendChild(style);
    }, 1000);
  else if (enable)
    window.chzzkExt.cfix = setInterval(() => {
      if (!enable) return;
      const chat950 = document.querySelector('style[chzzkExt="chat950"]');
      if (chat950) return;

      const style = document.createElement("style");
      style.setAttribute("chzzkExt", "chat950");
      style.innerHTML = _before950;
      document.head.appendChild(style);
    }, 1000);
}
