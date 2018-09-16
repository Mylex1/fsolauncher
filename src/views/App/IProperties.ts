// fsolauncher
// \src\views\App\IProperties.ts

import { History } from "history";

import IStateProps from "./IStateProps";
import IDispatchProps from "./IDispatchProps";

export default interface IProperties extends IStateProps, IDispatchProps {
   history: History;
}
