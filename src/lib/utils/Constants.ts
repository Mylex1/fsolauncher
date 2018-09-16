// fsolauncher
// \src\constants.ts

import * as pkg from "../../../package.json";
import IModal from "../interfaces/components/IModal";

/**
 * Platform detection constants for Windows, MacOS
 * and Linux.
 */
export const IS_WINDOWS = process.platform === "win32";
export const IS_MAC = process.platform === "darwin";
export const IS_LINUX = process.platform === "linux";

/**
 * Current launcher version.
 */
export const LAUNCHER_VERSION: string = pkg["version"];

/**
 * Official TeamCity URL for FreeSO Distribution files.
 * About 40MB instead oF 100+MB with all CC and Remeshes.
 */
export const URL_FREESO_TEAMCITY =
   "http://servo.freeso.org/" +
   "guestAuth/" +
   "repository/" +
   "download/" +
   "FreeSO_TsoClient/" +
   ".lastSuccessful/" +
   "client-<>.zip";

/**
 * URL to download the Remesh Package from.
 */
export const URL_FREESO_REMESHPACKAGE = "http://beta.freeso.org/remeshes.docx";

/**
 * URL to download The Sims Online from (currently using
 * EA's largefiles repo).
 */
export const URL_EA_LARGEFILES = "";

/**
 * All Software dependencies.
 */
export const DEPENDENCIES: { [key: string]: Array<string> } = {
   FSO: IS_WINDOWS ? ["TSO", "OpenAL", "NET"] : ["TSO", "Mono", "SDL"],
   TSO: [],
   OpenAL: [],
   Mono: [],
   SDL: [],
   NET: [],
   RMP: ["FSO"]
};

/**
 * Software code to full name translation object.
 */
export const NAMES: { [key: string]: string } = {
   FSO: "FreeSO Game",
   TSO: "The Sims Online",
   OpenAL: "OpenAL",
   Mono: "Mono",
   SDL: "SDL 2",
   NET: ".NET Framework",
   RMP: "3D Remesh Package",
   UPG: "FreeSO Launcher Update"
};

/**
 * Random text for acceptable buttons.
 */
const OK = ["GOTCHA", "OKAY", "UNDERSTOOD"];

/**
 * Obtain a random OK button text.
 */
const OK_RAND = () => OK[(Math.random() * OK.length) | 0];

/**
 * Generic Modal.
 * @param headline Modal headline.
 * @param body Modal body.
 * @param composeModal Method to compose a Modal.
 * @param onAccept Callback to execute when accepted.
 */
export const MODAL_GENERIC = (
   headline: string,
   body: string,
   composeModal: (modal: IModal) => void,
   onAccept: (() => void) = () => {}
) =>
   composeModal({
      id: new Date().getTime(),
      headline: headline,
      body: body,
      actions: [{ name: OK_RAND(), action: onAccept }]
   });

/**
 * Complete installation Modal.
 * @param onAccept Callback to execute when the user accepts.
 * @param onCancel Callback to execute when the user cancels.
 * @param composeModal Method to compose a Modal.
 */
export const MODAL_COMPLETE_INSTALL = (
   onAccept: () => void,
   onCancel: () => void,
   composeModal: (modal: IModal) => void
) =>
   composeModal({
      id: new Date().getTime(),
      headline: "Install Everything?",
      body:
         "This will install all the necessary software required to play the game.",
      actions: [
         {
            name: "Begin Installation",
            action: onAccept
         },
         {
            name: "Cancel",
            transparent: true,
            action: onCancel
         }
      ]
   });

/**
 * Ask the user if they want to install the update.
 * @param onAccept
 * @param onCancel
 * @param composeModal
 */
export const MODAL_UPDATE = (
   onAccept: () => void,
   onCancel: () => void,
   composeModal: (modal: IModal) => void
) =>
   composeModal({
      id: new Date().getTime(),
      headline: "New Update Available!",
      body:
         "A new update for FreeSO Launcher is available to download. Do you want to update now?",
      actions: [
         { name: "Update Now", action: onAccept },
         { name: "Later", transparent: true, action: onCancel }
      ]
   });

/**
 * Tell the user they can force the update if desired.
 * @param composeModal
 */
export const MODAL_UPDATE_LATER = (composeModal: (modal: IModal) => void) =>
   MODAL_GENERIC(
      "Update Skipped",
      "If you change your mind, you can force the update by going to the About tab and clicking on the Check For Updates button.",
      composeModal
   );

/**
 * Modal fired when a user launches a task more than once.
 * @param composeModal Method to compose a Modal.
 */
export const MODAL_ALREADY_RUNNING = (composeModal: (modal: IModal) => void) =>
   MODAL_GENERIC(
      "Task in progress",
      "Please wait until all the running tasks (installations, downloads, updates...) have finished.",
      composeModal
   );

/**
 * Modal fired when trying to install a program without an active
 * internet connection.
 * @param composeModal Method to compose a Modal.
 */
export const MODAL_NO_INTERNET = (composeModal: (modal: IModal) => void) =>
   MODAL_GENERIC(
      "No Internet Access",
      "You need internet access to do this. Please reconnect and try again.",
      composeModal
   );

/**
 * Modal fired when a download finished successfully.
 * @param code Software code.
 * @param composeModal Method to compose a Modal.
 */
export const MODAL_DOWNLOAD_FINISHED = (
   code: string,
   composeModal: (modal: IModal) => void
) =>
   MODAL_GENERIC(
      "Download finished",
      NAMES[code] + " has finished installing successfully.",
      composeModal
   );

/**
 * Modal fired when a download errored out.
 * @param code Software code.
 * @param error Error message.
 * @param composeModal Method to compose a Modal.
 */
export const MODAL_DOWNLOAD_ERROR = (
   code: string,
   error: string,
   composeModal: (modal: IModal) => void
) =>
   MODAL_GENERIC(
      "An error has occurred",
      "An error occurred while installing " +
         NAMES[code] +
         ':  "' +
         error +
         '".',
      composeModal
   );

/**
 * Modal fired when a user tries to install something two times
 * concurrently.
 * @param name Full Software name.
 * @param composeModal Method to compose a Modal.
 */
export const MODAL_ALREADY_INSTALLING = (
   name: string,
   composeModal: (modal: IModal) => void
) =>
   MODAL_GENERIC(
      "Installation in progress",
      '"' +
         name +
         '" is already being installed. Please wait for the installation to finish.',
      composeModal
   );

/**
 * Modal fired when a user tries to install software while not
 * having the required dependencies installed to do so.
 * @param dependencies Unmet dependencies.
 * @param composeModal Method to compose a Modal.
 * @param onAccept Callback to execute when the user accepts.
 */
export const MODAL_MISSING_DEPENDENCIES = (
   dependencies: string[],
   composeModal: (modal: IModal) => void,
   onAccept: (() => void) = () => {}
) =>
   MODAL_GENERIC(
      "Missing Dependencies",
      "You need to install " +
         [dependencies.slice(0, -1).join(", "), dependencies.slice(-1)[0]].join(
            dependencies.length < 2 ? "" : " and "
         ) +
         " before doing this. ",
      composeModal,
      onAccept
   );
