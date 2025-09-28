import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  subscribeStats: (callback) => ipcOn("stats", (stats) => callback(stats)),
  getStaticData: () => ipcInvoke("getStaticData"),
  subscribeChangeView: (callback) => ipcOn("changeView", (view) => callback(view)),

} satisfies Window["electron"]);

function ipcInvoke<Key extends keyof EventPayloadMap>(
  key: Key
): Promise<EventPayloadMap[Key]> {
  return ipcRenderer.invoke(key);
}

function ipcOn<Key extends keyof EventPayloadMap>(
  key: Key,
  callback: (payload: EventPayloadMap[Key]) => void
) {
  const cb = (_: Electron.IpcRendererEvent, payload: any) => callback(payload);
  ipcRenderer.on(key, cb);
  return () => ipcRenderer.off(key, cb);
}

// Send event from FE to BE
// function ipcSend<Key extends keyof EventPayloadMap>(
//   key: Key,
//   payload: EventPayloadMap[Key]
// ) {
//   ipcRenderer.send(key, payload);
// }

