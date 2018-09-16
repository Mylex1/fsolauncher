// fsolauncher
// \src\views\About\index.tsx

import * as React from "react";

import { LAUNCHER_VERSION } from "../../lib/utils/Constants";
import { updateHeader } from "../../store/actions";
import { connect } from "react-redux";

import IStateProps from "./IStateProps";
import IDispatchProps from "./IDispatchProps";
import IProperties from "./IProperties";
import IState from "../../lib/interfaces/state/IState";

/**
 * About Page component, to show extra info to the user
 * and allow the user to force an update check.
 */
class About extends React.Component<IProperties> {
   public componentDidMount() {
      this.props.updateHeader({
         subtitle: "Learn more about FreeSO",
         title: "About"
      });
   }

   public render(): any {
      return (
         <div className="About">
            <div>
               <h1>Launcher Version</h1>
               <p>FreeSO Launcher {LAUNCHER_VERSION}</p>
               {this.props.internetStatus ? (
                  <a
                     className="Button"
                     style={{
                        borderRadius: "999px",
                        paddingLeft: "15px",
                        paddingRight: "15px"
                     }}
                  >
                     <i className="material-icons left">update</i> Check for
                     updates
                  </a>
               ) : (
                  <p style={{ color: "#ca4747" }}>
                     <i className="material-icons left">warning</i> You need an
                     internet connection to update
                  </p>
               )}
            </div>
            <div>
               <h1>What is FreeSO?</h1>
               <p>
                  FreeSO (“Free Simulator Online”) is a reimplementation of The
                  Sims Online™’s game engine, using C# and Monogame.
               </p>
            </div>
            <div>
               <h1>Is FreeSO legal?</h1>
               <p>
                  Yes. Free Simulator Online (FreeSO) is a reimplementation of
                  the game engine of Electronic Arts' The Sims Online (TSO),
                  using C# and Monogame. It consists of 100% original code
                  reverse-engineered to replicate the gameplay of TSO. FreeSO is
                  merely a game engine, thus any content that resembles the
                  graphics or sound effects of TSO must be provided by the
                  legally-obtained software of the user. We neither distribute,
                  nor alter any intellectual property belonging to Electronic
                  Arts, Inc. We use our own original artwork to promote FreeSO,
                  and we maintain the project as non-commercial.
               </p>
            </div>
            <div>
               <h1>Will FreeSO always be free-to-play?</h1>
               <p>Yes, it will always be free in its entirety.</p>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state: { launcher: IState }) => {
   return {
      internetStatus: state.launcher.internetStatus
   };
};

export default connect<IStateProps, IDispatchProps>(
   mapStateToProps,
   { updateHeader }
)(About);
