import { EventEmitter } from "events";

// fsolauncher
// \src\lib\interfaces\installers\IInstaller.ts

export default interface IInstaller extends EventEmitter {
   run(): void;
}
