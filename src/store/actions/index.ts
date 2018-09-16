// fsolauncher
// \src\store\actions\index.ts

import * as Redux from "redux";

import {
   UPDATE_SETTINGS,
   UPDATE_SHOW_WELCOME_SCREEN,
   UPDATE_HEADER,
   COMPOSE_MODAL,
   DISPOSE_MODAL,
   UPDATE_GLOBAL_PROGRESS,
   UPDATE_SOFTWARE,
   TOGGLE_RUNNING_TASK,
   UPDATE_INTERNET_STATUS,
   UPDATE_POSTS,
   ADD_DOWNLOAD,
   UPDATE_DOWNLOAD,
   COMPOSE_TOAST,
   DISPOSE_TOAST
} from "./types";

import { LAUNCHER_VERSION } from "../../lib/utils/Constants";
import { getSoftwareStatus, persistSettings } from "../../lib";

import ISettings from "../../lib/interfaces/state/ISettings";
import ISoftware from "../../lib/interfaces/state/ISoftware";
import IHeader from "../../lib/interfaces/components/IHeader";
import IToast from "../../lib/interfaces/components/IToast";
import IModal from "../../lib/interfaces/components/IModal";
import IGlobalProgress from "../../lib/interfaces/components/IGlobalProgress";
import IPost from "../../lib/interfaces/components/IPost";
import IDownload from "../../lib/interfaces/components/IDownload";
import IState from "../../lib/interfaces/state/IState";

/**
 * Update the settings.
 * @param settings Settings object.
 */
export const updateSettings = (
   settings: ISettings,
   persist: boolean = true
) => async (dispatch: Redux.Dispatch) => {
   dispatch({
      type: UPDATE_SETTINGS,
      payload: settings
   });

   if (persist) {
      composeToast({
         id: 2,
         text: "Saving Settings",
         rotating: true,
         icon: "autorenew"
      })(dispatch);

      await persistSettings(settings);

      disposeToast(2)(dispatch);
   }
};

/**
 * Update the installed software status.
 * @param software Software installation status object.
 */
export const updateSoftware = (software?: ISoftware) => async (
   dispatch: Redux.Dispatch
) => {
   if (!software) {
      composeToast({
         id: 1,
         text: "Updating Software List",
         rotating: true,
         icon: "autorenew"
      })(dispatch);

      software = await getSoftwareStatus();

      disposeToast(1)(dispatch);
   }

   dispatch({
      type: UPDATE_SOFTWARE,
      payload: software
   });
};

/**
 * Show or hide the Welcome Screen by checking localStorage.
 */
export const reloadWelcomeScreen = () => (dispatch: Redux.Dispatch) => {
   const changelogSeen = localStorage.getItem("changelogSeen");

   if (!changelogSeen || changelogSeen != LAUNCHER_VERSION) {
      dispatch({
         type: UPDATE_SHOW_WELCOME_SCREEN,
         payload: true
      });
      localStorage.setItem("changelogSeen", LAUNCHER_VERSION);
   } else {
      dispatch({
         type: UPDATE_SHOW_WELCOME_SCREEN,
         payload: false
      });
   }
};

/**
 * Update the page header.
 * @param header Page header object.
 */
export const updateHeader = (header: IHeader) => (dispatch: Redux.Dispatch) =>
   dispatch({
      type: UPDATE_HEADER,
      payload: header
   });

/**
 * Creates a Toast.
 * @param toast The toast object.
 */
export const composeToast = (toast: IToast) => (dispatch: Redux.Dispatch) =>
   dispatch({
      type: COMPOSE_TOAST,
      payload: toast
   });

/**
 * Removes a Toast by id.
 * @param toastId Toast id.
 */
export const disposeToast = (toastId: number) => (dispatch: Redux.Dispatch) =>
   setTimeout(() => {
      dispatch({
         type: DISPOSE_TOAST,
         payload: toastId
      });
   }, 1500);

/**
 * Compose a new Modal.
 * @param modal Modal object.
 */
export const composeModal = (modal: IModal) => (dispatch: Redux.Dispatch) =>
   dispatch({
      type: COMPOSE_MODAL,
      payload: modal
   });

/**
 * Dispose of a Modal by id.
 * @param modalId The modal id.
 */
export const disposeModal = (modalId: number) => (dispatch: Redux.Dispatch) =>
   dispatch({
      type: DISPOSE_MODAL,
      payload: modalId
   });

/**
 * Update the global progress installer screen.
 * @param globalProgress The global progress object.
 */
export const updateGlobalProgress = (globalProgress: IGlobalProgress) => (
   dispatch: Redux.Dispatch
) =>
   dispatch({
      type: UPDATE_GLOBAL_PROGRESS,
      payload: globalProgress
   });

/**
 * Toggle a running task.
 * @param taskName Task name.
 */
export const toggleRunningTask = (taskName: string) => (
   dispatch: Redux.Dispatch
) =>
   dispatch({
      type: TOGGLE_RUNNING_TASK,
      payload: taskName
   });

/**
 * Update the user's internet status.
 * @param status The current internet status.
 */
export const updateInternetStatus = (status: boolean) => (
   dispatch: Redux.Dispatch
) =>
   dispatch({
      type: UPDATE_INTERNET_STATUS,
      payload: status
   });

/**
 * Replace all the posts.
 * @param posts Posts.
 */
export const updatePosts = (posts: IPost[]) => (dispatch: Redux.Dispatch) =>
   dispatch({
      type: UPDATE_POSTS,
      payload: posts
   });

/**
 * Add or update a download. If the download passed already exists
 * and hasn't reached 100% completion, it will be updated instead of
 * creating a new one.
 * @param download The download object.
 */
export const addDownload = (download: IDownload) => (
   dispatch: Redux.Dispatch,
   getState: () => { launcher: IState }
) => {
   const state: IState = getState().launcher;
   const oldDownload: IDownload = state.Downloads.find(
      (currentDownload: IDownload): boolean => {
         return (
            download.item == currentDownload.item &&
            currentDownload.progress < 100
         );
      }
   );

   if (oldDownload) {
      dispatch({
         type: UPDATE_DOWNLOAD,
         payload: download
      });
   } else {
      console.log("ADDING NEW", download, oldDownload);
      dispatch({
         type: ADD_DOWNLOAD,
         payload: download
      });
   }
};
