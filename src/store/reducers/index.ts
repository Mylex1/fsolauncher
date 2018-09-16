// fsolauncher
// \src\store\reducers\index.ts

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
} from "../actions/types";

import {
   IAction,
   ISettings,
   IHeader,
   IModal,
   IGlobalProgress,
   ISoftware,
   IPost,
   IDownload,
   IState
} from "../../lib/interfaces";

import { initialState } from "./initialState";
import { combineReducers } from "redux";

export default combineReducers({
   launcher: (state: IState = initialState, action: IAction) => {
      switch (action.type) {
         case UPDATE_SETTINGS:
            return {
               ...state,
               Settings: <ISettings>action.payload
            };

         case UPDATE_SOFTWARE:
            return {
               ...state,
               Software: <ISoftware>action.payload
            };

         case UPDATE_SHOW_WELCOME_SCREEN:
            return {
               ...state,
               showWelcomeScreen: <boolean>action.payload
            };

         case UPDATE_HEADER:
            return {
               ...state,
               Header: <IHeader>action.payload
            };

         case COMPOSE_MODAL:
            return {
               ...state,
               Modals: [...state.Modals, <IModal>action.payload]
            };

         case DISPOSE_MODAL:
            return {
               ...state,
               Modals: state.Modals.filter(
                  ({ id }) => id !== <number>action.payload
               )
            };

         case COMPOSE_TOAST:
            return {
               ...state,
               Toasts: [...state.Toasts, <IToast>action.payload]
            };

         case DISPOSE_TOAST:
            return {
               ...state,
               Toasts: state.Toasts.filter(
                  ({ id }) => id !== <number>action.payload
               )
            };

         case UPDATE_GLOBAL_PROGRESS:
            return {
               ...state,
               globalProgress: <IGlobalProgress>action.payload
            };

         case TOGGLE_RUNNING_TASK:
            return {
               ...state,
               runningTasks:
                  state.runningTasks.indexOf(<string>action.payload) > -1
                     ? state.runningTasks.filter(
                          task => task !== <string>action.payload
                       )
                     : [...state.runningTasks, <string>action.payload]
            };

         case UPDATE_INTERNET_STATUS:
            return {
               ...state,
               internetStatus: <boolean>action.payload
            };

         case UPDATE_POSTS:
            return {
               ...state,
               Posts: <IPost[]>action.payload
            };

         case ADD_DOWNLOAD:
            return {
               ...state,
               Downloads: [<IDownload>action.payload, ...state.Downloads]
            };

         case UPDATE_DOWNLOAD:
            return {
               ...state,
               Downloads: state.Downloads.map(
                  (download: IDownload, index: number) =>
                     download.item == (<IDownload>action.payload).item &&
                     download.progress < 100
                        ? <IDownload>action.payload
                        : state.Downloads[index]
               )
            };

         default:
            return state;
      }
   }
});
