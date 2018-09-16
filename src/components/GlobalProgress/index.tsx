// fsolauncher
// \src\views\Installer\GlobalProgress.tsx

import * as React from "react";
import IProperties from "./IProperties";

/**
 * Component for the global installation window.
 * @param param0 Props.
 */
const GlobalProgress: React.SFC<IProperties> = ({
   tip,
   text,
   details,
   progress
}) => (
   <div
      className="Installer GlobalProgressBackdrop"
      style={{
         overflowX: "hidden",
         padding: "20px",
         backgroundImage: "url(assets/images/wizard/" + tip[1]
      }}
   >
      <div className="Tip animated fadeIn">
         <i className="material-icons">help_outline</i>
         <h1>Did You Know?</h1>
         <p>{tip[0]}</p>
      </div>
      <div className="Bottom">
         <h1>{text}</h1>
         <p>{details}</p>
         <div
            style={{
               background: "rgba(0,0,0,0.1)",
               borderRadius: "999px",
               overflow: "hidden",
               width: "50%"
            }}
         >
            <div
               className="ProgressBar"
               style={{
                  width: progress + "%"
               }}
            />
         </div>
         <p style={{ marginTop: "20px" }}>
            For more information visit the Downloads tab.
         </p>
      </div>
   </div>
);

export default GlobalProgress;
