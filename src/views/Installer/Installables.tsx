// fsolauncher
// \src\views\Installer\Installables.tsx

import * as React from "react";

import {
   DEPENDENCIES,
   NAMES,
   IS_WINDOWS,
   IS_MAC
} from "../../lib/utils/Constants";

import IModal from "../../lib/interfaces/components/IModal";
import ISoftware from "../../lib/interfaces/state/ISoftware";
import Installable from "../../components/Installable";

/**
 * Returns all installables.
 * @param onAction Fired when the user accepts or cancels.
 * @param composeModal Passed onto the Installable so it can create a Modal.
 * @param Software Available Software.
 * @param runningTasks Active tasks.
 */
export default function(
   onAction: (code: string, yes: boolean) => Promise<void>,
   composeModal: (modal: IModal) => void,
   Software: ISoftware,
   runningTasks: string[]
) {
   /**
    * Returns unmet dependencies.
    * @param code Software code.
    */
   const getMissingDependencies = (code: string): string[] => {
      const dependencies = DEPENDENCIES[code];
      const missingDependencies = [];

      for (let index = 0; index < dependencies.length; index++) {
         const dependency = dependencies[index];

         if (!Software[dependency]) {
            missingDependencies.push(NAMES[dependency]);
         }
      }

      return missingDependencies;
   };

   return (
      <div
         className="Installer"
         style={{
            backgroundColor: "#fff",
            overflowX: "hidden"
         }}
      >
         <Installable
            longname="Improved 3D visual quality"
            image="Remeshes"
            code="RMP"
            block={true}
            onAction={onAction}
            composeModal={composeModal}
            installed={false}
            isRunning={runningTasks.indexOf("RMP") > -1}
            missingDependencies={getMissingDependencies("RMP")}
         />
         <Installable
            longname="Official FreeSO Client"
            image="FreeSO"
            code="FSO"
            onAction={onAction}
            composeModal={composeModal}
            installed={Software.FSO != null}
            isRunning={runningTasks.indexOf("FSO") > -1}
            missingDependencies={getMissingDependencies("FSO")}
         />
         <Installable
            longname="The Sims Online Client"
            image="TheSimsOnline"
            code="TSO"
            onAction={onAction}
            composeModal={composeModal}
            installed={Software.TSO != null}
            isRunning={runningTasks.indexOf("TSO") > -1}
            missingDependencies={getMissingDependencies("TSO")}
         />
         {IS_WINDOWS && (
            <Installable
               longname="Cross Platform 3D Audio"
               image="OpenAL"
               code="OpenAL"
               onAction={onAction}
               composeModal={composeModal}
               installed={Software.OpenAL}
               isRunning={runningTasks.indexOf("OpenAL") > -1}
               missingDependencies={getMissingDependencies("OpenAL")}
            />
         )}
         {IS_WINDOWS && (
            <Installable
               longname="For Microsoft Windows"
               image="NET"
               code="NET"
               onAction={onAction}
               composeModal={composeModal}
               installed={Software.NET}
               isRunning={runningTasks.indexOf("NET") > -1}
               missingDependencies={getMissingDependencies("NET")}
            />
         )}
         {IS_MAC && (
            <Installable
               longname="Mono Library for Mac"
               image="Mono"
               code="Mono"
               onAction={onAction}
               composeModal={composeModal}
               installed={Software.Mono}
               isRunning={runningTasks.indexOf("Mono") > -1}
               missingDependencies={getMissingDependencies("Mono")}
            />
         )}
         {IS_MAC && (
            <Installable
               longname="Serial DirectMedia Layer 2"
               image="SDL"
               code="SDL"
               onAction={onAction}
               composeModal={composeModal}
               installed={Software.SDL}
               isRunning={runningTasks.indexOf("SDL") > -1}
               missingDependencies={getMissingDependencies("SDL")}
            />
         )}
      </div>
   );
}
