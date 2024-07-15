import { Menu } from "electron";
import { chzzkWindow } from "./index";
import openConfig from "./openConfig";
import showNewUpdate from "./showNewUpdate";
import { MenuBase } from "./menuTemplate";

export default function setupMenu() {
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
        {
          label: "새로고침",
          accelerator: isMac ? "Cmd+R" : "F5",
          click: () => {
            chzzkWindow.webContents.reload();
          },
        },
      ],
    },
    {
      label: "치직치지직",
      submenu: [
        {
          label: "설정 열기",
          click: openConfig,
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
}
