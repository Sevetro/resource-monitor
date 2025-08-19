const electron = require("electron");

type subscribeCb = (stats: any) => void;

electron.contextBridge.exposeInMainWorld("electron", {
  subscribeToStats: (callback: subscribeCb) => {
    electron.ipcRenderer.on("stats", (_: any, stats: any) => {
      callback(stats);
    });
  },
  getStaticData: () => electron.ipcRenderer.invoke("getStaticData"),
});
