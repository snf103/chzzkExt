import styler from "#u/styler";

export default function onoffer(element: HTMLElement | null, hide: boolean) {
  if (!element) return;
  if (hide) {
    element.setAttribute("chzzkUI", "off");
  } else {
    element.setAttribute("chzzkUI", "on");
  }

  styler(
    "chzzkUI",
    `[chzzkUI="off"] { display: none! important; margin: 0px! important; padding: 0px! important; }`
  );
}
