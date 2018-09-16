// fsolauncher
// \src\components\Toast\index.tsx

import * as React from "react";
import IProperties from "./IProperties";

/**
 * Component that represents a Toast alert.
 * @param param0 Props.
 */
const Toast: React.SFC<IProperties> = ({ icon, rotating, text }) => (
   <div className="Toast animated bounceIn">
      {icon && (
         <i
            style={{ marginRight: "8px", float: "left" }}
            className={"material-icons left " + (rotating ? "Spinner" : "")}
         >
            {icon}
         </i>
      )}
      {text}
   </div>
);

export default Toast;
