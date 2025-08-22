import { app, BrowserWindow } from "electron";
import path from "path";

import { ipcMainHandle, isDev } from "./utils.js";
import { getStaticData, sendStats } from "./resource-manager.js";
import { getPreloadPath } from "./pathResolver.js";

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
    mainWindow.loadFile(
      path.join(app.getAppPath(), "dist-react", "index.html")
    );
  }

  sendStats(mainWindow);

  ipcMainHandle("getStaticData", getStaticData);

  mainWindow.on("closed", () => {
    app.quit();
  });
});
