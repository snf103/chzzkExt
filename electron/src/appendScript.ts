(() => {
  if (document.getElementById("chk-update-banner")) return;
  const disshow = localStorage.getItem("disshow-update");
  if (disshow === "true") return;

  const elem = document.createElement("div");
  elem.id = "chk-update-banner";
  elem.style.position = "fixed";
  elem.style.bottom = "1rem";
  elem.style.left = "1rem";
  elem.style.padding = "1rem";
  elem.style.borderRadius = ".7rem";
  elem.style.zIndex = "19720";
  elem.style.color = "var(--color-content-02)";
  elem.style.background = "var(--color-bg-topbanner)";
  elem.style.boxShadow = "0 0 10px rgba(0, 0, 0, .1)";

  const row = document.createElement("div");
  row.style.display = "flex";
  row.style.alignItems = "center";
  row.style.gap = "30px";
  row.style.justifyContent = "space-between";
  row.style.width = "100%";

  const h1 = document.createElement("h3");
  h1.innerText = "치직치지직+ 새로운 버전 발견!";

  const closeButton = document.createElement("button");
  closeButton.innerText = "X";
  closeButton.style.padding = ".3rem";
  closeButton.style.borderRadius = "1rem";
  closeButton.style.color = "var(--color-content-02)";
  closeButton.style.border = "none";
  closeButton.style.cursor = "pointer";
  closeButton.style.fontSize = "1rem";
  closeButton.style.transition = "background .3s";

  closeButton.onclick = () => {
    elem.remove();
  };

  row.appendChild(h1);
  row.appendChild(closeButton);

  elem.appendChild(row);

  const row2 = document.createElement("div");
  row2.style.display = "flex";
  row2.style.alignItems = "center";
  row2.style.gap = "10px";

  const button = document.createElement("button");
  button.innerText = "다운로드 하러 가기";
  button.style.marginTop = ".5rem";
  button.style.padding = ".5rem 1rem";
  button.style.borderRadius = ".5rem";
  button.style.background = "var(--color-bg-topbanner)";
  button.style.color = "var(--color-content-02)";
  button.style.border = "1px solid var(--color-content-02)";
  button.style.cursor = "pointer";
  button.style.transition = "background .3s";

  button.onmouseenter = () => {
    button.style.background = "var(--color-content-02)";
    button.style.color = "var(--color-bg-topbanner)";
  };

  button.onmouseleave = () => {
    button.style.background = "var(--color-bg-topbanner)";
    button.style.color = "var(--color-content-02)";
  };

  button.onclick = () => {
    fetch("chzzkext://update");
  };

  const ignoreThisUpdateButton = document.createElement("button");
  ignoreThisUpdateButton.innerText = "이번 업데이트 건너뛰기";
  ignoreThisUpdateButton.style.marginTop = ".5rem";
  ignoreThisUpdateButton.style.padding = ".5rem 1rem";
  ignoreThisUpdateButton.style.borderRadius = ".5rem";
  ignoreThisUpdateButton.style.background = "var(--color-bg-topbanner)";
  ignoreThisUpdateButton.style.color = "var(--color-content-02)";
  ignoreThisUpdateButton.style.border = "1px solid var(--color-content-02)";
  ignoreThisUpdateButton.style.cursor = "pointer";
  ignoreThisUpdateButton.style.transition = "background .3s";

  ignoreThisUpdateButton.onmouseenter = () => {
    ignoreThisUpdateButton.style.background = "var(--color-content-02)";
    ignoreThisUpdateButton.style.color = "var(--color-bg-topbanner)";
  };

  ignoreThisUpdateButton.onmouseleave = () => {
    ignoreThisUpdateButton.style.background = "var(--color-bg-topbanner)";
    ignoreThisUpdateButton.style.color = "var(--color-content-02)";
  };

  ignoreThisUpdateButton.onclick = () => {
    localStorage.setItem("disshow-update", "true");
    elem.remove();
  };

  row2.appendChild(ignoreThisUpdateButton);

  row2.appendChild(button);
  elem.appendChild(row2);

  document.body.appendChild(elem);
})();
