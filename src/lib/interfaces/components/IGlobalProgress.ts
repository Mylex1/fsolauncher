// fsolauncher
// \src\lib\interfaces\IGlobalProgress.ts

/**
 * Global progress page for the installer.
 *
 * @export
 * @interface IGlobalProgress
 */
export default interface IGlobalProgress {
   progress: number;
   text: string;
   details: string;
   visible: boolean;
}
