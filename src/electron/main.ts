import { app, BrowserWindow } from "electron";
import path from "path";
import { isDev } from "./utils.js";
import { pollResources } from "./resource-manager.js";
import { getPreloadPath } from "./pathResolver.js";

app.whenReady().then(() => {
  const browserWindow = new BrowserWindow({
    width: 1200,
    height: 600,
    webPreferences: {
      preload: getPreloadPath(),
    },
  });

  if (isDev()) {
    browserWindow.loadURL("http://localhost:5132");
  } else {
    browserWindow.loadFile(
      path.join(app.getAppPath(), "dist-react", "index.html")
    );
  }

  pollResources();

  browserWindow.on("closed", () => {
    app.quit();
  });
});
