const ChromeTabs = require("chrome-tabs");
const el = document.querySelector(".chrome-tabs");
const chromeTabs = new ChromeTabs();
const views = document.getElementById("views");
chromeTabs.init(el, {
  tabOverlapDistance: 14,
  minWidth: 45,
  maxWidth: 243,
});

document.documentElement.classList.add("dark-theme");
el.classList.add("chrome-tabs-dark-theme");

el.addEventListener("activeTabChange", ({ detail }) => {
  console.log("Active tab changed", detail);
  const webviews = document.querySelectorAll("webview");
  webviews.forEach((webview) => {
    webview.style.display =
      webview.getAttribute("data-tab") === detail.tabEl.getAttribute("data-tab")
        ? "block"
        : "none";
    webview.style.userSelect =
      webview.style.display === "block" ? "auto" : "none";
  });
});
el.addEventListener("tabAdd", ({ detail }) => {
  const id = Math.random().toString();
  detail.tabEl.setAttribute("data-tab", id);
  const webview = document.createElement("webview");
  webview.setAttribute("data-tab", id);
  webview.src = "https://chzzk.naver.com/";
  webview.style.height = "100%";
  webview.style.width = "100%";
  webview.setAttribute("autosize", "on");
  let title = "New Tab";
  let favicon = false;
  const updateTab = () => {
    chromeTabs.updateTab(detail.tabEl, { title, favicon });
  };
  webview.addEventListener("page-title-updated", (e) => {
    title = e.title;
    updateTab();
  });
  webview.addEventListener("page-favicon-updated", (e) => {
    if (e.favicons.length == 0) {
      favicon = false;
    } else {
      favicon = e.favicons[0];
    }
    updateTab();
  });
  views.appendChild(webview);
  const inter = setInterval(() => {
    const sr = webview.shadowRoot;
    if (!sr) return;
    clearInterval(inter);
    const st = sr.querySelector("style");
    st.textContent = `iframe {height: 100%}`;
    sr.appendChild(st);
    console.log("Webview loaded");
    console.log(sr);
  }, 100);
});
el.addEventListener("tabRemove", ({ detail }) => {
  const webview = document.querySelector(
    `webview[data-tab="${detail.tabEl.getAttribute("data-tab")}"]`,
  );
  webview.remove();
});

chromeTabs.addTab({
  title: "New Tab",
  favicon: false,
});

fetch("chzzkext://ismac")
  .then((v) => v.text())
  .then((t) => {
    if (t == "true") document.getElementById("buttons").style.width = "74px";
  });
