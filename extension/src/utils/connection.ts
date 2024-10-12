import {
  configMessagePrefix,
  windowRequestPrefix,
  windowResponsePrefix,
  reqIDspliter,
  globalBroadcastPrefix,
} from "#e/connectionData";
export { configMessagePrefix, windowRequestPrefix };

export function request<T = any>(endpoint: string, args: any = {}) {
  return new Promise<T>((resolve) => {
    const id = Math.random().toString(36).substr(2, 9);
    window.postMessage(
      windowRequestPrefix +
        id +
        reqIDspliter +
        btoa(encodeURIComponent(JSON.stringify({ endpoint, args })))
    );

    const listener = (event: MessageEvent) => {
      if (
        typeof event.data != "string" ||
        event.data.indexOf(windowResponsePrefix) != 0
      )
        return;
      const data = event.data.substr(windowResponsePrefix.length);
      const recvid = data.substr(0, data.indexOf(reqIDspliter));
      if (recvid != id) return;
      let strdata = decodeURIComponent(
        atob(data.substr(data.indexOf(reqIDspliter) + 1))
      );
      if (strdata == undefined || strdata == null || strdata == "undefined")
        strdata = "{}";
      const response = JSON.parse(strdata);

      resolve(response);
    };
    window.addEventListener("message", listener);
  });
}

const listeners: { [key: string]: ((data: any) => void)[] } = {};

export function setupGlobalReciver() {
  window.addEventListener("message", (event) => {
    if (typeof event.data !== "string") return;
    if (event.data.indexOf(globalBroadcastPrefix) != 0) return;
    const data = JSON.parse(
      decodeURIComponent(atob(event.data.substr(globalBroadcastPrefix.length)))
    );
    if (listeners[data.endpoint])
      listeners[data.endpoint].forEach((l) => l(data.args));
  });
}

const ids = new Set<string>();

export function addGlobalListener(
  endpoint: string,
  listener: (data: any) => void,
  id?: string
) {
  if (id && ids.has(id)) return;
  if (id) ids.add(id);
  if (!listeners[endpoint]) listeners[endpoint] = [];
  listeners[endpoint].push(listener);
}
