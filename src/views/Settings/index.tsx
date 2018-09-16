// fsolauncher
// \src\views\Settings\index.tsx

import * as React from "react";

import { updateHeader, updateSettings } from "../../store/actions";
import { connect } from "react-redux";

import IStateProps from "./IStateProps";
import IDispatchProps from "./IDispatchProps";
import IProperties from "./IProperties";
import IState from "../../lib/interfaces/state/IState";

/**
 * The Settings Page where users can modify their settings.
 */
class Settings extends React.Component<IProperties> {
   public componentDidMount() {
      this.props.updateHeader({
         subtitle: "Personalize your game and launcher",
         title: "Settings"
      });
   }
   public render(): any {
      return (
         <div className="Settings">
            <div className="Form">
               <h1>Launcher Settings</h1>
               <div>
                  <div>
                     <span>Live Desktop Notifications</span>
                     <select
                        value={this.props.Settings.launcher.notifications}
                        onChange={this.changeNotifications}
                     >
                        <option value="1">Enabled</option>
                        <option value="0">Disabled</option>
                     </select>
                     <small>
                        Enable desktop notifications to receive alerts for
                        FreeSO updates.
                     </small>
                  </div>
               </div>
               <div>
                  <span>Launcher Theme</span>
                  <select
                     value={this.props.Settings.launcher.theme}
                     onChange={this.changeTheme}
                  >
                     <option value="open-beta">Open Beta</option>
                     <option value="neon">Neon</option>
                  </select>
                  <small>Choose a style for your launcher.</small>
               </div>
               <div>
                  <span>On Exit</span>
                  <select
                     value={this.props.Settings.launcher.persistence}
                     onChange={this.changePersistence}
                  >
                     <option value="1">Stay in icon tray</option>
                     <option value="0">Exit launcher</option>
                  </select>
                  <small>
                     The launcher can stay in the icon tray if you don't want to
                     miss any live notifications.
                  </small>
               </div>
            </div>
            <div className="Form">
               <h1>Game Settings</h1>
               <div>
                  <div>
                     <span>Graphics Mode</span>
                     <select
                        value={this.props.Settings.game.graphics}
                        onChange={this.changeGraphics}
                     >
                        <option value="dx">DirectX</option>
                        <option value="ogl">OpenGL</option>
                        <option value="sw">Software</option>
                     </select>
                     <small>
                        Enable desktop notifications to receive alerts for
                        FreeSO updates.
                     </small>
                  </div>
               </div>
               <div>
                  <span>3D Mode</span>
                  <select
                     value={this.props.Settings.game.is3d}
                     onChange={this.change3dMode}
                  >
                     <option value="0">Disabled</option>
                     <option value="1">Enabled</option>
                  </select>
                  <small>
                     Enable 3D Mode. Disabling this feature will make your game
                     go back to 2D.
                  </small>
               </div>
               <div>
                  <span>Game Language</span>
                  <select
                     value={this.props.Settings.game.language}
                     onChange={this.changeLanguage}
                  >
                     <option value="en">English</option>
                     <option value="es">Spanish</option>
                     <option value="it">Italian</option>
                  </select>
                  <small>Choose a language for the game.</small>
               </div>
            </div>
         </div>
      );
   }

   /**
    * Change the game language.
    */
   private changeLanguage = (event: any) =>
      this.props.updateSettings({
         ...this.props.Settings,
         game: {
            ...this.props.Settings.game,
            language: event.target.value
         }
      });

   /**
    * Change 3d mode.
    */
   private change3dMode = (event: any) =>
      this.props.updateSettings({
         ...this.props.Settings,
         game: {
            ...this.props.Settings.game,
            is3d: event.target.value
         }
      });

   /**
    * Change graphics mode.
    */
   private changeGraphics = (event: any) =>
      this.props.updateSettings({
         ...this.props.Settings,
         game: {
            ...this.props.Settings.game,
            graphics: event.target.value
         }
      });

   /**
    * Change launcher persistence mode.
    */
   private changePersistence = (event: any) =>
      this.props.updateSettings({
         ...this.props.Settings,
         launcher: {
            ...this.props.Settings.launcher,
            persistence: event.target.value
         }
      });

   /**
    * Change launcher theme.
    */
   private changeTheme = (event: any) =>
      this.props.updateSettings({
         ...this.props.Settings,
         launcher: {
            ...this.props.Settings.launcher,
            theme: event.target.value
         }
      });

   /**
    * Change notifications mode.
    */
   private changeNotifications = (event: any) =>
      this.props.updateSettings({
         ...this.props.Settings,
         launcher: {
            ...this.props.Settings.launcher,
            notifications: event.target.value
         }
      });
}

const mapStateToProps = (state: { launcher: IState }) => {
   return {
      Settings: state.launcher.Settings
   };
};

export default connect<IStateProps, IDispatchProps, any>(
   mapStateToProps,
   { updateHeader, updateSettings }
)(Settings);
