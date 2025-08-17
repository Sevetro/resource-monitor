import { app, BrowserWindow } from "electron";
import path from "path";
import { isDev } from "./utils.js";
import { pollResources } from "./resource-manager.js";

app.whenReady().then(() => {
  const browserWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
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
