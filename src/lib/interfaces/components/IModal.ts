// fsolauncher
// \src\lib\interfaces\IModal.ts

import IModalAction from "./IModalAction";

/**
 * A modal to be displayed.
 *
 * @export
 * @interface IModal
 */
export default interface IModal {
   headline: string;
   body: string;
   actions: IModalAction[];
   id: number;
}
