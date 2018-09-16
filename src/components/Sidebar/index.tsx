// fsolauncher
// \src\components\Sidebar\index.tsx

import * as React from "react";
import IProperties from "./IProperties";

import { NavLink } from "react-router-dom";

/**
 * The sidebar component.
 * @param param0 Props.
 */
const Sidebar: React.SFC<IProperties> = ({ play, playerCount }) => (
   <ul className="AppSidebar">
      <li className="Logo" />
      <a className="Button Launch" onClick={play}>
         PLAY
      </a>
      <NavLink to="/" activeClassName="Active" exact={true}>
         <li>
            <i className="material-icons left">home</i> Home
         </li>
      </NavLink>
      <NavLink to="/Installer" activeClassName="Active">
         <li>
            <i className="material-icons left">widgets</i> Installer
         </li>
      </NavLink>
      <NavLink to="/Downloads" activeClassName="Active">
         <li>
            <i className="material-icons left">play_for_work</i> Downloads
         </li>
      </NavLink>
      <NavLink to="/Settings" activeClassName="Active">
         <li>
            <i className="material-icons left">settings</i> Settings
         </li>
      </NavLink>
      <NavLink to="/Notifications" activeClassName="Active">
         <li>
            <i className="material-icons left">notifications_none</i>{" "}
            Notifications
         </li>
      </NavLink>
      <div className="Bottom">
         <NavLink to="/About" activeClassName="Active">
            <li>
               <i className="material-icons left">contact_support</i> About
            </li>
         </NavLink>
      </div>
   </ul>
);

export default Sidebar;
