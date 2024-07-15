import { session } from "electron";
import wcmatch from "wildcard-match";
import { extensionOperations, extOperation, uadata } from "./index";

export default function setupHeaderModifier() {
  session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    for (const operation of [...uadata.dt, ...extensionOperations]) {
      for (const header of operation.action.requestHeaders) {
        if (header.operation == "remove") {
          delete details.requestHeaders[header.header];
        }
        if (header.operation == "set") {
          details.requestHeaders[header.header] = header.value!;
        }
      }
    }

    for (const operation of extOperation) {
      if (operation.action.type == "block") {
        // *://nam.veta.naver.com/call
        const filter = operation.condition.urlFilter;
        if (wcmatch(filter)(details.url)) {
          callback({ cancel: true });
          return;
        }
      }
    }

    callback({ cancel: false, requestHeaders: details.requestHeaders });
  });
}
