import IModal from "../../lib/interfaces/components/IModal";
import ISettings from "../../lib/interfaces/state/ISettings";
import ISoftware from "../../lib/interfaces/state/ISoftware";
import IDownload from "../../lib/interfaces/components/IDownload";

// fsolauncher
// \src\views\App\IDispatchProps.ts

export default interface IDispatchProps {
   composeModal: (modal: IModal) => void;
   updateSettings: (settings: ISettings, persist?: boolean) => void;
   updateSoftware: (software?: ISoftware) => void;
   updateInternetStatus: (hasInternet: boolean) => void;
   reloadWelcomeScreen: () => void;
   disposeModal: (modalId: number) => void;
   addDownload: (download: IDownload) => void;
}
