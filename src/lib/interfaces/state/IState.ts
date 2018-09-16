// fsolauncher
// \src\lib\interfaces\IState.ts

import ISoftware from "./ISoftware";
import IGlobalProgress from "../components/IGlobalProgress";
import IHeader from "../components/IHeader";
import IModal from "../components/IModal";
import IToast from "../components/IToast";
import IPost from "../components/IPost";
import IDownload from "../components/IDownload";
import INotification from "../components/INotification";
import ISettings from "./ISettings";

/**
 * Whole Redux LauncherState.
 *
 * @export
 * @interface IState
 */
export default interface IState {
   /**
    * The launcher settings.
    *
    * @type {ISettings}
    * @memberof IState
    */
   Settings: ISettings;
   /**
    * The launcher notifications.
    *
    * @type {INotification[]}
    * @memberof IState
    */
   Notifications: INotification[];
   /**
    * The launcher downloads.
    *
    * @type {IDownload[]}
    * @memberof IState
    */
   Downloads: IDownload[];
   /**
    * The blog posts.
    *
    * @type {IPost[]}
    * @memberof IState
    */
   Posts: IPost[];
   /**
    * The launcher modals.
    *
    * @type {IModal[]}
    * @memberof IState
    */
   Modals: IModal[];
   /**
    * The launcher toasts.
    *
    * @type {IToast[]}
    * @memberof IState
    */
   Toasts: IToast[];
   /**
    * The dynamic page header.
    *
    * @type {IHeader}
    * @memberof IState
    */
   Header: IHeader;
   /**
    * The global installer progress page.
    *
    * @type {IGlobalProgress}
    * @memberof IState
    */
   globalProgress: IGlobalProgress;
   /**
    * Show the welcoming changelog screen.
    *
    * @type {boolean}
    * @memberof IState
    */
   showWelcomeScreen: boolean;
   /**
    * Installed software.
    *
    * @type {ISoftware}
    * @memberof IState
    */
   Software: ISoftware;
   /**
    * Exclusive running tasks that may require
    * other tasks to wait until they have finished.
    *
    * @type {string[]}
    * @memberof IState
    */
   runningTasks: string[];
   /**
    * Has internet or not.
    *
    * @type {boolean}
    * @memberof IState
    */
   internetStatus: boolean;
   /**
    * Launcher update status.
    *
    * @type {{
    *       version: string;
    *    }}
    * @memberof IState
    */
   updateStatus: {
      version: string;
   };
   /**
    * Remesh package status.
    *
    * @type {{
    *       location: string;
    *       version: string;
    *    }}
    * @memberof IState
    */
   remeshesStatus: {
      location: string;
      version: string;
   };
}
