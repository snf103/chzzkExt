import { BrowserWindow, app, Menu } from "electron";
import { session } from "electron";
import { join } from "path";

const UserAgent =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

const isMac = process.platform === "darwin";

const createWindow = async () => {
  await session.defaultSession.clearData();
  session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    details.requestHeaders["User-Agent"] = UserAgent;
    details.requestHeaders["Sec-CH-UA-Platform"] = '"macOS"';
    details.requestHeaders["Sec-Ch-Ua-Mobile"] = "?0";
    details.requestHeaders["Sec-CH-UA"] =
      '"Not/A)Brand";v="8", "Chromium";v="126"';
    callback({ cancel: false, requestHeaders: details.requestHeaders });
  });

  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.webContents.setUserAgent(UserAgent);

  const ext = await session.defaultSession.loadExtension(
    join(__dirname, "..", "..", "extension", "dist-electron")
  );

  const menu = Menu.buildFromTemplate([
    {
      label: "File",
      submenu: [isMac ? { role: "close" } : { role: "quit" }],
    },
    // { role: 'editMenu' }
    {
      label: "Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
      ],
    },
    // { role: 'viewMenu' }
    {
      label: "View",
      submenu: [
        { role: "reload" },
        { role: "forceReload" },
        { role: "toggleDevTools" },
        { type: "separator" },
        { role: "resetZoom" },
        { role: "zoomIn" },
        { role: "zoomOut" },
        { type: "separator" },
        { role: "togglefullscreen" },
      ],
    },
    // { role: 'windowMenu' }
    {
      label: "Window",
      submenu: [{ role: "minimize" }, { role: "zoom" }],
    },
    {
      label: "Chzzk",
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
      ],
    },
  ]);
  Menu.setApplicationMenu(menu);

  win.loadURL("https://chzzk.naver.com/");
};

app.whenReady().then(createWindow);
