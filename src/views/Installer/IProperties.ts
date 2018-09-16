// fsolauncher
// \src\views\Installer\IProperties.ts

import { History } from "history";

import IDispatchProps from "./IDispatchProps";
import IStateProps from "./IStateProps";

export default interface IProperties extends IStateProps, IDispatchProps {
   history: History;
}
