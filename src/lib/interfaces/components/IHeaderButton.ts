// fsolauncher
// \src\lib\interfaces\IHeaderButton.ts

/**
 * The button that appears on the right
 * side of the header.
 *
 * @export
 * @interface IHeaderButton
 */
export default interface IHeaderButton {
   /**
    * The header button text.
    *
    * @type {string}
    * @memberof IHeaderButton
    */
   text: string;
   /**
    * What to do when clicked.
    *
    * @memberof IHeaderButton
    */
   onClick: () => void;
   /**
    * The material-icons icon to apply (optional).
    *
    * @type {string}
    * @memberof IHeaderButton
    */
   icon ? : string;
}
