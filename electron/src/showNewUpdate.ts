import { BrowserWindow, ipcMain } from "electron";
import installLatestExtension from "./installLatestExtension";
import { cfg, chzzkWindow } from "./index";
import { join } from "path";
import axios from "axios";
import showNoUpdate from "./showNoUpdate";

let checkingUpdate = false;
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

  const updateWindow = new BrowserWindow({
    width: 400,
    height: 150,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  updateWindow.setMenuBarVisibility(false);
  updateWindow.loadFile(join(__dirname, "..", "static", "newUpdate.html"));
  ipcMain.on("installUpdate", () => {
    updateWindow.close();
    chzzkWindow.loadFile(join(__dirname, "..", "static", "loading.html"));
    installLatestExtension().then(() => {
      chzzkWindow.loadFile(join(__dirname, "..", "static", "index.html"));
    });
  });
  ipcMain.on("skipUpdate", () => {
    updateWindow.close();
  });
  updateWindow.webContents.send("version", latestVersion);
  updateWindow.webContents.on("did-finish-load", () => {
    updateWindow.webContents.send("version", latestVersion);
  });
};

export default showNewUpdate;
