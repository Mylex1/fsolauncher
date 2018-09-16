// fsolauncher
// \src\lib\interfaces\ISettings.ts

/**
 * The launcher user settings.
 *
 * @export
 * @interface ISettings
 */
export default interface ISettings {
   /**
    * The game-related settings.
    *
    * @type {{
    *       graphics: string;
    *       is3d: string;
    *       language: string;
    *    }}
    * @memberof ISettings
    */
   game: {
      /**
       * DirectX, OpenGL or Software (dx/ogl/sw).
       *
       * @type {string}
       */
      graphics: string;
      /**
       * Game in 3d or 2d.
       *
       * @type {string}
       */
      is3d: string;
      /**
       * The game language.
       *
       * @type {string}
       */
      language: string;
   };
   /**
    * The launcher-related settings.
    *
    * @type {{
    *       notifications: string;
    *       theme: string;
    *       persistence: string;
    *    }}
    * @memberof ISettings
    */
   launcher: {
      /**
       * Display notifications.
       *
       * @type {string}
       */
      notifications: string;
      /**
       * Active theme.
       *
       * @type {string}
       */
      theme: string;
      /**
       * Stay in the icon tray.
       *
       * @type {string}
       */
      persistence: string;
   };
}
