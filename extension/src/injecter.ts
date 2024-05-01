import log from "./log";

function injectScript(file_path: string, tag: string) {
  const node = document.getElementsByTagName(tag)[0];
  const script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.setAttribute("src", file_path);
  node.appendChild(script);
  script.addEventListener("load", () => {
    chrome.storage.local.get("config", (items) => {
      window.postMessage(
        "chzzkExt~" +
          btoa(JSON.stringify({ type: "config", config: items.config }))
      );
    });
  });
}
injectScript(chrome.runtime.getURL("js/content_script.js"), "body");

chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (const key in changes) {
    const storageChange = changes[key];
    log(
      "Injecter",
      "storage",
      "Storage key '",
      key,
      "' in namespace '",
      namespace,
      "' changed.",
      "Old value was",
      storageChange.oldValue,
      ", new value is",
      storageChange.newValue
    );
    if (key == "config") {
      window.postMessage(
        "chzzkExt~" +
          btoa(
            JSON.stringify({ type: "config", config: storageChange.newValue })
          )
      );
    }
  }
});
