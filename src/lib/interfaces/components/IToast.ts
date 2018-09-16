// fsolauncher
// \src\lib\interfaces\IToast.ts

/**
 * Toast to be displayed in the bottom right
 * corner.
 *
 * @export
 * @interface IToast
 */
export default interface IToast {
   id: number;
   text: string;
   icon ? : string;
   rotating ? : boolean;
}
