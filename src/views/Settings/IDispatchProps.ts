import IHeader from "../../lib/interfaces/components/IHeader";
import ISettings from "../../lib/interfaces/state/ISettings";

// fsolauncher
// \src\views\Settings\IDispatchProps.ts

export default interface IDispatchProps {
   updateHeader: (header: IHeader) => void;
   updateSettings: (settings: ISettings) => void;
}
