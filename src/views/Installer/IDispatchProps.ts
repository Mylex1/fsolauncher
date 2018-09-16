import IDownload from "../../lib/interfaces/components/IDownload";
import IHeader from "../../lib/interfaces/components/IHeader";
import IModal from "../../lib/interfaces/components/IModal";
import IGlobalProgress from "../../lib/interfaces/components/IGlobalProgress";
import ISoftware from "../../lib/interfaces/state/ISoftware";

// fsolauncher
// \src\views\Installer\IDispatchProps.ts

export default interface IDispatchProps {
   composeModal: (modal: IModal) => void;
   updateHeader: (header: IHeader) => void;
   addDownload: (download: IDownload) => void;
   updateGlobalProgress: (globalProgress: IGlobalProgress) => void;
   toggleRunningTask: (task: string) => void;
   updateSoftware: (software?: ISoftware) => void;
}
