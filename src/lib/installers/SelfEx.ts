// fsolauncher
// \src\lib\installers\SelfEx.ts

import IInstaller from "../interfaces/installers/IInstaller";
import * as child_process from "child_process";

import { EventEmitter } from "events";

export default class SelfEx extends EventEmitter implements IInstaller {
   private source: string;
   public constructor(source: string) {
      super();
      this.source = source;
   }
   run = () =>
      child_process
         .exec(this.source, { cwd: "bin" })
         .on("close", _code => this.emit("success"));
}
