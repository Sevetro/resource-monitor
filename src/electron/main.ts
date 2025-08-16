import { app, BrowserWindow } from "electron";
import path from "path";

app.whenReady().then(() => {
  const browserWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  browserWindow.loadFile(
    path.join(app.getAppPath(), "dist-react", "index.html")
  );

  browserWindow.on("closed", () => {
    app.quit();
  });
});
