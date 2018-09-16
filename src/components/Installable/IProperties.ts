import IModal from "../../lib/interfaces/components/IModal";

// fsolauncher
// \src\components\Installable\IProperties.ts

export default interface IProperties {
   /**
    * A long name/description for the program.
    *
    * @type {string}
    * @memberof IInstallable
    */
   longname: string;
   /**
    * Program image.
    *
    * @type {string}
    * @memberof IInstallable
    */
   image: string;
   /**
    * Program's unique id (should be one of FSO, TSO, OpenAL, SDL, Mono, NET)
    *
    * @type {string}
    * @memberof IInstallable
    */
   code: string;
   /**
    * The component takes up a whole row on the
    * installer page.
    *
    * @type {boolean}
    * @memberof IInstallable
    */
   block ? : boolean;
   /**
    * The program is installed or not.
    *
    * @type {boolean}
    * @memberof IInstallable
    */
   installed: boolean;
   /**
    * This program is already being installed.
    *
    * @type {boolean}
    * @memberof IInstallable
    */
   isRunning: boolean;
   /**
    * Missing dependencies of this installable.
    *
    * @type {string[]}
    * @memberof IProperties
    */
   missingDependencies: string[];
   /**
    * What to do when the user responds to the
    * installation modal.
    *
    * @memberof IInstallable
    */
   onAction: (s: string, b: boolean) => void;
   /**
    * Pass on the composeModal function from the
    * Installer page container component.
    *
    * @memberof IInstallable
    */
   composeModal: (modal: IModal) => void;
}
