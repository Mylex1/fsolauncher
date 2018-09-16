// fsolauncher
// \src\components\Modal\IProperties.ts

import IModal from "../../lib/interfaces/components/IModal";

export default interface IProperties extends IModal {
   /**
    * Method from parent to be able to dispose of itself.
    *
    * @memberof IProperties
    */
   dispose: (id: number) => void;
}
