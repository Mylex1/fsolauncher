// fsolauncher
// \src\lib\interfaces\ISoftware.ts

/**
 * Software available for the launcher
 * to download.
 *
 * @export
 * @interface ISoftware
 */
export default interface ISoftware {
   /**
    * FreeSO installation status.
    *
    * @type {string}
    * @memberof ISoftware
    */
   FSO: string;
   /**
    * The Sims Online installation status.
    *
    * @type {string}
    * @memberof ISoftware
    */
   TSO: string;
   /**
    * OpenAL installation status.
    *
    * @type {boolean}
    * @memberof ISoftware
    */
   OpenAL: boolean;
   /**
    * .NET installation status.
    *
    * @type {boolean}
    * @memberof ISoftware
    */
   NET: boolean;
   /**
    * SDL installation status.
    *
    * @type {boolean}
    * @memberof ISoftware
    */
   SDL: boolean;
   /**
    * Mono installation status.
    *
    * @type {boolean}
    * @memberof ISoftware
    */
   Mono: boolean;
}
