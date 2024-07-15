import { session } from "electron";

export default function setupCodeInjector() {
  session.defaultSession.webRequest.onBeforeRequest(
    {
      urls: [
        "https://ssl.pstatic.net/static/nng/glive/resource/p/static/js/main.*.js",
      ],
    },
    (details, callback) => {
      callback({
        redirectURL: "chzzkext://code/",
      });
    },
  );
}
