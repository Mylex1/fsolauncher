// fsolauncher
// \src\components\WelcomeScreen\index.tsx

import * as React from "react";
import IProperties from "./IProperties";

import { LAUNCHER_VERSION } from "../../lib/utils/Constants";

/**
 * Component that represents the Welcome Screen.
 * @param param0 Props.
 */
const WelcomeScreen: React.SFC<IProperties> = ({ changelog, hide }) => {
   const list = (
      <ul>
         {changelog["features"].map((feature: string) => (
            <li key={changelog["features"].indexOf(feature).toString()}>
               <i className="material-icons left">subdirectory_arrow_right</i>{" "}
               <span
                  dangerouslySetInnerHTML={{
                     __html: feature
                  }}
               />
            </li>
         ))}
      </ul>
   );

   return (
      <div className="WelcomeScreen animated bounceIn">
         <i
            className="material-icons"
            style={{ float: "right", cursor: "pointer" }}
            onClick={hide}
         >
            clear
         </i>
         <div>
            <div>
               <img src="assets/images/logo.png" />
            </div>
            <h1>What's New</h1>
            <span>
               {changelog["date"]} · {LAUNCHER_VERSION}
            </span>
            <p>{changelog["description"]}</p>
            {list}
         </div>
      </div>
   );
};

export default WelcomeScreen;
