import {
  windowResponsePrefix,
  reqIDspliter,
  windowRequestPrefix,
  globalBroadcastPrefix,
} from "#e/connectionData";

class Router {
  routes: {
    [key: string]: <T>(req: any, id: string) => void | Promise<void>;
  };
  constructor() {
    this.routes = {};
  }
  handle<T = any>(
    endpoint: string,
    handler: (req: any, res: (data: T) => void) => void | Promise<void>
  ) {
    this.routes[endpoint] = (req: T, id: string) => {
      handler(req, (data: T) => {
        const strd = encodeURIComponent(JSON.stringify(data));
        window.postMessage(
          windowResponsePrefix + id + reqIDspliter + btoa(strd)
        );
      });
    };
  }
  request<T = any>(endpoint: string, args: any, id: string) {
    this.routes[endpoint] && this.routes[endpoint](args, id);
  }
  setup() {
    window.addEventListener("message", (event) => {
      if (typeof event.data !== "string") return;
      if (event.data.indexOf(windowRequestPrefix) != 0) return;
      const data = event.data.substr(windowRequestPrefix.length);
      const recvid = data.substr(0, data.indexOf(reqIDspliter));
      const req = JSON.parse(
        decodeURIComponent(atob(data.substr(data.indexOf(reqIDspliter) + 1)))
      );
      this.request(req.endpoint, req.args, recvid);
    });
  }
  broadcast<T = any>(endpoint: string, args: T) {
    const strd = encodeURIComponent(JSON.stringify({ endpoint, args }));
    window.postMessage(globalBroadcastPrefix + btoa(strd));
  }
}

export const router = new Router();
export const dummy = () => {};
router.setup();
// =============================================== //
router.handle<string>("/config", (req, res) => {
  chrome.storage.local.get("config", (items) => {
    res(items.config);
  });
});
router.handle<string>("/getLogoURL_light", (req, res) => {
  res(chrome.runtime.getURL("assets/light.png"));
});
router.handle<string>("/getLogoURL_dark", (req, res) => {
  res(chrome.runtime.getURL("assets/dark.png"));
});
