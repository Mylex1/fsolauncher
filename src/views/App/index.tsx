// fsolauncher
// \src\views\App\index.tsx

import {
   checkUpdates,
   checkRemeshes,
   checkInternetStatus
} from "../../lib/api/JobsAPI";

import {
   NAMES,
   MODAL_MISSING_DEPENDENCIES,
   LAUNCHER_VERSION,
   MODAL_UPDATE,
   MODAL_UPDATE_LATER,
   MODAL_DOWNLOAD_ERROR
} from "../../lib/utils/Constants";

import {
   updateSettings,
   reloadWelcomeScreen,
   disposeModal,
   updateSoftware,
   updateInternetStatus,
   composeModal,
   addDownload
} from "../../store/actions";

import * as React from "react";
import * as changelog from "../../../changelog.json";
import * as Remote from "../../lib/utils/Remote";

import routes from "./Routes";

import { connect } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { getSettings, runExecutable } from "../../lib";
import { getPlayerCount } from "../../lib/api/FreeSOAPI";
import { getInstaller } from "../../lib/installers";

import IProperties from "./IProperties";
import IStateProps from "./IStateProps";
import IDispatchProps from "./IDispatchProps";
import IState from "../../lib/interfaces/state/IState";
import IInstaller from "../../lib/interfaces/installers/IInstaller";
import IDownload from "../../lib/interfaces/components/IDownload";

import Modal from "../../components/Modal";
import Toast from "../../components/Toast";
import WelcomeScreen from "../../components/WelcomeScreen";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

/**
 * The main Application component.
 */
class App extends React.Component<IProperties> {
   /**
    * Keep track of skipped updates in memory.
    */
   private skippedUpdates: string[] = [];

   /**
    * Keep track of playerCount for the Sidebar.
    */
   state = {
      playerCount: 0
   };

   public async componentDidMount() {
      // Reload the initial welcome screen.
      // It checks localStorage to determine if the welcome screen
      // should be shown or not.
      this.props.reloadWelcomeScreen();

      // Load Settings for the first time.
      this.props.updateSettings(await getSettings(), false);

      // Load installed Software for the first time.
      this.props.updateSoftware();

      // Check launcher updates recursively.
      checkUpdates(this.handleUpdate);

      // Check remesh status updates recursively.
      checkRemeshes((data: any) => {});

      // Check internet status
      // Users won't be able to install stuff without an internet
      // connection.
      checkInternetStatus((hasInternet: boolean) =>
         this.props.updateInternetStatus(hasInternet)
      );

      // Get playerCount once upon loading.
      getPlayerCount(count => {
         this.setState({ playerCount: count });
      });

      this.remoteSetup();
   }

   /**
    * Handles an update check.
    */
   private handleUpdate = (data: any) => {
      // Check if remote version is different from local version.
      // If so, begin the updating process.
      if (data.Version != LAUNCHER_VERSION) {
         const onInstall = () => {
            this.props.history.push("/Downloads");

            // If the user accepts, begin the installation.
            const installer: IInstaller = getInstaller("UPG");
            const date: string = new Date().toLocaleString();

            installer.on(
               "progress",
               (progress: number, details: string, location: string) => {
                  Remote.setTaskbarProgress(progress);

                  const thisDate: string =
                     progress == 100 ? new Date().toLocaleString() : date;

                  const download: IDownload = {
                     date: thisDate,
                     progress: progress,
                     details: details,
                     item: "FreeSO Launcher " + data.Version,
                     location: location
                  };

                  this.props.addDownload(download);
               }
            );

            installer.on("success", () => {
               // If the install has finished successfully,
               // close the launcher in 3 seconds.
               // The installer will have already run the
               // update executable child process.
               setTimeout(() => {
                  Remote.setShouldQuit(true);
                  Remote.Window.close();
               }, 3000);
            });

            installer.on("error", (message: string) => {
               Remote.setTaskbarProgress(-1);
               MODAL_DOWNLOAD_ERROR("UPG", message, this.props.composeModal);
            });
         };

         const onPostpone = () => {
            // If the user cancels, set the update for later.
            MODAL_UPDATE_LATER(this.props.composeModal);

            this.skippedUpdates.push(data.Version);
         };

         if (this.skippedUpdates.indexOf(data.Version) == -1) {
            // We won't show a Modal if the update has been skipped.
            MODAL_UPDATE(onInstall, onPostpone, this.props.composeModal);
         }
      }
   };

