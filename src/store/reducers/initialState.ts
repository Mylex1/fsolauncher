import IState from "../../lib/interfaces/state/IState";

// fsolauncher
// \src\store\reducers\initialState.ts

export const initialState: IState = {
   Settings: {
      game: {
         graphics: "ogl",
         is3d: "0",
         language: "en"
      },

      launcher: {
         notifications: "1",
         theme: "open-beta",
         persistence: "1"
      }
   },
   Software: {
      FSO: null,
      TSO: null,
      Mono: false,
      NET: false,
      SDL: false,
      OpenAL: false
   },
   globalProgress: {
      visible: false,
      progress: 0,
      text: "ProgressText",
      details: "ProgressDetails"
   },
   Modals: [],
   Notifications: [],
   Downloads: [],
   Posts: [],
   Toasts: [],
   Header: {
      subtitle: "HeaderSubtitle",
      title: "HeaderTitle"
   },
   showWelcomeScreen: false,
   runningTasks: [],
   updateStatus: {
      version: null
   },
   remeshesStatus: {
      version: null,
      location: null
   },
   internetStatus: true
};
