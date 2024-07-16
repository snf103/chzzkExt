// Code ref from : https://stackoverflow.com/questions/26447335/how-can-i-modify-the-xmlhttprequest-responsetext-received-by-another-function
// 가짜 function에 prototype을 붙여서 XMLHttpRequest를 simulate하여 response를 조작함.
export default function applyBypassXML() {
  (function () {
    // create XMLHttpRequest proxy object
    var oldXMLHttpRequest = XMLHttpRequest;

    // define constructor for my proxy object
    XMLHttpRequest = function () {
      var actual = new oldXMLHttpRequest();
      var self = this;
      this.actual = actual;

      const getter = [
        "readyState",
        "response",
        "responseType",
        "responseURL",
        "responseXML",
        "status",
        "statusText",
        "timeout",
        "upload",
        "withCredentials",

        "onload",
        "onerror",
        "onprogress",
        "onabort",
        "onloadend",
        "onloadstart",
        "ontimeout",
        "onreadystatechange",
      ];
      getter.forEach((key) => {
        Object.defineProperty(self, key, {
          get: function () {
            return actual[key];
          },
          set: function (value) {
            actual[key] = value;
          },
        });
      });

      Object.defineProperty(self, "responseText", {
        get: function () {
          if (actual.responseType != "") return actual.response;
          const url = actual.responseURL;
          if (!url.endsWith("/live-detail")) return actual.response;
          if (
            !url.startsWith("https://api.chzzk.naver.com/service/v3/channels/")
          )
            return actual.response;

          const cp = JSON.parse(actual.response);
          cp.content.p2pQuality = [];
          return JSON.stringify(cp);
        },
        set: function (value) {
          actual.responseText = value;
        },
      });
    };

    XMLHttpRequest.prototype.addEventListener = function (type, listener) {
      if (!(type in this.eventlisteners)) {
        this.eventlisteners[type] = [];
      }
      this.eventlisteners[type].push(listener);
    };
    XMLHttpRequest.prototype.open = function (method, url, async) {
      this.url = url;
      this.actual.open(method, url, async);
    };

    const actualCaller = [
      "send",
      "setRequestHeader",
      "getAllResponseHeaders",
      "getResponseHeader",
      "abort",
      "overrideMimeType",
    ];
    actualCaller.forEach((key) => {
      XMLHttpRequest.prototype[key] = function () {
        return this.actual[key].apply(this.actual, arguments);
      };
    });

    // see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
    const events = [
      "abort",
      "error",
      "load",
      "loadend",
      "loadstart",
      "progress",
      "readystatechange",
      "timeout",
    ];
    events.forEach((event) => {
      Object.defineProperty(XMLHttpRequest.prototype, "on" + event, {
        set: function (value) {
          this.actual.addEventListener(event, value);
        },
      });
    });
  })();
}
