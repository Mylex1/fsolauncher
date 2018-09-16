// fsolauncher
// \src\lib\interfaces\IHeader.ts

import IHeaderButton from "./IHeaderButton";

/**
 * The header component.
 *
 * @export
 * @interface IHeader
 */
export default interface IHeader {
   /**
    * The page title.
    *
    * @type {string}
    * @memberof IHeader
    */
   title: string;
   /**
    * The page description.
    *
    * @type {string}
    * @memberof IHeader
    */
   subtitle: string;
   /**
    * Optional header button.
    *
    * @type {IHeaderButton}
    * @memberof IHeader
    */
   button ? : IHeaderButton;
}
