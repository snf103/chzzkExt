import { BrowserWindow, app, protocol, Extension } from "electron";
import { session } from "electron";
import { join } from "path";

import generateRandomAgent from "./user-agent/index";
export const uadata = generateRandomAgent();

export let ext: Extension;

protocol.registerSchemesAsPrivileged([
  {
    scheme: "chzzkext",
    privileges: {
      secure: true,
      standard: true,
      supportFetchAPI: true,
      allowServiceWorkers: true,
      bypassCSP: true,
    },
  },
]);

import fs from "fs";
import Config from "./configInstance";
import axios from "axios";

export let setLoadingMessage: (message: string) => void = () => {};
export let configDir: string = join(
  app.getPath("appData"),
  "kr.poikr.chzkchzzkplus",
);
export let cfg: Config = new Config(join(configDir, "config.json"));
export let storagePath: string = join(configDir, "storage.json");
export let chzzkWindow: BrowserWindow;

import installLatestExtension from "./installLatestExtension";
import showNewUpdate from "./showNewUpdate";
import setupMenu from "./setupMenu";
import setupProtocolHandler from "./protocolHandler";
import setupCodeInjector from "./setupCodeInjector";
import setupHeaderModifier from "./setupHeaderModifier";

let needUpdate = false;
let checkingUpdateElec = false;
const checkElectronUpdate = async () => {
  try {
    if (checkingUpdateElec) return;
    checkingUpdateElec = true;
    const latest = await axios
      .get("https://api.github.com/repos/poikr/chzkChzzkPlus/releases/latest")
      .finally(() => {
        checkingUpdateElec = false;
      });
    const latestVersion = latest.data.tag_name;
    if (app.getVersion() == latestVersion) {
      return;
    }
    console.log(app.getVersion(), latestVersion);
    console.log("NEED UPDATE");
    chzzkWindow.webContents.executeJavaScript(
      fs.readFileSync(join(__dirname, "appendScript.js"), "utf-8"),
    );
    needUpdate = true;
  } catch (e) {
    console.error(e);
  }
};

// if (fs.existsSync(join(configDir, "DISABLE_HW_ACCEL")))
app.disableHardwareAcceleration();

export const extensionOperations: any[] = [];
export const extOperation: any[] = [];

const createWindow = async () => {
  console.log("[App Data]", configDir);
  fs.mkdirSync(configDir, { recursive: true });

  setupProtocolHandler();
  setupHeaderModifier();
  setupCodeInjector();

  // =============================================

  chzzkWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
      webgl: false,
      webviewTag: true,
    },
    titleBarStyle: "hidden",
    trafficLightPosition: { x: 14, y: 14 },
  });

  chzzkWindow.webContents.setUserAgent(uadata.ua);
  chzzkWindow.loadFile(join(__dirname, "..", "static", "loading.html"));

  // =============================================

  setLoadingMessage = (message: string) => {
    chzzkWindow.webContents.send("loading", message);
  };

  setLoadingMessage("확장프로그램 로딩중...");
  let vsr = cfg.get("version");
  try {
    if (vsr == undefined || !fs.existsSync(join(configDir, "extension")))
      await installLatestExtension();
    else showNewUpdate();
  } catch (e) {
    console.error(e);
  }
  try {
    checkElectronUpdate();
  } catch (e) {
    console.error(e);
  }
  vsr = cfg.get("version");

  // =============================================

  const IS_DEV = process.env.NODE_ENV === "development";
  const EXTDIR = IS_DEV
    ? join(__dirname, "..", "..", "extension", "dist-electron")
    : join(configDir, "extension");
  console.log("Loading extension...", EXTDIR);
  ext = await session.defaultSession.loadExtension(EXTDIR);
  setupMenu();

  chzzkWindow.webContents.send(
    "loading",
    `치지직 + 치직치지직(${vsr}) 로딩중...`,
  );

  chzzkWindow.on("enter-full-screen", () =>
    chzzkWindow.setMenuBarVisibility(false),
  );
  chzzkWindow.on("leave-full-screen", () =>
    chzzkWindow.setMenuBarVisibility(true),
  );

  chzzkWindow.loadFile(join(__dirname, "..", "static", "index.html"));
  chzzkWindow.webContents.on("did-finish-load", () => {
    console.log("INJECT", needUpdate);
    if (needUpdate)
      chzzkWindow.webContents.executeJavaScript(
        fs.readFileSync(join(__dirname, "appendScript.js"), "utf-8"),
      );
  });
  chzzkWindow.on("close", () => {
    app.quit();
  });
};

app.whenReady().then(createWindow);
