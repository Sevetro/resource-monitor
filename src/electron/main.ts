import { app, BrowserWindow } from "electron";

import { ipcMainHandle, isDev } from "./utils.js";
import { getStaticData, sendStats } from "./resource-manager.js";
import { getPreloadPath, getUIPath } from "./pathResolver.js";
import { createMenu } from "./menu.js";

app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 600,
    webPreferences: {
      preload: getPreloadPath(),
    },
  });

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5132");
  } else {
    mainWindow.loadFile(getUIPath());
  }


  sendStats(mainWindow);

  ipcMainHandle("getStaticData", getStaticData);

  mainWindow.on("closed", () => {
    app.quit();
  });

  createMenu(mainWindow)
});
