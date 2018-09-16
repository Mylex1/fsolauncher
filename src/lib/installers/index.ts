// fsolauncher
// \src\lib\installers\index.ts

import {
   URL_FREESO_TEAMCITY,
   URL_FREESO_REMESHPACKAGE
} from "../utils/Constants";

import FSOInstaller from "./FSOInstaller";
import MeshInstaller from "./MeshInstaller";
import TSOInstaller from "./TSOInstaller";
import SelfEx from "./SelfEx";
import Updater from "./Updater";
import IInstaller from "../interfaces/installers/IInstaller";

/**
 * Returns a FreeSO installer.
 * @param target Directory to install FreeSO in.
 */
const getFSOInstaller = (target: string): IInstaller =>
   new FSOInstaller(URL_FREESO_TEAMCITY, target);

/**
 * Returns a Remesh Package installer.
 * @param target Directory to install the remesh package in.
 */
const getRemeshPackageInstaller = (target: string): IInstaller =>
   new MeshInstaller(URL_FREESO_REMESHPACKAGE, target);

/**
 * Returns a The Sims Online installer.
 * @param target Directory to install The Sims Online in.
 */
const getTSOInstaller = (target: string): IInstaller =>
   new TSOInstaller(
      "http://largedownloads.ea.com/pub/misc/tso/Data{n}.cab",
      target,
      [1, 1114]
   );

/**
 * Returns an OpenAL installer.
 * @param source Path where the executable is located.
 */
const getOpenALInstaller = (): IInstaller => new SelfEx("oalinst.exe");

/**
 * Returns a .NET installer.
 * @param source Path where the executable is located.
 */
const getNETInstaller = (): IInstaller =>
   new SelfEx("NDP452-KB2901954-Web.exe");

/**
 * Returns a Mono installer.
 * @param source Path where the executable is located.
 */
const getMonoInstaller = (): IInstaller => new SelfEx("");

/**
 * Returns an SDL installer.
 * @param source Path where the executable is located.
 */
const getSDLInstaller = (): IInstaller => new SelfEx("");

/**
 * Returns an update installer.
 */
const getUpdateInstaller = (): IInstaller =>
   new Updater("http://5.189.177.216/FSOLauncher.php");

/**
 * Returns an installer.
 * @param code Software code.
 * @param target Target (for ZIPs and Cabs).
 */
export const getInstaller = (code: string, target?: string): IInstaller => {
   let installer;

   switch (code) {
      case "FSO":
         installer = getFSOInstaller(target);
         break;

      case "TSO":
         installer = getTSOInstaller(target);
         break;

      case "NET":
         installer = getNETInstaller();
         break;

      case "OpenAL":
         installer = getOpenALInstaller();
         break;

      case "SDL":
         installer = getSDLInstaller();
         break;

      case "RMP":
         installer = getRemeshPackageInstaller(target);
         break;

      case "UPG":
         installer = getUpdateInstaller();
   }
   return installer;
};