   /**
    * Setup remote Electron listeners so that the window
    * behaves properly.
    */
   private remoteSetup() {
      // Show the window once React has loaded and App
      // has been mounted.
      Remote.showWindow();

      // Before closing the window:
      // If the user has the persistence setting enabled,
      // the app will minimize itself. Otherwise it'll
      // close.
      window.addEventListener("beforeunload", e => {
         if (
            Remote.shouldQuit ||
            this.props.Settings.launcher.persistence == "0"
         ) {
            Remote.Tray.destroy();
         } else {
            Remote.minimizeWindow();
            e.returnValue = true;
         }
      });

      Remote.willMinimizeWindow(() => Remote.hideWindow());
   }

   /**
    * Launch the game executable.
    */
   public onLaunch = (e: React.MouseEvent) => {
      let useVolcanic: boolean = false;

      if (e.type === "contextmenu") {
         // Enable Volcanic on right-click.
         useVolcanic = true;
      }

      // Check dependencies first before launching the game.
      // We need at least FreeSO and The Sims Online to launch FreeSO.
      const missingDependencies = [];

      this.props.Software.FSO == null && missingDependencies.push(NAMES["FSO"]);
      this.props.Software.TSO == null && missingDependencies.push(NAMES["TSO"]);

      if (missingDependencies.length > 0) {
         // If we're missing dependencies, we can't run the game.
         return MODAL_MISSING_DEPENDENCIES(
            missingDependencies,
            this.props.composeModal,
            () => this.props.history.push("/Installer")
         );
      }

      // Launch the game with current Settings,
      // Indicating the FSO directory and Volcanic.
      runExecutable(this.props.Settings, this.props.Software.FSO, useVolcanic);
   };

   public render(): any {
      // Render all the toasts.
      const toasts = this.props.Toasts.map(toast => (
         <Toast {...toast} key={toast.id.toString()} />
      ));

      // Render all the modals.
      const modals = this.props.Modals.map(modal => (
         <Modal
            {...modal}
            key={modal.id.toString()}
            dispose={this.props.disposeModal}
         />
      ));

      return (
         // ConnectedRouter w/ MemoryHistory
         <ConnectedRouter history={this.props.history}>
            <div
               className={
                  "MainAppContainer " + this.props.Settings.launcher.theme
               }
            >
               {this.props.showWelcomeScreen && (
                  <WelcomeScreen
                     changelog={changelog}
                     hide={this.props.reloadWelcomeScreen}
                  />
               )}
               <div
                  className="AppOverlay animated fadeIn"
                  style={
                     this.props.Modals.length > 0 ||
                     this.props.showWelcomeScreen
                        ? { display: "block" }
                        : { display: "none" }
                  }
               />
               {modals}
               <div className="Toasts">
                  {toasts}{" "}
                  {this.props.internetStatus || (
                     <Toast id={0} text="No internet access" icon="cloud_off" />
                  )}
               </div>
               <Sidebar
                  play={this.onLaunch}
                  playerCount={this.state.playerCount}
               />
               <div className="AppContentContainer">
                  <Header {...this.props.Header} />
                  <div className="AppContent">{routes}</div>
               </div>
            </div>
         </ConnectedRouter>
      );
   }
}

const mapStateToProps = (state: { launcher: IState }) => {
   return {
      Settings: state.launcher.Settings,
      Toasts: state.launcher.Toasts,
      Notifications: state.launcher.Notifications,
      Modals: state.launcher.Modals,
      Header: state.launcher.Header,
      Software: state.launcher.Software,
      showWelcomeScreen: state.launcher.showWelcomeScreen,
      internetStatus: state.launcher.internetStatus
   };
};

export default connect<IStateProps, IDispatchProps, any>(
   mapStateToProps,
   {
      updateSettings,
      updateSoftware,
      reloadWelcomeScreen,
      disposeModal,
      updateInternetStatus,
      composeModal,
      addDownload
   }
)(App);
