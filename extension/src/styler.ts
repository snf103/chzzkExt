export default function styler(id: string, css: string) {
  const dc = document.querySelector(`style[chzzkExt='${id}']`);
  if (dc) return;
  const style = document.createElement("style");
  style.setAttribute("chzzkExt", id);
  style.innerHTML = css;
  document.head.appendChild(style);
}
