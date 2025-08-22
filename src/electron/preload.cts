import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  subscribeToStats: (callback) => ipcOn("stats", (stats) => callback(stats)),
  getStaticData: () => ipcInvoke("getStaticData"),
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
  ipcRenderer.on(key, (_, payload) => callback(payload));
}
