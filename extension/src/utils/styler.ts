export default function styler(id: string, css: string, onoff = true) {
  const dc = document.querySelector(`style[chzzkExt='${id}']`);
  if (!onoff) {
    if (dc) {
      dc.remove();
    }
    return;
  }
  if (dc) return;
  const style = document.createElement("style");
  style.setAttribute("chzzkExt", id);
  style.innerHTML = css;
  document.head.appendChild(style);
}
