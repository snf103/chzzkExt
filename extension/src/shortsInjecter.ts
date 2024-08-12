console.log("Shorts Injecter Loaded");

const listener = (event: MessageEvent) => {
  if (typeof event.data !== "object") return;
  if (!("shorts" in event.data)) return;
  const enable = event.data.shorts;

  const btn = document.querySelector(`[chzzkExt="shorts"]`);
  if (!enable && btn) return btn.remove();
  if (enable && btn) return;

  const toolBox = document.querySelector(".si_tool_box");
  if (!toolBox) return;

  const wrp = document.createElement("div");
  wrp.className = "si_btn_wrap";
  wrp.setAttribute("chzzkExt", "shorts");
  const elemt = `<button type="button" class="si_btn type_like" aria-pressed="false" aria-haspopup="dialog" aria-expanded="false"><span class="si_ico_share" style="transform: rotate(90deg) translateY(50%); left: 50%;"></span><span class="si_text" data-like-action="count">다운로드</span></button>`;
  wrp.innerHTML = elemt;
  wrp.addEventListener("click", () => {
    const vd = document.querySelector("video");
    if (!vd) return;
    const url = vd.getAttribute("src");
    if (!url) return;
    window.open(url, "_blank");
  });

  // append to fist
  toolBox.prepend(wrp);
};

window.addEventListener("message", listener);
