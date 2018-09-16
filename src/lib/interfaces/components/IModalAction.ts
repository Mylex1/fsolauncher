// fsolauncher
// \src\lib\interfaces\IModalAction.ts

/**
 * The Modal actions.
 *
 * @export
 * @interface IModalAction
 */
export default interface IModalAction {
   /**
    * Modal action button text.
    *
    * @type {string}
    * @memberof IModalAction
    */
   name: string;
   /**
    * Modal action callback.
    *
    * @memberof IModalAction
    */
   action: () => void;
   /**
    * Modal button text-only or full on button.
    *
    * @type {boolean}
    * @memberof IModalAction
    */
   transparent ? : boolean;
}
