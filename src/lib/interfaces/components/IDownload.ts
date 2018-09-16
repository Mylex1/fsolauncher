// fsolauncher
// \src\lib\interfaces\IDownload.ts

/**
 * A single program download.
 *
 * @export
 * @interface IDownload
 */
export default interface IDownload {
   /**
    * The date it started.
    *
    * @type {string}
    * @memberof IDownload
    */
   date: string;
   /**
    * The current progress.
    *
    * @type {number}
    * @memberof IDownload
    */
   progress: number;
   /**
    * The program name.
    *
    * @type {string}
    * @memberof IDownload
    */
   item: string;
   /**
    * The location where the program is being
    * obtained from, or the location where it's being
    * stored.
    *
    * @type {string}
    * @memberof IDownload
    */
   location: string;
   /**
    * Real-time details about the download.
    *
    * @type {string}
    * @memberof IDownload
    */
   details: string;
}
