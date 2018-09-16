import IGlobalProgress from "../../lib/interfaces/components/IGlobalProgress";
import ISoftware from "../../lib/interfaces/state/ISoftware";

// fsolauncher
// \src\views\Installer\IStateProps.ts

export default interface IStateProps {
   globalProgress: IGlobalProgress;
   Software: ISoftware;
   runningTasks: string[];
   internetStatus: boolean;
}
