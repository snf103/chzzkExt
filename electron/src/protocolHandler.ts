import { app, protocol } from "electron";
import {
  chzzkWindow,
  configDir,
  extOperation,
  storagePath,
  uadata,
} from "./index";
import fs from "fs";
import { join } from "path";

export default function setupProtocolHandler() {
  protocol.handle("chzzkext", (request) => {
    const { hostname } = new URL(request.url);
    if (hostname == "ua") return new Response(JSON.stringify(uadata));
    if (hostname == "saveconfig") {
      request.text().then((text) => {
        fs.writeFileSync(storagePath, text);
      });
      return new Response("{}");
    }
    if (hostname == "loadconfig") {
      const fileexists = fs.existsSync(storagePath);
      if (!fileexists) return new Response("{}");
      const data = fs.readFileSync(storagePath, "utf-8");
      return new Response(data);
    }
    if (hostname == "code") {
      console.log("CODE INJECTED");
      return new Response(
        fs
          .readFileSync(
            join(__dirname, "..", "resources", "main.c75d5db5.js"),
            "utf-8",
          )
          .toString()
          .replace("`@REPL`", `{agent: "${uadata.ua}"}`),
      );
    }
    if (hostname == "applyrules") {
      request.text().then((text) => {
        const onoff = JSON.parse(text) as {
          enableRules: string[];
          disableRules: string[];
        };

        const manifestPath = join(configDir, "extension", "manifest.json");
        const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8")) as {
          declarative_net_request: {
            rule_resources: {
              id: string;
              enabled: boolean;
              path: string;
            }[];
          };
        };

        extOperation.length = 0;

        for (const rule of manifest.declarative_net_request.rule_resources) {
          if (onoff.enableRules.includes(rule.id)) {
            // rules/adblock.json
            const path = join(configDir, "extension", rule.path);
            const data = JSON.parse(fs.readFileSync(path, "utf-8"));
            extOperation.push(...data);
          }
        }
      });
    }
    if (hostname == "reload") {
      chzzkWindow.webContents.reload();
      return new Response("{}");
    }
    if (hostname == "update") {
      require("electron").shell.openExternal(
        "https://github.com/poikr/chzkChzzkPlus/releases/latest",
      );
      return new Response("{}");
    }
    if (hostname == "version") {
      return new Response(app.getVersion());
    }
    return new Response("{}");
  });
}
