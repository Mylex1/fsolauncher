// fsolauncher
// \src\lib\installers\Upgrader.ts

import IInstaller from "../interfaces/installers/IInstaller";

import { EventEmitter } from "events";

export default class Updater extends EventEmitter implements IInstaller {
   run() {}
}
