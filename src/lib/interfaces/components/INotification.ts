// fsolauncher
// \src\lib\interfaces\INotification.ts

/**
 * A launcher notification.
 *
 * @export
 * @interface INotification
 */
export default interface INotification {
   /**
    * The notification title.
    *
    * @type {string}
    * @memberof INotification
    */
   headline: string;
   /**
    * The notification body.
    *
    * @type {string}
    * @memberof INotification
    */
   body: string;
   /**
    * An optional link.
    *
    * @type {string}
    * @memberof INotification
    */
   link: string;
}
