import st from "#s/reverse.static.css";
import styler from "@/utils/styler";
export default function initReverseChat(enable: boolean) {
  const interval = () => {
    styler("reverse", st, enable);
  };

  if (typeof window.chzzkExt.revchat != "undefined") {
    clearInterval(window.chzzkExt.revchat);
  }

  window.chzzkExt.revchat = setInterval(interval, 1000);
}
