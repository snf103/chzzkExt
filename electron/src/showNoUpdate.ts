import { BrowserWindow } from "electron";
import { join } from "path";

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
  win.setMenuBarVisibility(false);
};

export default showNoUpdate;
