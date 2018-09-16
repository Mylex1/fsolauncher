// fsolauncher
// \src\views\Downloads\index.tsx

import * as React from "react";

import { connect } from "react-redux";
import { updateHeader } from "../../store/actions";

import IProperties from "./IProperties";
import IStateProps from "./IStateProps";
import IDispatchProps from "./IDispatchProps";
import IState from "../../lib/interfaces/state/IState";
import Download from "../../components/Download";

/**
 * The Downloads Page component where all running downloads
 * are displayed.
 */
class Downloads extends React.Component<IProperties> {
   public componentDidMount() {
      this.props.updateHeader({
         subtitle: "View current and finished downloads",
         title: "Downloads"
      });
   }

   public render(): any {
      return this.props.Downloads.length > 0 ? (
         <div className="Downloads">
            {this.props.Downloads.map(download => (
               <Download
                  key={this.props.Downloads.indexOf(download).toString()}
                  {...download}
               />
            ))}
         </div>
      ) : (
         <div className="Downloads NoInternet">
            <i
               className="material-icons"
               style={{ fontSize: "32px", marginBottom: "20px" }}
            >
               play_for_work
            </i>{" "}
            <br />
            No downloads finished or in progress
         </div>
      );
   }
}

const mapStateToProps = (state: { launcher: IState }) => {
   return {
      Downloads: state.launcher.Downloads
   };
};

export default connect<IStateProps, IDispatchProps, any>(
   mapStateToProps,
   { updateHeader }
)(Downloads);
