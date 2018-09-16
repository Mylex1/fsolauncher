import ISettings from "../../lib/interfaces/state/ISettings";
import ISoftware from "../../lib/interfaces/state/ISoftware";
import INotification from "../../lib/interfaces/components/INotification";
import IModal from "../../lib/interfaces/components/IModal";
import IToast from "../../lib/interfaces/components/IToast";
import IHeader from "../../lib/interfaces/components/IHeader";

// fsolauncher
// \src\views\App\IStateProps.ts

export default interface IStateProps {
   Settings: ISettings;
   Software: ISoftware;
   Notifications: INotification[];
   Modals: IModal[];
   Toasts: IToast[];
   Header: IHeader;
   showWelcomeScreen: boolean;
   internetStatus: boolean;
}
