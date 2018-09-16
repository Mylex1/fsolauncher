// fsolauncher
// \src\routes.tsx

import * as React from "react";
import { Route } from "react-router-dom";

import Home from "../Home";
import Installer from "../Installer";
import Downloads from "../Downloads";
import About from "../About";
import Help from "../Help";
import Settings from "../Settings";
import Notifications from "../Notifications";

export default (
   <div>
      <Route exact={true} path="/" component={Home} />
      <Route path="/Installer" component={Installer} />
      <Route path="/Downloads" component={Downloads} />
      <Route path="/About" component={About} />
      <Route path="/Help" component={Help} />
      <Route path="/Settings" component={Settings} />
      <Route path="/Notifications" component={Notifications} />
   </div>
);
