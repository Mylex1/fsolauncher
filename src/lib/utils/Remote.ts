// fsolauncher
// \src\lib\utils\remote.ts

import * as Electron from "electron";
import { LAUNCHER_VERSION } from "./Constants";

export const Window = Electron.remote.getCurrentWindow();
export const Tray = buildTray();

/**
 * Should the launcher quit the process when
 * the user exits eh app.
 */
export let shouldQuit = false;
export function setShouldQuit(value: boolean) {
   shouldQuit = value;
}

/**
 * Sets the taskbar loading bar for the icon (on Windows).
 * @param progress Progress percentage.
 */
export const setTaskbarProgress = (progress: number) =>
   Window.setProgressBar(progress != -1 ? progress / 100 : progress);

/**
 * Called when the window minimizes.
 * @param onMinimize Callback to execute when the window minimizes.
 */
export const willMinimizeWindow = (onMinimize: () => void) =>
   Window.on("minimize", onMinimize);

export const minimizeWindow = () => Window.minimize();
export const showWindow = () => Window.show();
export const hideWindow = () => Window.hide();

/**
 * Ask the user for a folder with a dialog.
 * @param title The dialog title.
 */
export const requestFolder = (title: string): Promise<string> =>
   new Promise((resolve, _reject) =>
      Electron.remote.dialog.showOpenDialog(
         Window,
         {
            defaultPath: "C:\\Program Files",
            properties: ["openDirectory"],
            title: title,
            buttonLabel: "Choose folder"
         },
         (folder, _bookmarks) => {
            resolve(folder[0]);
         }
      )
   );

/**
 * Build the Electron Tray Icon, the Icon tooltip and
 * click events.
 */
function buildTray() {
   const remoteTray: Electron.Tray = new Electron.remote.Tray("beta.ico");
   const trayTemplate: Electron.MenuItemConstructorOptions[] = [
      {
         label: "Play FreeSO",
         click: () => {}
      },
      {
         type: "separator"
      },
      {
         label: "Exit",
         click: () => {
            shouldQuit = true;
            Window.close();
         }
      }
   ];

   const contextMenu = Electron.remote.Menu.buildFromTemplate(trayTemplate);

   remoteTray.setToolTip("FreeSO Launcher " + LAUNCHER_VERSION);
   remoteTray.setContextMenu(contextMenu);
   remoteTray.on(
      "click",
      () => (Window.isVisible() ? Window.hide() : Window.show())
   );

   return remoteTray;
}
