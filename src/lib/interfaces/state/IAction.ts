// fsolauncher
// \src\lib\interfaces\IAction.ts

/**
 * Redux actions.
 *
 * @export
 * @interface IAction
 */
export default interface IAction {
   /**
    * Action type.
    *
    * @type {string}
    * @memberof IAction
    */
   type: string;
   /**
    * The payload to send to the reducer.
    * It is recommended to do a cast to the preferred
    * type before passing the payload around.
    *
    * @type {*}
    * @memberof IAction
    */
   payload: any;
}
