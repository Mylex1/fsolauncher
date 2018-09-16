// fsolauncher
// \src\views\Installer\index.tsx

import * as React from "react";
import Tips from "./Tips";

import {
   MODAL_COMPLETE_INSTALL,
   NAMES,
   MODAL_DOWNLOAD_FINISHED,
   MODAL_DOWNLOAD_ERROR,
   MODAL_NO_INTERNET,
   MODAL_ALREADY_RUNNING
} from "../../lib/utils/Constants";

import {
   updateHeader,
   composeModal,
   updateGlobalProgress,
   toggleRunningTask,
   addDownload,
   updateSoftware
} from "../../store/actions";

import { connect } from "react-redux";
import { getInstaller } from "../../lib/installers";
import { setTaskbarProgress, requestFolder } from "../../lib/utils/Remote";

import IProperties from "./IProperties";
import IStateProps from "./IStateProps";
import IDispatchProps from "./IDispatchProps";
import Installables from "./Installables";

import { createKey } from "../../lib/utils/CrossPlatformRegistry";

import IDownload from "../../lib/interfaces/components/IDownload";
import IState from "../../lib/interfaces/state/IState";
import GlobalProgress from "../../components/GlobalProgress";
import IProgress from "../../lib/interfaces/installers/IProgress";
import IInstaller from "../../lib/interfaces/installers/IInstaller";

/**
 * The Installer Page which allows users to install
 * different software.
 */
class Installer extends React.Component<IProperties> {
   // Available game tips loaded
   // from the data file.
   private tips: string[][] = Tips;

   // State including the current tip.
   state = {
      currentTip: this.tips[0]
   };

   // The timer used to update the global
   // install tips.
   private _timer: NodeJS.Timer;

   public componentDidMount() {
      this._timer = setInterval(() => {
         let thisTipIndex = this.tips.indexOf(this.state.currentTip);
         let nextTipIndex = thisTipIndex + 1;

         if (thisTipIndex == this.tips.length - 1) {
            nextTipIndex = 0;
         }

         this.setState({ currentTip: this.tips[nextTipIndex] });
      }, 15000);

      this.props.updateHeader({
         button: {
            onClick: () => {
               if (this.props.runningTasks.indexOf("FULL") > -1) {
                  return MODAL_ALREADY_RUNNING(this.props.composeModal);
               }

               if (!this.props.internetStatus) {
                  return MODAL_NO_INTERNET(this.props.composeModal);
               }

               MODAL_COMPLETE_INSTALL(
                  () => {
                     console.log("ok");
                  },
                  () => {
                     console.log("canceled");
                  },
                  this.props.composeModal
               );
            },
            text: "COMPLETE INSTALLATION",
            icon: "save_alt"
         },
         subtitle: "Click on an item to install it",
         title: "Installer"
      });
   }

   // Clear the timer on unmount.
   public componentWillUnmount() {
      clearInterval(this._timer);
   }

   public render(): any {
      // Require internet connection to use the installer.
      // In 1.0 there was an extra modal to show this.
      if (!this.props.internetStatus) {
         return (
            <div className="Installer NoInternet">
               <div>
                  <i className="material-icons">signal_wifi_off</i>
                  <br />
                  You cannot use the installer without an internet connection
               </div>
            </div>
         );
      }

      // Show global progress if available.
      // Once the global installation has finished
      // it will show the Installables again.
      if (this.props.globalProgress.visible == true) {
         return (
            <GlobalProgress
               tip={this.state.currentTip}
               text={this.props.globalProgress.text}
               details={this.props.globalProgress.details}
               progress={this.props.globalProgress.progress}
            />
         );
      }

      return Installables(
         this.onAction,
         this.props.composeModal,
         this.props.Software,
         this.props.runningTasks
      );
   }

   /**
    * Install a program.
    * @param code Software code.
    * @param target Where to install the software.
    */
   private install(code: string, target?: string) {
      if (["FSO", "RMP", "TSO"].indexOf(code) > -1) {
         // Redirect to Downloads if FSO, Remeshes, or TSO.
         // They are the only downloads that show progress.
         this.props.history.push("/Downloads");
      }

      const installer: IInstaller = getInstaller(code, target);
      const date: string = new Date().toLocaleString();

      const download: IDownload = {
         date: date,
         progress: 0,
         details: "Starting download...",
         item: NAMES[code],
         location: "Installer preparation in progress"
      };

      this.props.addDownload(download);

      // When the installer sends a progress event,
      // update the download item.
      installer.on("progress", (progress: IProgress) => {
         setTaskbarProgress(progress.progress);

         const thisDate: string =
            progress.progress == 100 ? new Date().toLocaleString() : date;

         const download: IDownload = {
            date: thisDate,
            progress: progress.progress,
            details: progress.details,
            item: NAMES[code],
            location: progress.source
         };

         this.props.addDownload(download);
      });

      // When the installer sends an error event,
      // stop the download progress.
      installer.on("error", (message: string) => {
         const thisDate: string = new Date().toLocaleString();

         const download: IDownload = {
            date: thisDate,
            progress: 100,
            details: message,
            item: NAMES[code],
            location: "The program couldn't be installed."
         };

         this.props.addDownload(download);

         setTaskbarProgress(-1);
         MODAL_DOWNLOAD_ERROR(code, message, this.props.composeModal);
      });

      // When the installer sends a success event,
      // it finished successfully.
      installer.on("success", async () => {
         if (["FSO", "TSO", "RMP"].indexOf(code) > -1) {
            // Only FSO, TSO and RMP show download progress.
            setTaskbarProgress(-1);
            MODAL_DOWNLOAD_FINISHED(code, this.props.composeModal);
         }

         if (["FSO", "TSO"].indexOf(code) > -1) {
            // FSO and TSO need registry entries created on Windows.
            await createKey(code, target);
         }

         // Request a Software list update to reflect it on
         // the installer page.
         this.props.updateSoftware();
      });

      // Run the installer.
      installer.run();
   }

   /**
    * When the user has said yes/no.
    * @param code The software code.
    * @param yes The user accepted or declined.
    */
   onAction = async (code: string, yes: boolean) => {
      if (yes) {
         let folder: string = null;

         if (["FSO", "TSO"].indexOf(code) > -1) {
            // If FSO or TSO, we want to ask the user for a location.
            // It will create a folder with the program name in the folder
            // the user chooses.
            folder =
               (await requestFolder("Install " + NAMES[code])) +
               "\\" +
               NAMES[code];
         }

         if (code == "RMP") {
            // To apply the Remesh package it needs to be installed
            // in the FreeSO installation folder.
            folder = this.props.Software.FSO;
         }

         this.install(code, folder);
      }
   };
}

const mapStateToProps = (state: { launcher: IState }) => {
   return {
      globalProgress: state.launcher.globalProgress,
      Software: state.launcher.Software,
      runningTasks: state.launcher.runningTasks,
      internetStatus: state.launcher.internetStatus
   };
};

export default connect<IStateProps, IDispatchProps, any>(
   mapStateToProps,
   {
      updateHeader,
      updateGlobalProgress,
      composeModal,
      toggleRunningTask,
      addDownload,
      updateSoftware
   }
)(Installer);
