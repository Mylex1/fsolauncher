// fsolauncher
// \src\components\Notification\index.tsx

import * as React from "react";
import IProperties from "./IProperties";

/**
 * Component that represents a Notification.
 * @param param0 Props.
 */
const Notification: React.SFC<IProperties> = ({ headline, body }) => (
   <div className="Notification">
      <i className="material-icons">notifications_empty</i>
      <h1>{headline}</h1>
      <p>{body}</p>
      <a className="Button">
         LEARN MORE <i className="material-icons left">arrow_right</i>
      </a>
   </div>
);

export default Notification;
