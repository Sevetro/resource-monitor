import { ipcMain, WebContents } from "electron";

export function isDev() {
  return process.env.NODE_ENV === "dev";
}

export function ipcMainHandle<Key extends keyof EventPayloadMap>(
  key: Key,
  handler: () => EventPayloadMap[Key]
) {
  ipcMain.handle(key, handler);
}

export function ipcWebContentsSend<Key extends keyof EventPayloadMap>(
  key: Key,
  webContents: WebContents,
  payload: EventPayloadMap[Key]
) {
  webContents.send(key, payload);
}
