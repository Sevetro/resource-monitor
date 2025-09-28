import { ipcMain, WebContents, WebFrameMain } from "electron";
import { getUIPath } from "./pathResolver.js";
import { pathToFileURL } from "url";

export function isDev() {
  return process.env.NODE_ENV === "dev";
}

export function ipcMainHandle<Key extends keyof EventPayloadMap>(
  key: Key,
  handler: () => EventPayloadMap[Key]
) {
  ipcMain.handle(key, (event) => {
    const { senderFrame } = event;

    if (senderFrame === null) {
      throw new Error("senderFrame has been destroyed or navigated");
    }

    validateEventFrame(senderFrame);
    return handler();
  });
}

// Send event from FE to BE
// export function ipcMainOn<Key extends keyof EventPayloadMap>(
//   key: Key,
//   handler: (payload: EventPayloadMap[Key]) => void
// ) {
//   ipcMain.on(key, (event, payload) => {
//     const { senderFrame } = event;

//     if (senderFrame === null) {
//       throw new Error("senderFrame has been destroyed or navigated");
//     }

//     validateEventFrame(senderFrame);
//     return handler(payload);
//   });
// }


export function ipcWebContentsSend<Key extends keyof EventPayloadMap>(
  key: Key,
  webContents: WebContents,
  payload: EventPayloadMap[Key]
) {
  webContents.send(key, payload);
}

// if there will be more windows, or some router, then this may need an update
export function validateEventFrame(frame: WebFrameMain) {
  if (isDev() && new URL(frame.url).host === "localhost:5132") {
    return;
  }
  if (frame.url !== pathToFileURL(getUIPath()).toString()) {
    throw new Error("Malicious event!");
  }
}
