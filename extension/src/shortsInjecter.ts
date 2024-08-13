console.log("Shorts Injecter Loaded");

(() => {
  if (typeof window.chzzkExt == "undefined") window.chzzkExt = {};
  window.chzzkExt.interav = setInterval(() => {
    const is_current = document.querySelector(".is_current");
    if (!is_current) return;

    const enable = window.chzzkExt.shorts;
    const bodygid = document.body.getAttribute("data-gdid");
    if (!bodygid) return;
    const btn = is_current.querySelector(`[chzzkExt="shorts"]`);
    console.log("ENABLE", enable);
    if (!enable) {
      if (btn) btn.remove();
      return;
    }
    if (enable && btn) return;

    const toolBox = is_current.querySelector(".si_tool_box");
    if (!toolBox) return;

    const wrp = document.createElement("div");
    wrp.className = "si_btn_wrap";
    wrp.setAttribute("chzzkExt", "shorts");
    wrp.setAttribute("data-gdid", bodygid);
    const elemt = `<button type="button" class="si_btn type_like" aria-pressed="false" aria-haspopup="dialog" aria-expanded="false"><span class="si_ico_share" style="transform: rotate(90deg) translateY(50%); left: 50%;"></span><span class="si_text" data-like-action="count">다운로드</span></button>`;
    wrp.innerHTML = elemt;
    wrp.addEventListener("click", () => {
      const vd = is_current.querySelector("video");
      if (!vd) return;
      const url = vd.getAttribute("src");
      if (!url) return;
      window.open(url, "_blank");
    });

    // append to fist
    toolBox.prepend(wrp);
  }, 300);
})();

const listener = (event: MessageEvent) => {
  if (typeof event.data !== "object") return;
  if (!("shorts" in event.data)) return;
  const enable = event.data.shorts;
  window.chzzkExt.shorts = enable;
};

window.addEventListener("message", listener);
