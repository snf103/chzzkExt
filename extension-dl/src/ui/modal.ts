import css from "#s/modelui.static.css";
import styler from "#u/styler";

export default function openModal(config: {
  title?: string;
  body: string | HTMLElement | ((close: () => void) => HTMLElement);
  onClose?: () => void;
}) {
  styler("modal", css);

  const modal = document.createElement("div");
  modal.className = "chzzkExtModalContainer";
  const cnbox = document.createElement("div");
  cnbox.className = "chzzkExtModalContent";
  const head = document.createElement("div");
  head.className = "chzzkExtHeader";
  const title = document.createElement("div");
  title.className = "chzzkExtTitle";
  title.innerText = config.title || "치직치지직";
  head.appendChild(title);

  const body = document.createElement("div");
  body.className = "chzzkExtBody";
  body.innerHTML = typeof config.body == "string" ? config.body : "";
  if (config.body instanceof HTMLElement) body.appendChild(config.body);
  else if (typeof config.body == "function")
    body.appendChild(
      config.body(() => {
        modal.remove();
        if (config.onClose) config.onClose();
      })
    );

  cnbox.appendChild(head);
  cnbox.appendChild(body);
  modal.appendChild(cnbox);
  document.body.appendChild(modal);

  cnbox.addEventListener("click", (e) => {
    e.stopImmediatePropagation();
    e.stopPropagation();
  });
  modal.addEventListener("click", () => {
    modal.remove();
    if (config.onClose) config.onClose();
  });
}
