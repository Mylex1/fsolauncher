// fsolauncher
// \src\components\Modal\index.tsx

import * as React from "react";
import Audio from "../../lib/utils/Audio";
import IProperties from "./IProperties";

/**
 * Modal Component to display important information to users
 * and allow them to interact with the window.
 */
export default class Modal extends React.Component<IProperties> {
   public componentDidMount() {
      // Play the notification sound on mount.
      Audio("n002.mp3");
   }

   /**
    * Handle an action.
    * @param action Callback to execute.
    */
   private handleAction(action: () => void) {
      action();
      this.props.dispose(this.props.id);
   }

   public render(): any {
      const actions = this.props.actions.map(action => (
         <a
            key={this.props.actions.indexOf(action).toString()}
            className={"Button " + (action.transparent ? "Transparent" : "")}
            onClick={() => this.handleAction(action.action)}
            style={{ borderRadius: "999px" }}
         >
            {action.name}
         </a>
      ));

      return (
         <div className="Modal animated bounceIn">
            <h1>{this.props.headline}</h1>
            <p>{this.props.body}</p>
            <div className="Bottom">{actions}</div>
         </div>
      );
   }
}
