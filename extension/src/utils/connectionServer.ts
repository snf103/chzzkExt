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
        window.postMessage(
          windowResponsePrefix + id + reqIDspliter + btoa(JSON.stringify(data))
        );
      });
    };
  }
  request<T = any>(endpoint: string, args: any, id: string) {
    this.routes[endpoint](args, id);
  }
  setup() {
    window.addEventListener("message", (event) => {
      if (typeof event.data !== "string") return;
      if (event.data.indexOf(windowRequestPrefix) != 0) return;
      const data = event.data.substr(windowRequestPrefix.length);
      const recvid = data.substr(0, data.indexOf(reqIDspliter));
      const req = JSON.parse(atob(data.substr(data.indexOf(reqIDspliter) + 1)));
      this.request(req.endpoint, req.args, recvid);
    });
  }
  broadcast<T = any>(endpoint: string, args: T) {
    window.postMessage(
      globalBroadcastPrefix + btoa(JSON.stringify({ endpoint, args }))
    );
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
