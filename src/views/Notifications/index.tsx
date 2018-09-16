// fsolauncher
// \src\views\Notifications\index.tsx

import * as React from "react";

import { connect } from "react-redux";
import { updateHeader } from "../../store/actions";

import IProperties from "./IProperties";
import IStateProps from "./IStateProps";
import IDispatchProps from "./IDispatchProps";
import IState from "../../lib/interfaces/state/IState";
import Notification from "../../components/Notification";

/**
 * The Notifications Page where users can see
 * all received notifications.
 */
class Notifications extends React.Component<IProperties> {
   public componentDidMount() {
      this.props.updateHeader({
         subtitle: "Keep up with the latest notifications",
         title: "Notifications"
      });
   }

   public render(): any {
      return this.props.Notifications.length == 0 ? (
         <div
            className="Notifications"
            style={{
               fontSize: "16px",
               padding: "20px",
               paddingTop: "30px",
               textAlign: "center"
            }}
         >
            <i
               className="material-icons"
               style={{ fontSize: "32px", marginBottom: "20px" }}
            >
               notifications_none
            </i>
            <br />
            No notifications received yet
         </div>
      ) : (
         <div className="Notifications">
            {this.props.Notifications.map(notification => (
               <Notification
                  key={this.props.Notifications.indexOf(
                     notification
                  ).toString()}
                  {...notification}
               />
            ))}
         </div>
      );
   }
}

const mapStateToProps = (state: { launcher: IState }) => {
   return {
      Notifications: state.launcher.Notifications
   };
};

export default connect<IStateProps, IDispatchProps, any>(
   mapStateToProps,
   { updateHeader }
)(Notifications);
