// fsolauncher
// \src\components\Header\index.tsx

import * as React from "react";
import IProperties from "./IProperties";

/**
 * The top header component which houses the page title and description
 * text, as well as an optional button.
 * @param param0 Props.
 */
const Header: React.SFC<IProperties> = ({ button, title, subtitle }) => (
   <div className="AppContentTop">
      <div style={{ float: "right" }}>
         {button && (
            <a className="Button" onClick={button.onClick}>
               {button.icon && (
                  <i
                     style={{ marginRight: "10px" }}
                     className="material-icons left"
                  >
                     {button.icon}
                  </i>
               )}
               {button.text}
            </a>
         )}
      </div>
      <span>{title}</span>
      <small>{subtitle}</small>
   </div>
);

export default Header;
