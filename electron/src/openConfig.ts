import { BrowserWindow } from "electron";
import { ext } from "./index";

let configWindow: BrowserWindow | null = null;

export default function openConfig() {
  if (configWindow) {
    configWindow.focus();
  } else {
    configWindow = new BrowserWindow({
      width: 300,
      height: 600,
      resizable: false,
      webPreferences: {
        nodeIntegration: true,
      },
    });
    configWindow.setMenuBarVisibility(false);
    configWindow.loadURL(ext.url + "/options.html");

    configWindow.on("closed", () => {
      configWindow = null;
    });
  }
}
