import { MenuItemConstructorOptions } from "electron";

const isMac = process.platform === "darwin";
export const MenuBase: MenuItemConstructorOptions[] = [
  ...((isMac
    ? [
        {
          role: "appMenu",
        },
      ]
    : []) as MenuItemConstructorOptions[]),

  { role: "editMenu" },
  { role: "viewMenu" },
];
