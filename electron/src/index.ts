import { BrowserWindow, app, Menu, protocol, ipcMain } from "electron";
import { session } from "electron";
import { join } from "path";
import { MenuBase } from "./menuTemplate";

import generateRandomAgent from "./user-agent/index";
const uadata = generateRandomAgent();

protocol.registerSchemesAsPrivileged([
  {
    scheme: "chzzkext",
    privileges: { secure: true, standard: true, supportFetchAPI: true },
  },
]);

import fs from "fs";
import Config from "./configInstance";
import axios from "axios";
import extractZip from "extract-zip";

let setLoadingMessage: (message: string) => void = () => {};
let cfg: Config;
let chzzkWindow: BrowserWindow;

const installLatestExtension = async () => {
  setLoadingMessage("업데이트 확인중...");
  // check latest update from https://github.com/poikr/chzzkExt/releases/latest
  const latest = await axios.get(
    "https://api.github.com/repos/poikr/chzzkExt/releases/latest"
  );
  const latestVersion = latest.data.tag_name;
  setLoadingMessage(`업데이트(${latestVersion}) 다운로드중...`);

  // download file with name electron.zip
  const downloadUrl = latest.data.assets
    .filter((asset: any) => asset.name == "electron.zip")
    .map((asset: any) => asset.browser_download_url)[0];

  const response = await axios.get(downloadUrl, {
    responseType: "arraybuffer",
  });

  setLoadingMessage("파일 쓰는중...");

  const configDir = app.getPath("userData");
  const filePath = join(configDir, "electron.zip");
  fs.writeFileSync(filePath, Buffer.from(response.data, "binary"), "binary");

  setLoadingMessage("기존 파일 삭제중...");
  if (fs.existsSync(join(configDir, "extension")))
    fs.rmSync(join(configDir, "extension"), { recursive: true, force: true });

  setLoadingMessage("압축 풀기중...");

  await extractZip(filePath, {
    dir: join(configDir, "extension"),
  });

  setLoadingMessage("압축 파일 삭제중...");
  fs.rmSync(filePath);

  cfg.set("version", latestVersion);
};

let checkingUpdate = false;

const showNoUpdate = () => {
  const win = new BrowserWindow({
    width: 400,
    height: 150,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  win.loadFile(join(__dirname, "..", "static", "noUpdate.html"));
};

const showNewUpdate = async (showNoUpdate_ = false) => {
  if (checkingUpdate) return;
  checkingUpdate = true;
  const latest = await axios
    .get("https://api.github.com/repos/poikr/chzzkExt/releases/latest")
    .finally(() => {
      checkingUpdate = false;
    });
  const latestVersion = latest.data.tag_name;
  if (cfg.get("version") == latestVersion) {
    if (showNoUpdate_) showNoUpdate();
    return;
  }

  const win = new BrowserWindow({
    width: 400,
    height: 150,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  win.loadFile(join(__dirname, "..", "static", "newUpdate.html"));
  ipcMain.on("installUpdate", () => {
    win.close();
    chzzkWindow.loadFile(join(__dirname, "..", "static", "loading.html"));
    installLatestExtension().then(() => {
      chzzkWindow.loadURL("https://chzzk.naver.com/");
    });
  });
  ipcMain.on("skipUpdate", () => {
    win.close();
  });
  win.webContents.send("version", latestVersion);
  win.webContents.on("did-finish-load", () => {
    win.webContents.send("version", latestVersion);
  });
};

const createWindow = async () => {
  const configDir = app.getPath("userData");
  fs.mkdirSync(configDir, { recursive: true });
  cfg = new Config(join(configDir, "config.json"));

  showNewUpdate();

  // =============================================

  protocol.handle("chzzkext", (request) => {
    const filePath = request.url.slice("chzzkext://".length);
    console.log(filePath);
    return new Response("{}");
  });

  session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    for (const operation of uadata.dt) {
      for (const header of operation.action.requestHeaders) {
        if (header.operation == "remove") {
          delete details.requestHeaders[header.header];
        }
        if (header.operation == "set") {
          details.requestHeaders[header.header] = header.value!;
        }
      }
    }
    callback({ cancel: false, requestHeaders: details.requestHeaders });
  });

  // =============================================

  chzzkWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: { nodeIntegration: true, contextIsolation: false },
  });
  chzzkWindow.webContents.setUserAgent(uadata.ua);
  chzzkWindow.loadFile(join(__dirname, "..", "static", "loading.html"));

  // =============================================

  setLoadingMessage = (message: string) => {
    chzzkWindow.webContents.send("loading", message);
  };

  setLoadingMessage("확장프로그램 로딩중...");
  let vsr = cfg.get("version");
  if (vsr == undefined) await installLatestExtension();
  vsr = cfg.get("version");

  // =============================================

  if (false)
    session.defaultSession.loadExtension(
      join(__dirname, "..", "..", "extension", "dist-electron")
    );
  else session.defaultSession.loadExtension(join(configDir, "extension"));

  // =============================================

  const ext = await session.defaultSession.loadExtension(
    join(__dirname, "..", "..", "extension", "dist-electron")
  );

  const isMac = process.platform === "darwin";
  const menu = Menu.buildFromTemplate([
    ...MenuBase,
    {
      label: "이동",
      submenu: [
        {
          label: "뒤로",
          click: () => {
            chzzkWindow.webContents.goBack();
          },
          accelerator: isMac ? "Cmd+Left" : "Alt+Left",
        },
        {
          label: "앞으로",
          click: () => {
            chzzkWindow.webContents.goForward();
          },
          accelerator: isMac ? "Cmd+Right" : "Alt+Right",
        },
      ],
    },
    {
      label: "치직치지직",
      submenu: [
        {
          label: "설정 열기",
          click: async () => {
            const window = new BrowserWindow({
              width: 300,
              height: 600,
              resizable: false,
              webPreferences: {
                nodeIntegration: true,
              },
            });
            window.loadURL(ext.url + "/options.html");
          },
        },
        {
          label: "업데이트",
          click: () => {
            showNewUpdate(true);
          },
        },
      ],
    },
  ]);
  Menu.setApplicationMenu(menu);
  chzzkWindow.webContents.send(
    "loading",
    `치지직 + 치직치지직(${vsr}) 로딩중...`
  );

  chzzkWindow.loadURL("https://chzzk.naver.com/");
};

app.whenReady().then(createWindow);
