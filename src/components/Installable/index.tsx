// fsolauncher
// \src\components\Installable\index.tsx

import * as React from "react";

import {
   MODAL_ALREADY_INSTALLING,
   MODAL_MISSING_DEPENDENCIES,
   NAMES
} from "../../lib/utils/Constants";

import IProperties from "./IProperties";

/**
 * Component that represents an installable program.
 * @param param0 Props.
 */
const Installable: React.SFC<IProperties> = ({
   image,
   block,
   code,
   installed,
   longname,
   missingDependencies,
   composeModal,
   isRunning,
   onAction
}) => {
   const onAccept = (code: string) => onAction(code, true);
   const onCancel = (code: string) => onAction(code, false);

   const handleClick = (_e: any) => {
      if (missingDependencies.length > 0) {
         return MODAL_MISSING_DEPENDENCIES(missingDependencies, composeModal);
      }

      if (isRunning) {
         return MODAL_ALREADY_INSTALLING(NAMES[code], composeModal);
      }

      const body = installed
         ? "You already have " +
           NAMES[code] +
           " installed on your computer. Are you sure you want to reinstall it?"
         : "This will install " +
           NAMES[code] +
           " on your computer. Are you sure you want to install this?";

      const headline = installed
         ? "Reinstall " + NAMES[code] + "?"
         : "Install " + NAMES[code] + "?";

      composeModal({
         actions: [
            {
               action: () => onAccept(code),
               name: installed ? "Reinstall" : "Install"
            },
            {
               action: () => onCancel(code),
               name: "Cancel",
               transparent: true
            }
         ],
         body: body,
         headline: headline,
         id: new Date().getTime()
      });
   };

   return (
      <div
         className={"animated Installable " + image + (block ? " Block" : "")}
         onClick={handleClick}
      >
         <div className="Tag">
            <h1>
               {NAMES[code]}{" "}
               {installed ? (
                  <div className="Check">
                     <i className="material-icons">check_circle</i>
                  </div>
               ) : (
                  ""
               )}
            </h1>
            <h2>{longname}</h2>
         </div>
      </div>
   );
};

export default Installable;
